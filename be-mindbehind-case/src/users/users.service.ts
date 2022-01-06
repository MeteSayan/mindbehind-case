import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entity/user.entity';
import { RegisterDto } from './dto/register.dto';

import * as config from 'config';
const isAdminActive = config.get('isAdminActive');
const isUserActive = config.get('isUserActive');

let adminUser: User, demoUser: User;
if (isAdminActive) {
  createAdmin();
}

if (isUserActive) {
  createDemouser();
}

async function createAdmin() {
  const admin: string = isAdminActive ? config.get('admin') : undefined;
  const adminPass: string = isAdminActive ? config.get('adminPass') : undefined;
  adminUser = new User();
  adminUser.id = 0;
  adminUser.username = admin;
  const hashedPassword = await bcrypt.hash(adminPass, 10);
  adminUser.password = hashedPassword;
  adminUser.role = 'owner';
}

async function createDemouser() {
  const user: string = config.get('user');
  const userPass: string = config.get('userPass');
  demoUser = new User();
  demoUser.id = 1;
  demoUser.username = user;
  const hashedPassword = await bcrypt.hash(userPass, 10);
  demoUser.password = hashedPassword;
  demoUser.role = 'employee';
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findForValidate(username: string) {
    if (adminUser && username === adminUser.username) {
      return Promise.resolve(adminUser);
    }
    if (demoUser && username === demoUser.username) {
      return Promise.resolve(demoUser);
    }

    return this.usersRepository
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .addSelect('user.password')
      .where('user.username = :username', { username })
      .getOne();
  }

  async getUsers(role: string) {
    if (role != 'owner') {
      return new UnauthorizedException();
    }
    return await this.usersRepository.find();
  }

  async getUser(role: string, id: number) {
    if (role != 'owner') {
      return new UnauthorizedException();
    }
    return await this.usersRepository.findOne({ id: id });
  }

  async addUser(role: string, user: RegisterDto) {
    if (role != 'owner') {
      return new UnauthorizedException();
    }
    if (user.role != 'owner' && user.role != 'employee') {
      return null;
    }
    user.password = await bcrypt.hash(user.password, 10);

    return await this.usersRepository.save(user);
  }

  async updateUser(role: string, user: User) {
    if (role != 'owner') {
      return new UnauthorizedException();
    }
    const userValue = await this.usersRepository.findOne({
      id: user.id,
    });
    if (!userValue) {
      return null;
    }

    userValue.name = user.name;
    userValue.phone = user.phone;
    userValue.username = user.username;
    userValue.password = await bcrypt.hash(user.password, 10);
    if (user.role == 'owner' || user.role == 'employee') {
      userValue.role = user.role;
    }

    return await this.usersRepository.save(userValue);
  }

  async deleteUser(role: string, id: number) {
    if (role != 'owner') {
      return new UnauthorizedException();
    }
    const branchValue = await this.usersRepository.findOne({
      id: id,
    });
    if (!branchValue) {
      return null;
    }

    return await this.usersRepository.remove(branchValue);
  }
}

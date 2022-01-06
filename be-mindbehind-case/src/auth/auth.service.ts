import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { LoginResultDto } from './dto/login-result.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findForValidate(username);

    if (user && user.password) {
      const isPasswordMatching = await bcrypt.compare(password, user.password);

      if (isPasswordMatching) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    }
    return null;
  }
  async login(user: any): Promise<LoginResultDto> {
    const payload = { username: user.username, id: user.id, role: user.role };
    const result = new LoginResultDto();
    result.token = this.jwtService.sign(payload);
    return result;
  }
}

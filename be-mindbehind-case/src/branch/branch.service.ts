import { Injectable, UnauthorizedException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branch } from './entity/branch.entity';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Branch)
    private branchRepository: Repository<Branch>,
  ) {}

  async getAllBranch() {
    return await this.branchRepository.find();
  }

  async getBranchById(id: number) {
    return await this.branchRepository.findOne({ branchId: id });
  }

  async addBranch(role: string, branch: Branch) {
    if (role != 'owner') {
      return new UnauthorizedException();
    }
    return await this.branchRepository.save(branch);
  }

  async updateBranch(role: string, branch: Branch) {
    if (role != 'owner') {
      return new UnauthorizedException();
    }
    const branchValue = await this.branchRepository.findOne({
      branchId: branch.branchId,
    });
    if (!branchValue) {
      return null;
    }

    branchValue.fullAdress = branch.fullAdress;
    branchValue.latitude = branch.latitude;
    branchValue.longitude = branch.longitude;
    branchValue.name = branch.name;
    branchValue.phone = branch.phone;

    return await this.branchRepository.save(branchValue);
  }

  async deleteBranch(role: string, id: number) {
    if (role != 'owner') {
      return new UnauthorizedException();
    }
    const branchValue = await this.branchRepository.findOne({
      branchId: id,
    });
    if (!branchValue) {
      return null;
    }

    return await this.branchRepository.remove(branchValue);
  }
}

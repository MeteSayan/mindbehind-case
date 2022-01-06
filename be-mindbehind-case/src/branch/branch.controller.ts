import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Branch } from './entity/branch.entity';
import { BranchService } from './branch.service';
import { Role } from 'src/auth/role.decorator';

@Controller('branch')
@ApiTags('branch')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class BranchController {
  constructor(private branchService: BranchService) {}

  @Get('/all-branch')
  async getAllBranch() {
    return await this.branchService.getAllBranch();
  }

  @Get('/:id')
  async getBranchById(@Param('id') id: number) {
    return await this.branchService.getBranchById(id);
  }

  @Post('/')
  async addBranch(@Role() role: string, @Body() branch: Branch) {
    return await this.branchService.addBranch(role, branch);
  }

  @Put('/')
  async updateBranch(@Role() role: string, @Body() branch: Branch) {
    return await this.branchService.updateBranch(role, branch);
  }

  @Delete('/:id')
  async deleteBranch(@Role() role: string, @Param('id') id: number) {
    return await this.branchService.deleteBranch(role, id);
  }
}

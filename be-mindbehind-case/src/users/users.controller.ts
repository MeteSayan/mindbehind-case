import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './entity/user.entity';
import { Role } from 'src/auth/role.decorator';
import { RegisterDto } from './dto/register.dto';

@Controller('users')
@ApiBearerAuth()
@ApiTags('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/')
  async getUsers(@Role() role: string) {
    return await this.usersService.getUsers(role);
  }

  @Get('/:id')
  async getUser(@Role() role: string, @Param('id') id: number) {
    return await this.usersService.getUser(role, id);
  }

  @Post('/')
  async addUser(@Role() role: string, @Body() user: RegisterDto) {
    return await this.usersService.addUser(role, user);
  }

  @Put('/')
  async updateUser(@Role() role: string, @Body() user: User) {
    return await this.usersService.updateUser(role, user);
  }

  @Delete('/:id')
  async deleteUser(@Role() role: string, @Param('id') id: number) {
    return await this.usersService.deleteUser(role, id);
  }
}

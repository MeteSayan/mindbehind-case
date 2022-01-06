import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  role: string;
}

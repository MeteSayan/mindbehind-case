import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Branch {
  @ApiProperty()
  @PrimaryGeneratedColumn({ type: 'bigint' })
  branchId: number;

  @ApiProperty()
  @Column()
  phone: string;

  @ApiProperty()
  @Column()
  fullAdress: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  longitude: string;

  @ApiProperty()
  @Column()
  latitude: string;
}

import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { User } from './users/entity/user.entity';
import { Branch } from './branch/entity/branch.entity';
import { BranchModule } from './branch/branch.module';

const username = config.get('dbConfig.dbUser') as string;
const password = config.get('dbConfig.dbPass') as string;
const dbName = config.get('dbConfig.dbName') as string;
const dbHost = config.get('dbConfig.dbHost') as string;

const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: dbHost,
  port: 5432,
  username: username,
  password: password,
  database: dbName,
  entities: [User, Branch],
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
  keepConnectionAlive: true,
};

@Module({
  imports: [AuthModule, UsersModule, TypeOrmModule.forRoot(dbConfig), BranchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

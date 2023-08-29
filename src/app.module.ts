import { Module } from '@nestjs/common';

import { hash } from 'bcryptjs';

import { PrismaService } from './prisma/prisma.service';

import { CreateAccountController } from './controllers/create-account.controller';
@Module({
  imports: [],
  controllers: [CreateAccountController],
  providers: [PrismaService],
})
export class AppModule {}

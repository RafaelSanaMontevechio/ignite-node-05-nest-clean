import { ConflictException } from '@nestjs/common';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

@Controller('/accounts')
export class CreateAccountController {
  constructor(private prismaService: PrismaService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() body: any) {
    const { name, email, password } = body;

    const userWithTheSameEmail = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (userWithTheSameEmail) {
      throw new ConflictException('User with the same email already exists');
    }

    await this.prismaService.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }
}

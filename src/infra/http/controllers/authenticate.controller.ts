import { JwtService } from '@nestjs/jwt';
import { Body, Controller, Post } from '@nestjs/common';
import { UnauthorizedException, UsePipes } from '@nestjs/common';

import { z } from 'zod';
import { compare } from 'bcryptjs';

import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe';

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;

@Controller('/sessions')
export class AuthenticateController {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body;

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User credentials do not match');
    }

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('User credentials do not match');
    }

    const accessToken = this.jwt.sign({ sub: user.id });

    return { access_token: accessToken };
  }
}
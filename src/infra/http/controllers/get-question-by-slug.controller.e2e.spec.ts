import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import request from 'supertest';

import { AppModule } from '@/infra/app.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('Get question by slug (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);
    jwt = moduleRef.get(JwtService);

    await app.init();
  });

  test('[GET] /questions/:slug', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: '123456',
      },
    });

    const accessToken = jwt.sign({ sub: user.id });

    await prisma.question.create({
      data: {
        authorId: user.id,
        title: 'Question 01',
        slug: 'question-01',
        content: 'Question content 01',
      },
    });

    const response = await request(app.getHttpServer())
      .get('/questions/question-01')
      .set('Authorization', `Bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      questions: expect.objectContaining({ title: 'Question 01' }),
    });
  });
});

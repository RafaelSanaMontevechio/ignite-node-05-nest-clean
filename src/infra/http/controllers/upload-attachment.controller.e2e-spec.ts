import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import request from 'supertest';

import { AppModule } from '@/infra/app.module';
import { JwtService } from '@nestjs/jwt';
import { StudentFactory } from 'test/factories/make-student';
import { DatabaseModule } from '@/infra/database/database.module';
import { QuestionFactory } from 'test/factories/make-question';
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug';

describe('Upload attachment (e2e)', () => {
  let app: INestApplication;
  let studentFactory: StudentFactory;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    jwt = moduleRef.get(JwtService);
    studentFactory = moduleRef.get(StudentFactory);

    await app.init();
  });

  test('[POST] /attachments', async () => {
    const user = await studentFactory.makePrismaStudent();

    const accessToken = jwt.sign({ sub: user.id.toString() });

    const response = await request(app.getHttpServer())
      .post('/attachments')
      .set('Authorization', `Bearer ${accessToken}`)
      .attach('file', './test/e2e/avatar.png');

    expect(response.statusCode).toBe(201);
  });
});

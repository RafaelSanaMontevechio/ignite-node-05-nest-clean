import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Post } from '@nestjs/common';

import { z } from 'zod';

import { UserPayload } from '@/infra/auth/jwt.strategy';
import { CurrentUser } from '@/infra/auth/current-user.decorator';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe';
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question';

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
});

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>;

@Controller('/questions')
@UseGuards(AuthGuard('jwt'))
export class CreateQuestionController {
  constructor(private createQuestion: CreateQuestionUseCase) {}

  @Post()
  async handle(
    @Body(new ZodValidationPipe(createQuestionBodySchema))
    body: CreateQuestionBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, content } = body;

    const userId = user.sub;

    await this.createQuestion.execute({
      title,
      content,
      authorId: userId,
      attachmentsIds: [],
    });
  }
}

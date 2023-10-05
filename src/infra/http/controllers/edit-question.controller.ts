import {
  BadRequestException,
  Body,
  Controller,
  Put,
  HttpCode,
  Param,
} from '@nestjs/common';

import { z } from 'zod';

import { UserPayload } from '@/infra/auth/jwt.strategy';
import { CurrentUser } from '@/infra/auth/current-user.decorator';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe';
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question';

const editQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
});

type EditQuestionBodySchema = z.infer<typeof editQuestionBodySchema>;

@Controller('/questions/:id')
// @UseGuards(AuthGuard('jwt'))
export class EditQuestionController {
  constructor(private editQuestion: EditQuestionUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(new ZodValidationPipe(editQuestionBodySchema))
    body: EditQuestionBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('id') questionId: string,
  ) {
    const { title, content } = body;

    const userId = user.sub;

    const result = await this.editQuestion.execute({
      title,
      content,
      authorId: userId,
      attachmentsIds: [],
      questionId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}

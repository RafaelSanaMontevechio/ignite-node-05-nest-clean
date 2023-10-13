import {
  BadRequestException,
  HttpCode,
  Param,
  Delete,
  Controller,
} from '@nestjs/common';

import { UserPayload } from '@/infra/auth/jwt.strategy';
import { CurrentUser } from '@/infra/auth/current-user.decorator';
import { DeleteAnswerCommentUseCase } from '@/domain/forum/application/use-cases/delete-answer-comment';

@Controller('/answers/comments/:questionCommentId')
// @UseGuards(AuthGuard('jwt'))
export class DeleteAnswerCommentController {
  constructor(private deleteAnswerComment: DeleteAnswerCommentUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('answerCommentId') answerCommentId: string,
  ) {
    const userId = user.sub;

    const result = await this.deleteAnswerComment.execute({
      answerCommentId,
      authorId: userId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}

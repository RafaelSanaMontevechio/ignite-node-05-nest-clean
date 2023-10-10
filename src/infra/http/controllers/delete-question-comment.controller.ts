import {
  BadRequestException,
  HttpCode,
  Param,
  Delete,
  Controller,
} from '@nestjs/common';

import { UserPayload } from '@/infra/auth/jwt.strategy';
import { CurrentUser } from '@/infra/auth/current-user.decorator';
import { DeleteQuestionCommentUseCase } from '@/domain/forum/application/use-cases/delete-question-comment';

@Controller('/questions/comments/:questionCommentId')
// @UseGuards(AuthGuard('jwt'))
export class DeleteQuestionCommentController {
  constructor(private deleteQuestionComment: DeleteQuestionCommentUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('questionCommentId') questionCommentId: string,
  ) {
    const userId = user.sub;

    const result = await this.deleteQuestionComment.execute({
      questionCommentId,
      authorId: userId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}

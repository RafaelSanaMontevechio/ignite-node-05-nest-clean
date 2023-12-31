import { UploadAndCreateAttachmentUseCase } from './../../domain/forum/application/use-cases/upload-and-create-attachment';
import { Module } from '@nestjs/common';

import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer';
import { DeleteAnswerUseCase } from '@/domain/forum/application/use-cases/delete-answer';
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question';
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question';
import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question';
import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question';
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student';
import { CommentOnAnswerUseCase } from '@/domain/forum/application/use-cases/comment-on-answer';
import { CommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/comment-on-question';
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug';
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student';
import { DeleteAnswerCommentUseCase } from '@/domain/forum/application/use-cases/delete-answer-comment';
import { FetchAnswerCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-answer-comments';
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions';
import { FetchQuestionAnswersUseCase } from '@/domain/forum/application/use-cases/fetch-question-answers';
import { DeleteQuestionCommentUseCase } from '@/domain/forum/application/use-cases/delete-question-comment';
import { FetchQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-question-comments';
import { ChooseQuestionBestAnswerUseCase } from '@/domain/forum/application/use-cases/choose-question-best-answer';

import { DatabaseModule } from '../database/database.module';
import { CryptographyModule } from '../cryptography/cryptography.module';

import { EditAnswerController } from './controllers/edit-answer.controller';
import { AuthenticateController } from './controllers/authenticate.controller';
import { EditQuestionController } from './controllers/edit-question.controller';
import { DeleteAnswerController } from './controllers/delete-answer.controller';
import { CreateAccountController } from './controllers/create-account.controller';
import { CreateQuestionController } from './controllers/create-question.controller';
import { AnswerQuestionController } from './controllers/answer-question.controller';
import { DeleteQuestionController } from './controllers/delete-question.controller';
import { CommentOnAnswerController } from './controllers/comment-on-answer.controller';
import { UploadAttachmentController } from './controllers/upload-attachment.controller';
import { CommentOnQuestionController } from './controllers/comment-on-question.controller';
import { GetQuestionBySlugController } from './controllers/get-question-by-slug.controller';
import { DeleteAnswerCommentController } from './controllers/delete-answer-comment.controller';
import { FetchAnswerCommentsController } from './controllers/fetch-answer-comments.controller';
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller';
import { FetchQuestionAnswersController } from './controllers/fetch-question-answers.controller';
import { DeleteQuestionCommentController } from './controllers/delete-question-comment.controller';
import { FetchQuestionCommentsController } from './controllers/fetch-question-comments.controller';
import { ChooseQuestionBestAnswerController } from './controllers/choose-question-best-answer.controller';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [DatabaseModule, CryptographyModule, StorageModule],
  controllers: [
    EditAnswerController,
    DeleteAnswerController,
    EditQuestionController,
    AuthenticateController,
    CreateAccountController,
    CreateQuestionController,
    DeleteQuestionController,
    AnswerQuestionController,
    CommentOnAnswerController,
    UploadAttachmentController,
    CommentOnQuestionController,
    GetQuestionBySlugController,
    DeleteAnswerCommentController,
    FetchAnswerCommentsController,
    FetchQuestionAnswersController,
    FetchRecentQuestionsController,
    FetchQuestionCommentsController,
    DeleteQuestionCommentController,
    ChooseQuestionBestAnswerController,
  ],
  providers: [
    EditAnswerUseCase,
    DeleteAnswerUseCase,
    EditQuestionUseCase,
    CreateQuestionUseCase,
    AnswerQuestionUseCase,
    DeleteQuestionUseCase,
    CommentOnAnswerUseCase,
    RegisterStudentUseCase,
    CommentOnQuestionUseCase,
    GetQuestionBySlugUseCase,
    AuthenticateStudentUseCase,
    FetchAnswerCommentsUseCase,
    DeleteAnswerCommentUseCase,
    FetchRecentQuestionsUseCase,
    FetchQuestionAnswersUseCase,
    DeleteQuestionCommentUseCase,
    FetchQuestionCommentsUseCase,
    ChooseQuestionBestAnswerUseCase,
    UploadAndCreateAttachmentUseCase,
  ],
})
export class HttpModule {}

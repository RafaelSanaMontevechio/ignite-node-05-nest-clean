import { Module } from '@nestjs/common';

import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question';
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question';
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student';
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug';
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student';
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions';

import { DatabaseModule } from '../database/database.module';
import { CryptographyModule } from '../cryptography/cryptography.module';

import { AuthenticateController } from './controllers/authenticate.controller';
import { EditQuestionController } from './controllers/edit-question.controller';
import { CreateAccountController } from './controllers/create-account.controller';
import { CreateQuestionController } from './controllers/create-question.controller';
import { GetQuestionBySlugController } from './controllers/get-question-by-slug.controller';
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
    GetQuestionBySlugController,
    EditQuestionController,
  ],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase,
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
    GetQuestionBySlugUseCase,
    EditQuestionUseCase,
  ],
})
export class HttpModule {}

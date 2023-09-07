import { Module } from '@nestjs/common';

import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';

import { PrismaService } from './prisma/prisma.service';
import { PrismaAnswersRepository } from './prisma/repositories/prisma-answers-repository';
import { PrismaQuestionsRepository } from './prisma/repositories/prisma-questions-repository';
import { PrismaAnswerCommentsRepository } from './prisma/repositories/prisma-answer-comments-repository';
import { PrismaQuestionCommentsRepository } from './prisma/repositories/prisma-question-comments-repository';
import { PrismaAnswerAttachmentsRepository } from './prisma/repositories/prisma-answer-attachments-repository';
import { PrismaQuestionAttachmentsRepository } from './prisma/repositories/prisma-question-attachments-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
    PrismaQuestionCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswersRepository,
    PrismaAnswerAttachmentsRepository,
  ],
  exports: [
    PrismaService,
    QuestionsRepository,
    PrismaQuestionCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswersRepository,
    PrismaAnswerAttachmentsRepository,
  ],
})
export class DatabaseModule {}

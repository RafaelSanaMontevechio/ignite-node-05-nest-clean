/* eslint-disable no-useless-return */
import { Injectable } from '@nestjs/common';

import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment';
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository';

import { PrismaService } from '../prisma.service';
import { PrismaQuestionAttachmentMapper } from '../mappers/prisma-question-attachment-mapper';

@Injectable()
export class PrismaQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  constructor(private prisma: PrismaService) {}

  async createMany(attachments: QuestionAttachment[]): Promise<void> {
    if (attachments.length === 0) return;

    const data = PrismaQuestionAttachmentMapper.toPrismaUpdateMany(attachments);

    await this.prisma.attachment.updateMany(data);
  }

  async findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachment[]> {
    const questionAttachments = await this.prisma.attachment.findMany({
      where: { questionId },
    });

    return questionAttachments.map(PrismaQuestionAttachmentMapper.toDomain);
  }

  async deleteMany(attachments: QuestionAttachment[]): Promise<void> {
    if (attachments.length === 0) return;

    const attachmentsIds = attachments.map((attachment) =>
      attachment.id.toString(),
    );

    this.prisma.attachment.deleteMany({
      where: {
        id: {
          in: attachmentsIds,
        },
      },
    });
  }

  async deleteManyByQuestionId(questionId: string): Promise<void> {
    await this.prisma.attachment.deleteMany({
      where: { questionId },
    });
  }
}

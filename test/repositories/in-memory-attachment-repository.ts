import { Attachment } from './../../src/domain/forum/enterprise/entities/attachment';
import { AttachmentsRepository } from '@/domain/forum/application/repositories/attachment-repository';

export class InMemoryAttachmentsRepository implements AttachmentsRepository {
  public items: Attachment[] = [];

  async create(attachment: Attachment) {
    this.items.push(attachment);
  }
}

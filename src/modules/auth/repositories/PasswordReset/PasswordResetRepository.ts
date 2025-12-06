import { Repository, LessThan } from 'typeorm';
import { AppDataSource } from '@database/data-source';
import { PasswordReset } from '../../entities/PasswordReset';
import { IPasswordResetRepository } from './IPasswordResetRepository';
import { ICreatePasswordResetDTO } from '../../dtos/ICreatePasswordResetDTO';
import { IPasswordResetDTO } from '../../dtos/IPasswordResetDTO';

class PasswordResetRepository implements IPasswordResetRepository {
  private repository: Repository<PasswordReset>;

  constructor() {
    this.repository = AppDataSource.getRepository(PasswordReset);
  }

  async create(data: ICreatePasswordResetDTO): Promise<IPasswordResetDTO> {
    const passwordReset = this.repository.create(data);
    await this.repository.save(passwordReset);
    return passwordReset;
  }

  async findByToken(token: string): Promise<IPasswordResetDTO | null> {
    const passwordReset = await this.repository.findOne({
      where: { token },
    });
    return passwordReset || null;
  }

  async markAsUsed(id: number): Promise<void> {
    await this.repository.update(id, { used_at: new Date() });
  }

  async deleteExpired(): Promise<void> {
    await this.repository.delete({
      expires_at: LessThan(new Date()),
    });
  }
}

export { PasswordResetRepository };

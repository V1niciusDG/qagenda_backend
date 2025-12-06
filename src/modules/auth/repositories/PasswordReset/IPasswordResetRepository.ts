import { ICreatePasswordResetDTO } from '../../dtos/ICreatePasswordResetDTO';
import { IPasswordResetDTO } from '../../dtos/IPasswordResetDTO';

interface IPasswordResetRepository {
  create(data: ICreatePasswordResetDTO): Promise<IPasswordResetDTO>;
  findByToken(token: string): Promise<IPasswordResetDTO | null>;
  markAsUsed(id: number): Promise<void>;
  deleteExpired(): Promise<void>;
}

export { IPasswordResetRepository };

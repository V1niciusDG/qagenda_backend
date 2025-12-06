import { Repository } from 'typeorm';
import { AppDataSource } from '@database/data-source';
import { Auth } from '../../entities/Auth';
import { IAuthRepository } from './IAuthRepository';
import { IAuthDTO } from '../../dtos/IAuthDTO';
import { ICreateAuthDTO } from '../../dtos/ICreateAuthDTO';

class AuthRepository implements IAuthRepository {
  private repository: Repository<Auth>;

  constructor() {
    this.repository = AppDataSource.getRepository(Auth);
  }

  async create(data: ICreateAuthDTO): Promise<IAuthDTO> {
    const auth = this.repository.create(data);
    return await this.repository.save(auth);
  }

  async findByUserIdAndRefreshToken(
    user_id: number,
    refresh_token: string
  ): Promise<IAuthDTO | null> {
    const auth = await this.repository.findOne({
      where: { user_id, refresh_token },
    });
    return auth || null;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete({ id });
  }
}

export { AuthRepository };

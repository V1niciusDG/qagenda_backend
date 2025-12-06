import { IAuthDTO } from '../../dtos/IAuthDTO';
import { ICreateAuthDTO } from '../../dtos/ICreateAuthDTO';

interface IAuthRepository {
  create(data: ICreateAuthDTO): Promise<IAuthDTO>;
  findByUserIdAndRefreshToken(
    user_id: number,
    refresh_token: string
  ): Promise<IAuthDTO | null>;
  delete(id: number): Promise<void>;
}

export { IAuthRepository };

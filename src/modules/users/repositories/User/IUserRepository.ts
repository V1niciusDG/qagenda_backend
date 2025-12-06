import { IUserDTO } from '../../dtos/IUserDTO';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUpdateUserDTO } from '../../dtos/IUpdateUserDTO';
import { UserType } from '../../enums/UserType';

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<IUserDTO>;
  findByEmail(email: string): Promise<any | null>;
  findByEmailWithPassword(
    email: string,
    user_type: UserType
  ): Promise<any | null>;
  findByEmailAndUserType(
    email: string,
    user_type: UserType
  ): Promise<any | null>;
  findById(id: number): Promise<IUserDTO | null>;
  list(): Promise<IUserDTO[]>;
  update(data: IUpdateUserDTO): Promise<IUserDTO>;
  updatePassword(id: number, password: string): Promise<void>;
  delete(id: number): Promise<void>;
}

export { IUserRepository };

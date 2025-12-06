import { Repository } from 'typeorm';
import { AppDataSource } from '@database/data-source';
import { User } from '../../entities/User';
import { IUserRepository } from './IUserRepository';
import { IUserDTO } from '../../dtos/IUserDTO';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUpdateUserDTO } from '../../dtos/IUpdateUserDTO';
import { UserType } from '../../enums/UserType';

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create(data: ICreateUserDTO): Promise<IUserDTO> {
    const user = this.repository.create(data);
    await this.repository.save(user);

    // Remover senha do retorno
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as IUserDTO;
  }

  async findByEmail(email: string): Promise<any | null> {
    const user = await this.repository.findOne({ where: { email } });
    return user || null;
  }

  async findByEmailWithPassword(
    email: string,
    user_type: UserType
  ): Promise<any | null> {
    const user = await this.repository.findOne({
      where: { email, user_type },
      select: [
        'id',
        'name',
        'email',
        'password',
        'user_type',
        'phone',
        'avatar_url',
        'email_verified',
        'blocked',
        'created_at',
        'updated_at',
      ],
    });
    return user || null;
  }

  async findByEmailAndUserType(
    email: string,
    user_type: UserType
  ): Promise<any | null> {
    const user = await this.repository.findOne({
      where: { email, user_type },
    });
    return user || null;
  }

  async findById(id: number): Promise<IUserDTO | null> {
    const user = await this.repository.findOne({
      where: { id },
      select: [
        'id',
        'name',
        'email',
        'user_type',
        'phone',
        'avatar_url',
        'email_verified',
        'blocked',
        'created_at',
        'updated_at',
      ],
    });
    return user || null;
  }

  async list(): Promise<IUserDTO[]> {
    const users = await this.repository.find({
      select: [
        'id',
        'name',
        'email',
        'user_type',
        'phone',
        'avatar_url',
        'email_verified',
        'blocked',
        'created_at',
        'updated_at',
      ],
    });
    return users;
  }

  async update(data: IUpdateUserDTO): Promise<IUserDTO> {
    const user = await this.repository.findOne({ where: { id: data.id } });

    if (!user) {
      throw new Error('User not found');
    }

    // Atualizar apenas os campos fornecidos
    if (data.name !== undefined) user.name = data.name;
    if (data.email !== undefined) user.email = data.email;
    if (data.phone !== undefined) user.phone = data.phone;
    if (data.avatar_url !== undefined) user.avatar_url = data.avatar_url;
    if (data.user_type !== undefined) user.user_type = data.user_type;
    user.updated_at = new Date();

    await this.repository.save(user);

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as IUserDTO;
  }

  async updatePassword(id: number, password: string): Promise<void> {
    await this.repository.update(id, { password, updated_at: new Date() });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}

export { UserRepository };

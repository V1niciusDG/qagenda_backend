import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';
import { AppError } from '@config/AppError';
import { IUserRepository } from '../../repositories/User/IUserRepository';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUserDTO } from '../../dtos/IUserDTO';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async execute(data: ICreateUserDTO): Promise<IUserDTO> {
    // Verifica se usuário já existe com mesmo email e user_type
    const userExists = await this.userRepository.findByEmailAndUserType(
      data.email,
      data.user_type
    );

    if (userExists) {
      throw new AppError(
        `User with email ${data.email} and type ${data.user_type} already exists`,
        409
      );
    }

    // Hash da senha
    const passwordHash = await hash(data.password, 10);

    // Cria usuário
    const user = await this.userRepository.create({
      ...data,
      password: passwordHash,
    });

    return user;
  }
}

export { CreateUserUseCase };

import { inject, injectable } from 'tsyringe';
import { AppError } from '@config/AppError';
import { IUserRepository } from '../../repositories/User/IUserRepository';
import { IUpdateUserDTO } from '../../dtos/IUpdateUserDTO';
import { IUserDTO } from '../../dtos/IUserDTO';

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async execute(data: IUpdateUserDTO): Promise<IUserDTO> {
    // Verifica se usuário existe
    const userExists = await this.userRepository.findById(data.id);

    if (!userExists) {
      throw new AppError('User not found', 404);
    }

    // Se estiver atualizando email, verifica se já existe outro usuário com mesmo email e user_type
    if (data.email && data.email !== userExists.email) {
      const user_type = data.user_type || userExists.user_type;
      const emailExists = await this.userRepository.findByEmailAndUserType(
        data.email,
        user_type
      );

      if (emailExists && emailExists.id !== data.id) {
        throw new AppError(
          `Email ${data.email} already in use for user type ${user_type}`,
          409
        );
      }
    }

    // Atualiza usuário
    const updatedUser = await this.userRepository.update(data);

    return updatedUser;
  }
}

export { UpdateUserUseCase };

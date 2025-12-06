import { inject, injectable } from 'tsyringe';
import { AppError } from '@config/AppError';
import { IUserRepository } from '../../repositories/User/IUserRepository';

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async execute(id: number): Promise<void> {
    // Verifica se usuário existe
    const userExists = await this.userRepository.findById(id);

    if (!userExists) {
      throw new AppError('User not found', 404);
    }

    // Deleta usuário
    await this.userRepository.delete(id);
  }
}

export { DeleteUserUseCase };

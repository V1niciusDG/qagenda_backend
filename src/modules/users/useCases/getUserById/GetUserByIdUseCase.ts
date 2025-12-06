import { inject, injectable } from 'tsyringe';
import { AppError } from '@config/AppError';
import { IUserRepository } from '../../repositories/User/IUserRepository';
import { IUserDTO } from '../../dtos/IUserDTO';

@injectable()
class GetUserByIdUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async execute(id: number): Promise<IUserDTO> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }
}

export { GetUserByIdUseCase };

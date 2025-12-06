import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../../repositories/User/IUserRepository';
import { IUserDTO } from '../../dtos/IUserDTO';

@injectable()
class ListUsersUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async execute(): Promise<IUserDTO[]> {
    const users = await this.userRepository.list();
    return users;
  }
}

export { ListUsersUseCase };

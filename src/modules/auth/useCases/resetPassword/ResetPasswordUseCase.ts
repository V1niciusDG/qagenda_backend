import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';
import { AppError } from '@config/AppError';
import { IUserRepository } from '@modules/users/repositories/User/IUserRepository';
import { IPasswordResetRepository } from '../../repositories/PasswordReset/IPasswordResetRepository';

interface IResetPasswordRequest {
  token: string;
  new_password: string;
}

@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('PasswordResetRepository')
    private passwordResetRepository: IPasswordResetRepository
  ) {}

  async execute({ token, new_password }: IResetPasswordRequest): Promise<void> {
    // Busca token
    const passwordReset = await this.passwordResetRepository.findByToken(token);

    if (!passwordReset) {
      throw new AppError('Invalid token', 400);
    }

    // Verifica se o token já foi usado
    if (passwordReset.used_at) {
      throw new AppError('Token already used', 400);
    }

    // Verifica se o token expirou
    const now = new Date();
    if (now > passwordReset.expires_at) {
      throw new AppError('Token expired', 400);
    }

    // Busca usuário
    const user = await this.userRepository.findById(passwordReset.user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Hash da nova senha
    const passwordHash = await hash(new_password, 10);

    // Atualiza senha do usuário
    await this.userRepository.updatePassword(user.id, passwordHash);

    // Marca token como usado
    await this.passwordResetRepository.markAsUsed(passwordReset.id);
  }
}

export { ResetPasswordUseCase };

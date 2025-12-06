import { inject, injectable } from 'tsyringe';
import { AppError } from '@config/AppError';
import { IUserRepository } from '@modules/users/repositories/User/IUserRepository';
import { IPasswordResetRepository } from '../../repositories/PasswordReset/IPasswordResetRepository';
import { UserType } from '@modules/users/enums/UserType';

interface IForgotPasswordRequest {
  email: string;
  user_type: UserType;
}

interface IForgotPasswordResponse {
  token: string;
  message: string;
}

@injectable()
class ForgotPasswordUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('PasswordResetRepository')
    private passwordResetRepository: IPasswordResetRepository
  ) {}

  async execute({
    email,
    user_type,
  }: IForgotPasswordRequest): Promise<IForgotPasswordResponse> {
    // Busca usuário
    const user = await this.userRepository.findByEmailAndUserType(
      email,
      user_type
    );

    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Gera token de 6 dígitos
    const token = Math.floor(100000 + Math.random() * 900000).toString();

    // Define expiração para 1 hora
    const expires_at = new Date();
    expires_at.setHours(expires_at.getHours() + 1);

    // Salva token no banco
    await this.passwordResetRepository.create({
      user_id: user.id,
      token,
      expires_at,
    });

    // TODO: Enviar email com o token (implementar depois)
    // Por enquanto, retorna o token na resposta (apenas para desenvolvimento)

    return {
      token,
      message: 'Password reset token generated successfully',
    };
  }
}

export { ForgotPasswordUseCase };

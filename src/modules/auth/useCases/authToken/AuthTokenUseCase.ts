import { compare } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { AppError } from '@config/AppError';
import auth from '@config/Auth';
import { IUserRepository } from '@modules/users/repositories/User/IUserRepository';
import { IAuthRepository } from '../../repositories/Auth/IAuthRepository';
import { IAuthTokenDTO } from '../../dtos/IAuthTokenDTO';
import { IAuthTokenResponseDTO } from '../../dtos/IAuthTokenResponseDTO';
import { inject, injectable } from 'tsyringe';

@injectable()
class AuthTokenUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('AuthRepository')
    private authRepository: IAuthRepository
  ) {}

  async execute({
    email,
    password,
    user_type,
  }: IAuthTokenDTO): Promise<IAuthTokenResponseDTO> {
    // Busca usuário pelo email e user_type
    const userWithPassword = await this.userRepository.findByEmailWithPassword(
      email,
      user_type
    );

    if (!userWithPassword || !userWithPassword.password) {
      throw new AppError('Email, password or user type incorrect', 401);
    }

    // Verifica senha
    const passwordMatch = await compare(password, userWithPassword.password);

    if (!passwordMatch) {
      throw new AppError('Email, password or user type incorrect', 401);
    }

    // Verifica se usuário está bloqueado
    if (userWithPassword.blocked) {
      throw new AppError('User is blocked', 401);
    }

    const {
      expires_in_token,
      secret_refresh_token,
      secret_token,
      expires_in_refresh_token,
    } = auth;

    // Gera access token
    const token = jwt.sign(
      {
        user: {
          id: userWithPassword.id,
          email: userWithPassword.email,
          user_type: userWithPassword.user_type,
        },
      },
      secret_token as any,
      { expiresIn: expires_in_token } as any
    );

    // Gera refresh token
    const refresh_token = jwt.sign(
      {
        user: {
          id: userWithPassword.id,
          email: userWithPassword.email,
          user_type: userWithPassword.user_type,
        },
      },
      secret_refresh_token as any,
      { expiresIn: expires_in_refresh_token } as any
    );

    // Calcula data de expiração do refresh token
    const expires_hours = parseInt(
      expires_in_refresh_token.replace(/[^\d]/g, '')
    );
    const expires_date = new Date();

    if (expires_in_refresh_token.includes('d')) {
      expires_date.setDate(expires_date.getDate() + expires_hours);
    } else if (expires_in_refresh_token.includes('h')) {
      expires_date.setHours(expires_date.getHours() + expires_hours);
    }

    // Salva refresh token no banco
    await this.authRepository.create({
      expires_date,
      refresh_token,
      user_id: userWithPassword.id,
    });

    return {
      token,
      refresh_token,
      user: {
        id: userWithPassword.id,
        name: userWithPassword.name,
        email: userWithPassword.email,
      },
    };
  }
}

export { AuthTokenUseCase };

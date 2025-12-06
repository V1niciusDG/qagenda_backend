import { IUserRepository } from '@modules/users/repositories/User/IUserRepository';
import { UserRepository } from '@modules/users/repositories/User/UserRepository';
import { IAuthRepository } from '@modules/auth/repositories/Auth/IAuthRepository';
import { AuthRepository } from '@modules/auth/repositories/Auth/AuthRepository';
import { IPasswordResetRepository } from '@modules/auth/repositories/PasswordReset/IPasswordResetRepository';
import { PasswordResetRepository } from '@modules/auth/repositories/PasswordReset/PasswordResetRepository';
import { container } from 'tsyringe';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IAuthRepository>('AuthRepository', AuthRepository);

container.registerSingleton<IPasswordResetRepository>(
  'PasswordResetRepository',
  PasswordResetRepository
);

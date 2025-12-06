import { Request, Response } from 'express';
import { AuthTokenUseCase } from './AuthTokenUseCase';
import { container } from 'tsyringe';

class AuthTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password, user_type } = request.body;

    const authTokenUseCase = container.resolve(AuthTokenUseCase);

    const authInfo = await authTokenUseCase.execute({
      email,
      password,
      user_type,
    });

    return response.status(200).json(authInfo);
  }
}

export { AuthTokenController };

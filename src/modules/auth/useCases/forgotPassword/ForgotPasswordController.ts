import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ForgotPasswordUseCase } from './ForgotPasswordUseCase';

class ForgotPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, user_type } = request.body;

    const forgotPasswordUseCase = container.resolve(ForgotPasswordUseCase);

    const result = await forgotPasswordUseCase.execute({
      email,
      user_type,
    });

    return response.status(200).json(result);
  }
}

export { ForgotPasswordController };

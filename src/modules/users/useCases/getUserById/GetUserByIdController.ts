import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GetUserByIdUseCase } from './GetUserByIdUseCase';

class GetUserByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getUserByIdUseCase = container.resolve(GetUserByIdUseCase);

    const user = await getUserByIdUseCase.execute(Number(id));

    return response.status(200).json(user);
  }
}

export { GetUserByIdController };

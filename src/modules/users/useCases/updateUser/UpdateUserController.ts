import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateUserUseCase } from './UpdateUserUseCase';

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, phone, avatar_url, user_type } = request.body;

    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    const user = await updateUserUseCase.execute({
      id: Number(id),
      name,
      email,
      phone,
      avatar_url,
      user_type,
    });

    return response.status(200).json(user);
  }
}

export { UpdateUserController };

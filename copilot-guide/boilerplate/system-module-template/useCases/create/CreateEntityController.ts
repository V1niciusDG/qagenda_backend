import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateEntityUseCase } from './CreateEntityUseCase';

class CreateEntityController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user = request.user;
    const data = request.body;

    const createEntityUseCase = container.resolve(CreateEntityUseCase);

    const entity = await createEntityUseCase.execute(data, user);

    return response.status(201).json(entity);
  }
}

export { CreateEntityController };

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindEntityUseCase } from './FindEntityUseCase';

class FindEntityController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user = request.user;

    const findEntityUseCase = container.resolve(FindEntityUseCase);

    const entities = await findEntityUseCase.execute(user);

    return response.json(entities);
  }
}

export { FindEntityController };

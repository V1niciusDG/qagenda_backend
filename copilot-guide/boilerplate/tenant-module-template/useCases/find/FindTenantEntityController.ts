import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindTenantEntityUseCase } from './FindTenantEntityUseCase';

class FindTenantEntityController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user = request.user;
    const { lang } = request.query;

    const findTenantEntityUseCase = container.resolve(FindTenantEntityUseCase);

    let entities;
    if (lang) {
      entities = await findTenantEntityUseCase.executeByLang(
        lang as string,
        user,
      );
    } else {
      entities = await findTenantEntityUseCase.execute(user);
    }

    return response.json(entities);
  }
}

export { FindTenantEntityController };

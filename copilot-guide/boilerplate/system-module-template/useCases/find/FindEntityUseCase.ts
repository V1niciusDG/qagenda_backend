import { inject, injectable } from 'tsyringe';
import { AppError } from '@config/AppError';
import { IMultiLangCoreProvider } from '@providers/MultiLangCore/IMultiLangCoreProvider';
import { IEntityRepository } from '@modules/[module-name]/repositories/Entity/IEntityRepository';
import { IEntityDTO } from '@modules/[module-name]/dtos/IEntityDTO';
import { IRequestUser } from '@config/types/RequestUser';

@injectable()
class FindEntityUseCase {
  constructor(
    @inject('EntityRepository')
    private entityRepository: IEntityRepository,

    @inject('MultiLangCoreProvider')
    private multiLangCoreProvider: IMultiLangCoreProvider,
  ) {}

  async execute(user: IRequestUser): Promise<IEntityDTO[]> {
    await this.entityRepository.initialize({
      tenant_id: user.tenant_id,
      project_id: user.project_id,
    });

    try {
      const entities = await this.entityRepository.find();
      return entities;
    } catch (err) {
      console.error('Erro ao buscar entidades:', err);
      throw new AppError(
        await this.multiLangCoreProvider.getTranscriptionByKeyAndLang(
          'error.general',
          user.lang,
        ),
        500,
      );
    }
  }
}

export { FindEntityUseCase };

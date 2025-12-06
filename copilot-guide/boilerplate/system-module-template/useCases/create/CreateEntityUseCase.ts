import { inject, injectable } from 'tsyringe';
import { AppError } from '@config/AppError';
import { IMultiLangCoreProvider } from '@providers/MultiLangCore/IMultiLangCoreProvider';
import { IEntityRepository } from '@modules/[module-name]/repositories/Entity/IEntityRepository';
import { IEntityDTO } from '@modules/[module-name]/dtos/IEntityDTO';
import { ICreateEntityDTO } from '@modules/[module-name]/dtos/ICreateEntityDTO';
import { IRequestUser } from '@config/types/RequestUser';

@injectable()
class CreateEntityUseCase {
  constructor(
    @inject('EntityRepository')
    private entityRepository: IEntityRepository,

    @inject('MultiLangCoreProvider')
    private multiLangCoreProvider: IMultiLangCoreProvider,
  ) {}

  async execute(
    data: ICreateEntityDTO,
    user: IRequestUser,
  ): Promise<IEntityDTO> {
    await this.entityRepository.initialize({
      tenant_id: user.tenant_id,
      project_id: user.project_id,
    });

    try {
      const entity = await this.entityRepository.create(data);
      return entity;
    } catch (err) {
      console.error('Erro ao criar entidade:', err);
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

export { CreateEntityUseCase };

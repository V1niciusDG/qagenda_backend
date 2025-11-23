import { inject, injectable } from 'tsyringe';
import { AppError } from '@config/AppError';
import { IMultiLangCoreProvider } from '@providers/MultiLangCore/IMultiLangCoreProvider';
import { ITenantEntityRepository } from '@modules/[module-name]/repositories/TenantEntity/ITenantEntityRepository';
import { ITenantEntityDTO } from '@modules/[module-name]/dtos/ITenantEntityDTO';
import { IRequestUser } from '@config/types/RequestUser';

@injectable()
class FindTenantEntityUseCase {
  constructor(
    @inject('TenantEntityRepository')
    private tenantEntityRepository: ITenantEntityRepository,

    @inject('MultiLangCoreProvider')
    private multiLangCoreProvider: IMultiLangCoreProvider,
  ) {}

  async execute(user: IRequestUser): Promise<ITenantEntityDTO[]> {
    try {
      const entities = await this.tenantEntityRepository.find();
      return entities;
    } catch (err) {
      console.error('Erro ao buscar entidades do tenant:', err);
      throw new AppError(
        await this.multiLangCoreProvider.getTranscriptionByKeyAndLang(
          'error.general',
          user.lang,
        ),
        500,
      );
    }
  }

  async executeByLang(
    lang: string,
    user: IRequestUser,
  ): Promise<ITenantEntityDTO[]> {
    try {
      const entities = await this.tenantEntityRepository.findByLang(lang);
      return entities;
    } catch (err) {
      console.error('Erro ao buscar entidades por idioma:', err);
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

export { FindTenantEntityUseCase };

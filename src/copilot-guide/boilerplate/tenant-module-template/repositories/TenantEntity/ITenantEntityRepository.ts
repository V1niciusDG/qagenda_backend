import { ITenantEntityDTO } from '@modules/[module-name]/dtos/ITenantEntityDTO';

interface ITenantEntityRepository {
  find(): Promise<ITenantEntityDTO[]>;
  findByKey(key: string): Promise<ITenantEntityDTO | null>;
  findByLang(lang: string): Promise<ITenantEntityDTO[]>;
  create(
    data: Omit<ITenantEntityDTO, 'id' | 'created_at' | 'updated_at'>,
  ): Promise<ITenantEntityDTO>;
  update(
    id: number,
    data: Partial<ITenantEntityDTO>,
  ): Promise<ITenantEntityDTO | null>;
  delete(id: number): Promise<boolean>;
}

export { ITenantEntityRepository };

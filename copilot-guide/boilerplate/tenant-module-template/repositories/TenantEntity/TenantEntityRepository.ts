import { TenantEntity } from '@modules/[module-name]/entities/TenantEntity';
import { ITenantEntityRepository } from './ITenantEntityRepository';
import { getConnection, Repository } from 'typeorm';
import { ITenantEntityDTO } from '@modules/[module-name]/dtos/ITenantEntityDTO';
import { singleton } from 'tsyringe';

@singleton()
class TenantEntityRepository implements ITenantEntityRepository {
  private repository: Repository<TenantEntity>;

  constructor() {
    // Para módulos tenant, usa conexão padrão (banco principal)
    const connection = getConnection();
    this.repository = connection.getRepository(TenantEntity);
  }

  async find(): Promise<ITenantEntityDTO[]> {
    return await this.repository.find();
  }

  async findByKey(key: string): Promise<ITenantEntityDTO | null> {
    const entity = await this.repository.findOne({ where: { key } });
    return entity || null;
  }

  async findByLang(lang: string): Promise<ITenantEntityDTO[]> {
    return await this.repository.find({ where: { lang } });
  }

  async create(
    data: Omit<ITenantEntityDTO, 'id' | 'created_at' | 'updated_at'>,
  ): Promise<ITenantEntityDTO> {
    const entity = this.repository.create(data);
    return await this.repository.save(entity);
  }

  async update(
    id: number,
    data: Partial<ITenantEntityDTO>,
  ): Promise<ITenantEntityDTO | null> {
    await this.repository.update(id, data);
    const updatedEntity = await this.repository.findOne({ where: { id } });
    return updatedEntity || null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected || 0) > 0;
  }
}

export { TenantEntityRepository };

import { Entity } from '@modules/[module-name]/entities/Entity';
import { IEntityRepository } from './IEntityRepository';
import { getConnection, Repository } from 'typeorm';
import { IEntityDTO } from '@modules/[module-name]/dtos/IEntityDTO';
import { ICreateEntityDTO } from '@modules/[module-name]/dtos/ICreateEntityDTO';
import { IUpdateEntityDTO } from '@modules/[module-name]/dtos/IUpdateEntityDTO';
import { singleton } from 'tsyringe';

@singleton()
class EntityRepository implements IEntityRepository {
  private repository: Repository<Entity>;
  private project_id: number;

  constructor() {}

  async initialize({
    tenant_id,
    project_id,
  }: {
    tenant_id: any;
    project_id: any;
  }): Promise<void> {
    this.project_id = project_id;
    const connection = getConnection(tenant_id.toString());
    this.repository = connection.getRepository(Entity);
  }

  async find(): Promise<IEntityDTO[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<IEntityDTO | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity || null;
  }

  async create(data: ICreateEntityDTO): Promise<IEntityDTO> {
    const entity = this.repository.create(data);
    return await this.repository.save(entity);
  }

  async update(data: IUpdateEntityDTO): Promise<IEntityDTO | null> {
    const { id, ...updateData } = data;
    await this.repository.update(id, updateData);
    return await this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected || 0) > 0;
  }
}

export { EntityRepository };

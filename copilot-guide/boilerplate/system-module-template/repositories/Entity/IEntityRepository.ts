import { IEntityDTO } from '@modules/[module-name]/dtos/IEntityDTO';
import { ICreateEntityDTO } from '@modules/[module-name]/dtos/ICreateEntityDTO';
import { IUpdateEntityDTO } from '@modules/[module-name]/dtos/IUpdateEntityDTO';

interface IEntityRepository {
  find(): Promise<IEntityDTO[]>;
  findById(id: number): Promise<IEntityDTO | null>;
  create(data: ICreateEntityDTO): Promise<IEntityDTO>;
  update(data: IUpdateEntityDTO): Promise<IEntityDTO | null>;
  delete(id: number): Promise<boolean>;
  initialize({ tenant_id, project_id }): void;
}

export { IEntityRepository };

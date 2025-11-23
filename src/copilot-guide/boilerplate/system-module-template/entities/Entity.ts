import { Column, Entity as TypeOrmEntity, PrimaryColumn } from 'typeorm';

@TypeOrmEntity('entities') // Substitua 'entities' pelo nome da tabela
class Entity {
  @PrimaryColumn({ name: 'ID', type: 'int' })
  id: number;

  @Column({ name: 'Name', type: 'nvarchar', length: 255 })
  name: string;

  @Column({
    name: 'Description',
    type: 'nvarchar',
    length: 'MAX',
    nullable: true,
  })
  description?: string;

  @Column({
    name: 'created_at',
    type: 'datetime',
    default: () => 'GETDATE()',
  })
  created_at?: Date;

  @Column({
    name: 'updated_at',
    type: 'datetime',
    default: () => 'GETDATE()',
    onUpdate: 'GETDATE()',
  })
  updated_at?: Date;

  constructor() {}
}

export { Entity };

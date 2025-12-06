import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tenant_entities') // Substitua pelo nome da tabela do tenant
class TenantEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  key: string;

  @Column()
  value: string;

  @Column()
  lang: 'pt_BR' | 'en_US' | 'es_ES';

  @Column({
    type: 'datetime',
    default: () =>
      process.env.NODE_ENV === 'test' ? 'CURRENT_TIMESTAMP' : 'GETDATE()',
  })
  created_at?: Date;

  @Column({
    type: 'datetime',
    default: () =>
      process.env.NODE_ENV === 'test' ? 'CURRENT_TIMESTAMP' : 'GETDATE()',
    onUpdate:
      process.env.NODE_ENV === 'test' ? 'CURRENT_TIMESTAMP' : 'GETDATE()',
  })
  updated_at?: Date;

  constructor() {}
}

export { TenantEntity };

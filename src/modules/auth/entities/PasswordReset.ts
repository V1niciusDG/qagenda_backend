import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('password_resets')
class PasswordReset {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  user_id: number;

  @Column({ type: 'varchar', length: 6 })
  token: string;

  @Column({ type: 'timestamp' })
  expires_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  used_at?: Date;

  @Column({ type: 'timestamp', default: () => 'NOW()' })
  created_at: Date;

  constructor() {}
}

export { PasswordReset };

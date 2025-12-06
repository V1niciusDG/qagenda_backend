import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';
import { UserType } from '../enums/UserType';

@Entity('users')
@Index(['email', 'user_type'], { unique: true })
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'enum', enum: UserType })
  user_type: UserType;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  avatar_url?: string;

  @Column({ type: 'boolean', default: false })
  email_verified: boolean;

  @Column({ type: 'varchar', length: 6, nullable: true })
  email_verification_token?: string;

  @Column({ type: 'boolean', default: false })
  blocked: boolean;

  @Column({ type: 'timestamp', default: () => 'NOW()' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'NOW()' })
  updated_at: Date;

  constructor() {}
}

export { User };

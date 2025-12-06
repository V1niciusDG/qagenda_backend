import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('auths')
class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  refresh_token: string;

  @Column({ type: 'int' })
  user_id: number;

  @Column({ type: 'timestamp' })
  expires_date: Date;

  @Column({ type: 'timestamp', default: () => 'NOW()' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'NOW()' })
  updated_at: Date;

  constructor() {}
}

export { Auth };

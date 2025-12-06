import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1733155200000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Criar tipo enum para user_type
    await queryRunner.query(`
      CREATE TYPE user_type_enum AS ENUM ('client', 'company');
    `);

    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'user_type',
            type: 'user_type_enum',
            isNullable: false,
          },
          {
            name: 'phone',
            type: 'varchar',
            length: '20',
            isNullable: true,
          },
          {
            name: 'avatar_url',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          {
            name: 'email_verified',
            type: 'boolean',
            default: false,
          },
          {
            name: 'email_verification_token',
            type: 'varchar',
            length: '6',
            isNullable: true,
          },
          {
            name: 'blocked',
            type: 'boolean',
            default: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'NOW()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'NOW()',
          },
        ],
      })
    );

    // Criar índice composto único para email + user_type
    await queryRunner.query(
      `CREATE UNIQUE INDEX IDX_users_email_user_type ON users(email, user_type)`
    );

    // Criar índice no user_type para otimizar filtros
    await queryRunner.query(
      `CREATE INDEX IDX_users_user_type ON users(user_type)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IDX_users_user_type`);
    await queryRunner.query(`DROP INDEX IDX_users_email_user_type`);
    await queryRunner.dropTable('users');
    await queryRunner.query(`DROP TYPE user_type_enum`);
  }
}

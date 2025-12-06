import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePasswordResetsTable1765048568862
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'password_resets',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'user_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'token',
            type: 'varchar',
            length: '6',
            isNullable: false,
          },
          {
            name: 'expires_at',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'used_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'NOW()',
          },
        ],
        foreignKeys: [
          {
            name: 'FK_password_resets_users',
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      })
    );

    // Criar índice único no token
    await queryRunner.query(
      `CREATE UNIQUE INDEX IDX_password_resets_token ON password_resets(token)`
    );

    // Criar índice no user_id
    await queryRunner.query(
      `CREATE INDEX IDX_password_resets_user_id ON password_resets(user_id)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IDX_password_resets_user_id`);
    await queryRunner.query(`DROP INDEX IDX_password_resets_token`);
    await queryRunner.dropTable('password_resets');
  }
}

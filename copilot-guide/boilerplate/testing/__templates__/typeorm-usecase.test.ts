import { makeQueryRunner } from '@test-utils/typeorm';

class ExampleRepository {
  constructor(private readonly queryRunner: any) {}
  async findAll() {
    return this.queryRunner.manager.createQueryBuilder().getRawMany();
  }
}

describe('TypeORM UseCase Template', () => {
  it('findAll resolves empty array by default', async () => {
    const qr = makeQueryRunner();
    const repo = new ExampleRepository(qr as any);
    const data = await repo.findAll();
    expect(data).toEqual([]);
  });
});

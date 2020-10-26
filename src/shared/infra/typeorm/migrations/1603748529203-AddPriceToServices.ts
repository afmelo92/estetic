import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddPriceToServices1603748529203
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'services',
      new TableColumn({
        name: 'price',
        type: 'integer',
        default: 0,
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('services', 'price');
  }
}

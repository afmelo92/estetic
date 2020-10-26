import Category from '../infra/typeorm/entities/Category';

export default interface ICategoriesRepository {
  create(name: string): Promise<Category>;
  findByName(name: string): Promise<Category | undefined>;
  findAll(): Promise<Category[]>;
  findById(id: string): Promise<Category | undefined>;
}

import { getRepository, Repository } from 'typeorm';

import ICategoriesRepository from '@modules/appointments/repositories/ICategoriesRepository';
import Category from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async findAll(): Promise<Category[]> {
    const categories = await this.ormRepository.find();

    return categories;
  }

  public async findByName(name: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return category;
  }

  public async findById(id: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne(id);

    return category;
  }

  public async create(name: string): Promise<Category> {
    const category = this.ormRepository.create({
      name,
    });

    this.ormRepository.save(category);

    return category;
  }
}

export default CategoriesRepository;

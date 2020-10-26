import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Category from '../infra/typeorm/entities/Category';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

@injectable()
class CreateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute(name: string): Promise<Category> {
    const checkCategoryExists = await this.categoriesRepository.findByName(
      name,
    );

    if (checkCategoryExists) throw new AppError('Category already exists');

    const category = await this.categoriesRepository.create(name);

    return category;
  }
}

export default CreateCategoryService;

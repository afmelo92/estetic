import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Service from '../infra/typeorm/entities/Service';
import ICategoriesRepository from '../repositories/ICategoriesRepository';
import IServicesRepository from '../repositories/IServicesRepository';

interface IRequest {
  category_id: string;
  name: string;
  price: number;
}

@injectable()
class CreateServiceService {
  constructor(
    @inject('ServicesRepository')
    private servicesRepository: IServicesRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({
    name,
    category_id,
    price,
  }: IRequest): Promise<Service> {
    const checkServiceExists = await this.servicesRepository.findByName(name);

    if (checkServiceExists) throw new AppError('Service already exists');

    const checkCategoryExists = await this.categoriesRepository.findById(
      category_id,
    );

    if (!checkCategoryExists) throw new AppError('Category does not exists');

    if (price < 0) throw new AppError('Price can not be a negative number');

    const service = await this.servicesRepository.create({
      category_id,
      name,
      price,
    });

    return service;
  }
}

export default CreateServiceService;

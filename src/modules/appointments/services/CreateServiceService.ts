import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Service from '../infra/typeorm/entities/Service';
import IServicesRepository from '../repositories/IServicesRepository';

interface IRequest {
  category_id: string;
  name: string;
}

@injectable()
class CreateServiceService {
  constructor(
    @inject('ServicesRepository')
    private servicesRepository: IServicesRepository,
  ) {}

  public async execute({ name, category_id }: IRequest): Promise<Service> {
    const checkServiceExists = await this.servicesRepository.findByName(name);

    if (checkServiceExists) throw new AppError('Service already exists');

    const service = await this.servicesRepository.create({ category_id, name });

    return service;
  }
}

export default CreateServiceService;

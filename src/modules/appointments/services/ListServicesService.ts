import { inject, injectable } from 'tsyringe';
import Service from '../infra/typeorm/entities/Service';
import IServicesRepository from '../repositories/IServicesRepository';

@injectable()
class ListServicesService {
  constructor(
    @inject('ServicesRepository')
    private servicesRepository: IServicesRepository,
  ) {}

  public async execute(): Promise<Service[]> {
    const services = await this.servicesRepository.findAll();

    return services;
  }
}

export default ListServicesService;

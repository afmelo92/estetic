import ICreateServiceDTO from '@modules/appointments/dtos/ICreateServiceDTO';
import IServicesRepository from '@modules/appointments/repositories/IServicesRepository';
import { getRepository, Repository } from 'typeorm';
import Service from '../entities/Service';

class ServicesRepository implements IServicesRepository {
  private ormRepository: Repository<Service>;

  constructor() {
    this.ormRepository = getRepository(Service);
  }

  public async create({
    category_id,
    name,
    price,
  }: ICreateServiceDTO): Promise<Service> {
    const service = this.ormRepository.create({
      category_id,
      name,
      price,
    });

    await this.ormRepository.save(service);

    return service;
  }

  public async findById(id: string): Promise<Service | undefined> {
    const service = await this.ormRepository.findOne(id);

    return service;
  }

  public async findAll(): Promise<Service[]> {
    const services = await this.ormRepository.find();

    return services;
  }

  public async findByName(name: string): Promise<Service | undefined> {
    const service = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return service;
  }
}

export default ServicesRepository;

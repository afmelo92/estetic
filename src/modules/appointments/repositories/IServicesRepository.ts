import ICreateServiceDTO from '../dtos/ICreateServiceDTO';
import Service from '../infra/typeorm/entities/Service';

export default interface IServicesRepository {
  create(data: ICreateServiceDTO): Promise<Service>;
  findByName(name: string): Promise<Service | undefined>;
  findAll(): Promise<Service[]>;
  findById(id: string): Promise<Service | undefined>;
}

import CreateServiceService from '@modules/appointments/services/CreateServiceService';
import ListServicesService from '@modules/appointments/services/ListServicesService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ServicesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, category_id, price } = request.body;

    const createService = container.resolve(CreateServiceService);

    const service = await createService.execute({ name, category_id, price });

    return response.json(classToClass(service));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listServices = container.resolve(ListServicesService);

    const services = await listServices.execute();

    return response.json(classToClass(services));
  }
}

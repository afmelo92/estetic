import { Response, Request } from 'express';
import { container } from 'tsyringe';

import CreateCategoryService from '@modules/appointments/services/CreateCategoryService';
import ListCategoriesService from '@modules/appointments/services/ListCategoriesService';

export default class CategoriesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createCategory = container.resolve(CreateCategoryService);

    const category = await createCategory.execute(name);

    return response.json(category);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listCategories = container.resolve(ListCategoriesService);

    const categories = await listCategories.execute();

    return response.json(categories);
  }
}

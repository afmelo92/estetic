import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import AppointmentController from '../controllers/AppointmentController';
import ProviderAppointmentController from '../controllers/ProviderAppointmentController';
import CategoriesController from '../controllers/CategoriesController';
import ServicesController from '../controllers/ServicesController';

const appointmentsRouter = Router();
const appointmentController = new AppointmentController();
const providerAppointmentController = new ProviderAppointmentController();
const categoriesController = new CategoriesController();
const servicesController = new ServicesController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', appointmentController.create);

appointmentsRouter.post('/categories', categoriesController.create);
appointmentsRouter.get('/categories', categoriesController.index);

appointmentsRouter.post('/services', servicesController.create);
appointmentsRouter.get('/services', servicesController.index);

appointmentsRouter.get('/me', providerAppointmentController.index);

export default appointmentsRouter;

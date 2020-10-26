import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import AppointmentController from '../controllers/AppointmentController';
import ProviderAppointmentController from '../controllers/ProviderAppointmentController';
import CategoriesController from '../controllers/CategoriesController';

const appointmentsRouter = Router();
const appointmentController = new AppointmentController();
const providerAppointmentController = new ProviderAppointmentController();
const categoriesController = new CategoriesController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', appointmentController.create);

appointmentsRouter.post('/categories', categoriesController.create);
appointmentsRouter.get('/categories', categoriesController.index);

appointmentsRouter.get('/me', providerAppointmentController.index);

export default appointmentsRouter;

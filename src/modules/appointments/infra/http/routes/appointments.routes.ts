import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import AppointmentController from '../controllers/AppointmentController';
import ProviderAppointmentController from '../controllers/ProviderAppointmentController';

const appointmentsRouter = Router();
const appointmentController = new AppointmentController();
const providerAppointmentController = new ProviderAppointmentController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', appointmentController.create);

appointmentsRouter.get('/me', providerAppointmentController.index);

export default appointmentsRouter;

import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import AppointmentController from '../controllers/AppointmentController';

const appointmentsRouter = Router();
const appointmentController = new AppointmentController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', (request, response) => {
  return response.json({ message: 'Appointments' });
});

appointmentsRouter.post('/', appointmentController.create);

export default appointmentsRouter;

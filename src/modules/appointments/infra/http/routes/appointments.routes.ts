import { Router } from 'express';

import AppointmentController from '../controllers/AppointmentController';

const appointmentsRouter = Router();
const appointmentController = new AppointmentController();

appointmentsRouter.get('/', (request, response) => {
  return response.json({ message: 'Appointments' });
});

appointmentsRouter.post('/', appointmentController.create);

export default appointmentsRouter;

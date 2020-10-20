import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import { parseISO } from 'date-fns';

export default class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider, date } = request.body;

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      provider,
      date: parseISO(date),
    });

    return response.json(appointment);
  }
}

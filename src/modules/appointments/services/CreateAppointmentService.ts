import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
  provider_id: string;
  date: Date;
  user_id: string;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    provider_id,
    user_id,
    date,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const checkProviderExists = await this.usersRepository.findById(
      provider_id,
    );

    if (!checkProviderExists) throw new AppError('Provider not found.');

    const findAppointmentsInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
      provider_id,
    );

    if (findAppointmentsInSameDate)
      throw new AppError('Date not available for such provider.');

    if (isBefore(appointmentDate, Date.now()))
      throw new AppError('Do you have a time machine? Past dates not allowed.');

    if (user_id === provider_id)
      throw new AppError("You can't create an appointment for yourself ");

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17)
      throw new AppError('Reservations allowed only between 8am and 5pm');

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;

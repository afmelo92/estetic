import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUsersDTO';

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}

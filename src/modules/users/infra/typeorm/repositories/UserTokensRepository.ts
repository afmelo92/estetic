import { getRepository, Repository } from 'typeorm';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

import UserTokens from '../entities/UserTokens';

class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserTokens>;

  constructor() {
    this.ormRepository = getRepository(UserTokens);
  }

  public async findByToken(token: string): Promise<UserTokens | undefined> {
    const userTokens = await this.ormRepository.findOne({
      where: { token },
    });

    return userTokens;
  }

  public async generate(user_id: string): Promise<UserTokens> {
    const userTokens = this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(userTokens);

    return userTokens;
  }
}

export default UserTokensRepository;

import { IUser } from '../Interfaces/users/IUser';
import { IUserModel } from '../Interfaces/users/IUserModel';
import SequelizeUsers from '../database/models/UsersModel';

export default class UserModel implements IUserModel {
  private model = SequelizeUsers;

  // async findAll(): Promise<IUser[]> {
  //   const users = await this.model.findAll();
  //   return users;
  // }

  async findByUserEmail(email: string): Promise<IUser | null> {
    const [user] = await this.model.findAll({ where: { email } });
    if (!user) return null;
    return user;
  }
}

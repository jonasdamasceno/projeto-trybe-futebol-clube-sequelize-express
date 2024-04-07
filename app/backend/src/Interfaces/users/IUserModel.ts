import { IUser } from './IUser';

export interface IUserModel {
  findByUserEmail(email: string): Promise<IUser | null>;
}

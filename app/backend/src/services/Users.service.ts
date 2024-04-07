import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ServiceResponse } from '../Interfaces/serviceResponse';
import { IUserModel } from '../Interfaces/users/IUserModel';
import UserModel from '../models/UsersModel';

type LoginResponse = { token: string };
type Payload = {
  sub: number;
  role: string;
  email: string;
  iat?: number;
  exp?: number;
};

export default class UsersService {
  constructor(private userModel: IUserModel = new UserModel()) {}

  public async login(email: string, password: string): Promise<ServiceResponse<LoginResponse>> {
    const user = await this.userModel.findByUserEmail(email);
    if (!user) return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    if (!bcrypt.compareSync(password, user.password)) {
      return {
        status: 'UNAUTHORIZED',
        data: { message: 'Invalid email or password' },
      };
    }
    const payload: Payload = {
      sub: Number(user.id),
      role: user.role,
      email: user.email,
    };
    const secret = process.env.JWT_SECRET ?? '';
    const token = jwt.sign(payload, secret, { expiresIn: '7d' });
    return { status: 'SUCCESSFUL', data: { token } };
  }
}

import { Request, Response } from 'express';
import HTTPMap from '../utils/httpStatusMap';
import UsersService from '../services/Users.service';

export default class UserController {
  constructor(private userService = new UsersService()) {}

  public async userLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    const responseUserService = await this.userService.login(email, password);
    return res
      .status(HTTPMap(responseUserService.status))
      .json(responseUserService.data);
  }

  public static async getRoleFromAuthToken(
    _req: Request,
    res: Response,
  ): Promise<Response> {
    const { role } = res.locals.auth;
    return res.status(200).json({ role });
  }
}

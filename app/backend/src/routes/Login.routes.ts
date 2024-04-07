import { Router, Request, Response } from 'express';
import Validations from '../middlewares/validations';
import UserController from '../controllers/User.controller';
import AuthMiddleware from '../middlewares/auth';

const userController = new UserController();

const loginRouter = Router();

loginRouter.post(
  '/',
  Validations.validateLoginFields,
  (req: Request, res: Response) => userController.userLogin(req, res),
);
loginRouter.get('/role', AuthMiddleware.handle, (req: Request, res: Response) =>
  UserController.getRoleFromAuthToken(req, res));

export default loginRouter;

import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: User = await this.authService.signup(userData);

      res.status(201).json({
        data: {
          id: signUpUserData.id,
          email: signUpUserData.email,
        },
        message: 'signup',
      });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const { tokenData, findUser } = await this.authService.login(userData);

      res.status(200).json({
        data: {
          id: findUser.id,
          email: findUser.email,
          auth: tokenData,
        },
        message: 'login',
      });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);

      res.status(200).json({
        data: {
          id: logOutUserData.id,
          email: logOutUserData.email,
        },
        message: 'logout',
      });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;

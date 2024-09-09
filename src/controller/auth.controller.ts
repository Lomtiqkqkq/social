import { AuthService } from '../service/auth.service';
import { Request, Response } from 'express';

export class AuthController {
  static authService: AuthService;

  static async registration(req: Request, res: Response) {
    try {
      const { username, password, email } = req.body;
      const tokens = await this.authService.registration(req.body);
      res.header('Authorization', `Bearer ${tokens['accessToken']}`);
      res.cookie('jwt', tokens['refreshToken'], {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(200).send('Registration successfully');
    } catch (e) {
      res.status(401).send({ 'something went wrong': false });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { username, password, email } = req.body;
      const tokens = await this.authService.logIn(req.body);
      res.header('Authorization', `Bearer ${tokens['accessToken']}`);
      res.cookie('jwt', tokens['refreshToken'], {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(200).send('LogIn successfully');
    } catch (e) {
      res.status(401).send({ 'something went wrong': false });
    }
  }

  static async logout(req: Request, res: Response) {
    const cookie = req.cookies;
    const accessToken = req.header('Authorization');
    if (cookie?.jwt && accessToken) {
      const userId = await this.authService
        .parseJwt(accessToken)
        .then((object) => {
          return object['userId'];
        });
      await this.authService.logOut(userId, accessToken);
      res.clearCookie('jwt', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });
      res.json('you unauthorized!');
    }
    res.status(204);
  }
  static updateAccessToken(req: Request, res: Response) {
    try {
      const cookie = req.cookies;
      if (!cookie?.jwt) {
        res.status(204).send('ERROR PARSE');
      }
    } catch (e) {}
  }
  static updateRefreshToken(req: Request, res: Response) {}
}

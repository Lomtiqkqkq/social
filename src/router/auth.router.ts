import express, { Router } from 'express';
import { AuthController } from '../controller/auth.controller';

const router = express.Router();

router.post('/registration', AuthController.registration);
router.post('/login', AuthController.login);
router.post('logout', AuthController.logout);
router.post('/updateAccess', AuthController.updateAccessToken);
router.post('/updateRefresh', AuthController.updateRefreshToken);
// export class AuthRouter {
//   router = Router();
//   authController = new AuthController();
//   constructor() {
//     this.initializationRouter();
//   }
//   initializationRouter() {
//     this.router.post('/registration', AuthController.registration);
//     this.router.post('/login', this.authController.login);
//     this.router.post('logout', this.authController.logout);
//     this.router.post('/updateAccess', this.authController.updateAccessToken);
//     this.router.post('/updateRefresh', this.authController.updateRefreshToken);
//   }
// }

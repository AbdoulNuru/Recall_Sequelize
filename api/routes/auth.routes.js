/* eslint-disable import/named */
import Router from 'express';
import authController from '../controllers/authController';
import { validateUserInfo, validateLogin } from '../helpers/authValidation';

const routes = Router();

routes.post('/register', validateUserInfo, authController.register);
routes.post('/login', validateLogin, authController.login);

export default routes;

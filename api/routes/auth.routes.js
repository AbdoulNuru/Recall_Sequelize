import Router from 'express';
import authController from '../controllers/authController';
import validate from '../helpers/authValidation';

const routes = Router();

routes.post('/register', validate, authController.register);
routes.post('/login', authController.login);

export default routes;

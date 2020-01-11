import Router from 'express';
import authController from '../controllers/authController';

const routes = Router();

routes.post('/register', authController.register);

export default routes;
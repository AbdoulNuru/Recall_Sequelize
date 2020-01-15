import Router from 'express';
import shareController from '../controllers/shareController';

const routes = Router();

routes.post('/share', shareController.createIdea);

export default routes;

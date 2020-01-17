import Router from 'express';
import shareController from '../controllers/shareController';
import authorize from '../middlewares/verifyToken';

const routes = Router();

routes.post('/share', authorize, shareController.createIdea);

export default routes;

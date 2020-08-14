import express from 'express';

import ClassesController from './controllers/ClassesConroller';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router(); //express router module
const classesControllers = new ClassesController();
const connectionsController = new ConnectionsController();

routes.get('/classes', classesControllers.index);
routes.post('/classes', classesControllers.create); 

routes.get('/connections', connectionsController.index)
routes.post('/connections', connectionsController.create)

export default routes;
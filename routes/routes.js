import express from 'express';
import user from './user.routes.js';
import petshop from './petshop.routes.js';
import pet from './pet.routes.js';
import service from './service.routes.js'
import login from './login.routes.js';

const router = express.Router();

router.use('/user', user);
router.use('/petshop', petshop);
router.use('/pet', pet);
router.use('/service', service);
router.use('/login', login);

export default router;
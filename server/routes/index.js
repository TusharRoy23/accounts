import { Router } from 'express';
import authRouter from './v1/auth';
import profileRouter from './v1/profile';
import categoryRouter from './v1/category';
import subHeadRouter from './v1/subHead';

const v1Router = new Router();
v1Router.use('/api/v1/auth', authRouter);
v1Router.use('/api/v1/profile', profileRouter);
v1Router.use('/api/v1/category', categoryRouter);
v1Router.use('/api/v1/subHead', subHeadRouter);

export default v1Router;
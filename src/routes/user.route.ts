import { Router } from 'express';
import authcontroller from '../controllers/auth/auth.controller';
import { celebrate } from 'celebrate';
import authValidation from '../validations/auth.validation';

  const userRouter = Router();
  
  userRouter.post('/login',celebrate(authValidation.login), authcontroller.login);
  userRouter.post('/register',celebrate(authValidation.register), authcontroller.register);

export default userRouter;

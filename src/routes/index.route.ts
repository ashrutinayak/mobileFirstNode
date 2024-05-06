import { Router } from 'express';
import userRoute  from './user.route';
import movieRouter from './movie.route';
import favouritRoute from './favourite.route';

  const router = Router();
  router.use('/users', userRoute);
  router.use('/movie', movieRouter);
  router.use('/fav', favouritRoute);

export default router ;
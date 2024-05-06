import { Router } from 'express';
import movieController from '../controllers/movie/movie.controller';
import authenticateToken from '../helpers/jwt.helper';
import { celebrate } from 'celebrate';
import movieValidation from '../validations/movie.validation';

  const movieRouter = Router();
  
  movieRouter.get('/list', authenticateToken, movieController.fetchMovie);
  movieRouter.get('/details/:title', authenticateToken, celebrate(movieValidation.movieSearch) , movieController.searchMovie)

export default movieRouter;

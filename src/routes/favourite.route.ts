import { Router } from 'express';
import authenticateToken from '../helpers/jwt.helper';
import favouriteController from '../controllers/favourite/favourite.controller';
import { celebrate } from 'celebrate';
import favouriteValidation from '../validations/favourite.validation';
  const favouritRoute = Router();
  
  favouritRoute.post('/', authenticateToken,celebrate(favouriteValidation.addFavourite), favouriteController.favMovie);
  favouritRoute.get('/list',authenticateToken, favouriteController.favMovieList);
  favouritRoute.delete('/unfav', authenticateToken ,celebrate(favouriteValidation.removeFavourite), favouriteController.unFavMovie)

export default favouritRoute;

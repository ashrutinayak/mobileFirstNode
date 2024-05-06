import { Joi } from 'celebrate'

const addFavourite = {
  body: {
    movieTitle: Joi.string().required(),
  }
}

const removeFavourite = {
  params: {
    id: Joi.string().required(),
  }
}

export default {
  addFavourite,
  removeFavourite
}
import { Joi } from 'celebrate'

const movieSearch = {
  params: {
    movieTitle: Joi.string().required(),
  }
}

export default {
  movieSearch
}
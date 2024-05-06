import axios from "axios";
import { Request, Response } from 'express';
import { Favourite } from '../../models/favourite/favourite.model';
import jwt from 'jsonwebtoken';

const favMovie = async (req: Request, res: Response) => {
  try {
    const { movieTitle }  = req.body as {
      movieTitle: string
    };
    const user = jwt.decode(req.headers['authorization'], { complete: true })
    const favouriteData = {
      userId: user.payload.userId,
      movieTitle
    }
    await Favourite.create(favouriteData).then((favCreated) => {
      return res.status(201).json({ data: favCreated, message: "Movie Favourite Successfully."});
    }).catch((error) => {
      return res.status(500).json({message: error})
    });
  } catch (error) {
      console.error('Error fetching movie data:', error);
      return res.status(500).json({message: "Something was wrong"});
  }
}

const unFavMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const FavouriteData = await Favourite.findOne({_id: id});
    if (FavouriteData) {
      await Favourite.deleteOne({ _id : id }).then(() => {
        return res.status(200).json({message: 'Movie Unfavourite Successfully.'})
      }).catch((error) => {
        return res.status(500).json({ message: error})
      });
    }
    return res.status(400).json({message: "Favourite Movie not exist."})
  } catch(error) {
    return res.status(500).json({message: "Something was wrong."})
  }
}

const favMovieList = async (req: Request, res: Response) => {
  try {
    const { pageNumber, pageSize }  = req.query as {
      pageNumber: string;
      pageSize: string;
    };
    const page: number = parseInt(pageNumber) || 1; // Default page is 1
    const limit: number = parseInt(pageSize) || 10; // Default limit is 10
    const skip: number = (page - 1) * limit;
    await Favourite.find().skip(skip).limit(limit).then((fav) => {
      if (!fav) {
        return res.status(400).json({data: [], message: 'No Data'});
      }
      return res.status(200).json({data: fav, message: "Favourite Successful Get."});
    }).catch((error) => {
      return res.status(400).json({message: error})
    });
  } catch(error) {
    return res.status(500).json({message: error})
  }
}

export default { favMovie, unFavMovie, favMovieList };

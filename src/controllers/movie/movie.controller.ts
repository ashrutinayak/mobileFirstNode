import axios from "axios";
import { Request, Response } from 'express';

const fetchMovie = async (req: Request, res: Response) => {
  try {
    const { movieTitle , pageNumber, pageSize }  = req.query as {
      pageNumber: string;
      movieTitle: string;
      pageSize: string;
    };
    const apiKey: string = '13909bd0'; // Replace 'your_OMDB_API_key' with your actual API key
    const apiUrl:string = `https://www.omdbapi.com/?s=movie%20title&apikey=${apiKey}`;

    const page: number = parseInt(pageNumber) || 1; // Default page is 1
    const limit: number = parseInt(pageSize) || 10; // Default limit is 10

    const response = await axios.get(apiUrl);

    if (response.data.Response === 'True') {

      const skip: number = (page - 1) * limit;
      const movieData = response.data.Search.dataArray.slice(skip, skip + limit);

      return res.status(200).json({ data: movieData, message: 'Movie List Successfully.' });
      
    } else {
      return res.status(400).json({message: response.data.Error});
    }
  } catch (error) {
      console.error('Error fetching movie data:', error);
      return res.status(500).json({message: "Something was wrong"});
  }
}

const searchMovie = async (req: Request, res: Response) => {
  try {
    const { title }  = req.params
    const apiKey = '13909bd0'; // Replace 'your_OMDB_API_key' with your actual API key
    const apiUrl = `https://www.omdbapi.com/?s=movie%20title&apikey=${apiKey}`;

    const response = await axios.get(apiUrl);

    if (response.data.Response === 'True') {
      const movieData = response.data.Search.find((movie) => movie.title === title);
      return res.status(200).json({ data: movieData, message: 'Movie Details Successfully.' });
    } else {
      return res.status(400).json({message: response.data.Error});
    }
  } catch (error) {
      console.error('Error fetching movie details data:', error);
      return res.status(500).json({message: "Something was wrong"});
  }
}

export default { fetchMovie, searchMovie };

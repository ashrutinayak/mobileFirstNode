import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

mongoose.Promise = global.Promise;
dotenv.config();

const { DB_HOST, DB_NAME, DB_PORT } = process.env;

const connectToDatabase = async (): Promise<void> => {
  const options: ConnectOptions = {};

  await mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, options);
};

export { connectToDatabase };
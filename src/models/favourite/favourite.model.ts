import mongoose, { Schema, Model, Document } from 'mongoose';

type FavDocument = Document & {
  movieTitle: string;
  userId: string;
};

type FavInput = {
  movieTitle: FavDocument['movieTitle'];
  userId: FavDocument['userId'];
};

const favSchema = new Schema(
  {
    movieTitle: {
      type: Schema.Types.String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    status: {
      type: Schema.Types.Boolean,
      default: true,
    },
  },
  {
    collection: 'favourite',
    timestamps: true,
  },
);

const Favourite: Model<FavDocument> = mongoose.model<FavDocument>('Favourite', favSchema);

export { Favourite, FavInput, FavDocument };
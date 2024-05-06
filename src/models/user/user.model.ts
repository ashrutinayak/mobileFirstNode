import mongoose, { Schema, Model, Document } from 'mongoose';

type UserDocument = Document & {
  fullName: string;
  email: string;
  password: string;
};

type UserDocumentLogin =  Document & {
  fullName: string;
  email: string;
  password: string;
  token: string
};

type UserInput = {
  email: UserDocumentLogin['email'];
  password: UserDocumentLogin['password'];
  token: UserDocumentLogin['token']
};

type UserSignInput = {
  email: UserDocumentLogin['email'];
  fullName: UserDocumentLogin['fullName'];
  password: UserDocumentLogin['password'];
  token: UserDocumentLogin['token']
}

const usersSchema = new Schema(
  {
    fullName: {
      type: Schema.Types.String,
      required: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
    status: {
      type: Schema.Types.Boolean,
      default: true,
    },
  },
  {
    collection: 'users',
    timestamps: true,
  },
);

const User: Model<UserDocument> = mongoose.model<UserDocument>('User', usersSchema);

export { UserSignInput, User, UserInput, UserDocument };
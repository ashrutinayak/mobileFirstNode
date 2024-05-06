import { Request, Response } from 'express';
import crypto from 'crypto';
const bcrypt = require('bcrypt');
import jwt from 'jsonwebtoken';
import { User, UserInput, UserSignInput } from '../../models/user/user.model';

const hashPassword = (password: string) => {
  const salt = crypto.randomBytes(16).toString('hex');

  // Hashing salt and password with 100 iterations, 64 length and sha512 digest
  return crypto.pbkdf2Sync(password, salt, 100, 64, `sha512`).toString(`hex`);
};

const register = async (req: Request, res: Response) => {
  try {
    const { email, fullName, password, confirmPassword } = req.body;
    if (!email || !fullName || !password || !confirmPassword || !confirmPassword ) {
      return res.status(422).json({ message: 'The fields email, fullName, password, confirmPassword are required' });
    }
    if(password === confirmPassword) {
      return res.status(400).json({ message: "Password and confirmPassword not match" });
    }
    const alreadyExist = await User.findOne({email: email});
    if (alreadyExist) {
      return res.status(303).json({ message: "Email address already exits" });
    }
    else {
      const userInput = {
        fullName,
        email,
        password: await hashPassword(password),
      };
      await User.create(userInput).then((userCreated) => {
        // Generate JWT token
        const token = jwt.sign({ userId: userCreated._id }, 'abcdefghijklmnopqrstuv', { expiresIn: '1h' });
        return res.status(201).json({ data: {
          userCreated, token }, message: "Register Successfully."});
      }).catch((error) => {
        return res.status(500).json({message: error})
      });
    }
  } catch(error) {
    return res.status(500).json({message: "Something was wrong"})
  }
};

const login = async (req: Request, res: Response) => {
  try{
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ message: 'The fields email, password are required' });
    }
    // Find user by email
    let user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: 'Your email address is not valid.' });
    }
    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Your password is not valid.' });
    }
     // Generate JWT token
     const token = jwt.sign({ userId: user._id }, 'abcdefghijklmnopqrstuv', { expiresIn: '1h' });
     return res.status(200).json({ data: {
      userData: user, token }, message: 'Login Successfully.' });
  } catch(error) {
    return res.status(500).json({message: "Something was wrong"})
  }
};

export default { register, login };
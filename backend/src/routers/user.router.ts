import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, UserModel } from "../models/user.model";
import { sample_users } from '../data';
import { Favorite, FavoriteModel } from '../models/favorite.model';

const router = Router();

router.get('/seed', asyncHandler(
  async (req, res) => {
    const usersCount = await UserModel.countDocuments();
    if (usersCount > 0) {
      res.send('Seed is aleady done!');
      return;
    }

    await UserModel.create(sample_users);
    res.send('Seed is done!!');
  }
));

router.post('/login', asyncHandler(
  async (req: any, res: any) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email});
    
    if(user && (await bcrypt.compare(password,user.password))) {
      res.send(generateTokenReponse(user));
    }
    else{
      res.status(400)
        .send("Username or password is invalid!");
    }
    
  }
));

router.post('/register', asyncHandler(
  async (req, res) => {
    const {name, email, password, address} = req.body;
    const user = await UserModel.findOne({email});
    if(user){
      res.status(400)
      .send('User is already exist, please login!');
      return;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser:User = {
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      address,
      isAdmin: false
    }

    const dbUser = await UserModel.create(newUser);
    res.send(generateTokenReponse(dbUser));
  }
));

router.post('/favorites', asyncHandler(
  async (req, res) => {
    const { email, } = req.body;
    const favs = await FavoriteModel.find({ email: email });
    res.send(favs);
  }
));

router.post('/favorite', asyncHandler(
  async (req, res) => {
    const { email, tourismCategory, tourismId } = req.body;
    const user = await UserModel.findOne({ email });
    if(!user) {
      res.status(400)
      .send('User is not found, please login!');
      return;
    }

    // TODO: check tourism_cat is not found
    // TODO: check tourism_id is not found

    const newFav: Favorite = {
      email,
      tourismCategory,
      tourismId,
    };

    const dbFav = await FavoriteModel.create(newFav);
    res.send(dbFav);
  }
));
router.delete('/favorite', asyncHandler(
  async (req, res) => {
    const { email, tourismCategory, tourismId } = req.body;
    const user = await UserModel.findOne({ email });
    if(!user) {
      res.status(400)
      .send('User is not found, please login!');
      return;
    }

    await FavoriteModel.deleteOne({
      email,
      tourismId
    })
    res.send();
  }
));

// router.post('/user', asyncHandler(
//   async (req, res) => {
    
//   }
// ));

const generateTokenReponse = (user : User) => {
  const token = jwt.sign({
    id: user.id, email:user.email, isAdmin: user.isAdmin
  },process.env.JWT_SECRET!,{
    expiresIn:"30d"
  });

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    address: user.address,
    isAdmin: user.isAdmin,
    token: token
  };
}

export default router;
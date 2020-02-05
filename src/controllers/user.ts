import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import bcrypt from 'bcryptjs';

export const auth = (req: any, res: any) => {
  const {email, password} = req.body;
  if(!password || !email) {
      return res.status(422).send({errors: [{title: 'Data missing', detail: "Provide email and password"}]});
  }

  User.findOne({email}, function(err, user: any) {
      if(err) {
          return res.status(422).send({errors: "Errors"});
      }
      if(!user) {
          return res.status(422).send({errors: [{title: 'Invalid User', detail: "User does not exist"}]});
      }
      console.log("User");
      if(bcrypt.compareSync(user.password, this.password)) {
          const token = jwt.sign({
              userId: user.id,
              username: user.username
            }, 'asdaeml23424[{45}]23.532dmn3vv', { expiresIn: '1h' });
          // return JWT Token
          return res.json(token);
      }
      else {
          return res.status(422).send({errors: [{title: 'Wrong Data', detail: "Wrong email or password"}]});
      }
  });
}

exports.authMiddleware = (req: any, res: any, next: any) => {
  const token = req.headers.authorization;

  if(token) {
      const user: any = parseToken(token);
      User.findById(user.userId, (err, usr) => {
          if(err) {
              return res.status(422).send({errors: "Error"});
          }
          if(usr) {
              res.locals.user = usr;
              next();
          }
          else {
              notAuthorized(res);
          }
      })
  }else {
      notAuthorized(res);
  }
}

function parseToken(token: string) {
  return jwt.verify(token.split(' ')[1], 'asdaeml23424[{45}]23.532dmn3vv');
}

function notAuthorized(res: any) {
  return res.status(401).send({errors: [{title: 'Not authorized', detail: "You need to login to get access"}]});
}

export let allUsers = (req: Request, res: Response) => {
  res.send("Returns all Books");
};

export let getUser = (req: Request, res: Response) => {
  res.send("Returns one book");
};

export let deleteUser = (req: Request, res: Response) => {
  res.send("Returns one book");
};

export let updateUser = (req: Request, res: Response) => {
  res.send("Returns one book");
};

export let addUser = (req: Request, res: Response) => {
  res.send("Returns one book");
};
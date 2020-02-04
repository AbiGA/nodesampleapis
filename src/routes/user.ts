import express from 'express';
import { User } from '../models/user';
import mongoose from 'mongoose';
import fetch from 'node-fetch';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.get('/create', (req, res) => {
    fetch('http://jsonplaceholder.typicode.com/users')
     .then(response => response.json())
     .then(data => {
         const arr: any = data;
         arr.forEach((dt: any) => {
            const user: any = new User(dt);
             user.oid = dt.id;
             const salt = bcrypt.genSaltSync(10);
             const password = bcrypt.hashSync("default", salt);
             user.password = password;
             user.save();
         });
         return res.json(data);
     })
     .catch(err => {
        return res.json({error: "error"});
     });
});


// router.get('', (req, res) => {
//     fetch('http://jsonplaceholder.typicode.com/users')
//      .then(response => response.json())
//      .then(data => {
//          const arr: any = data;
//          arr.forEach((dt: any) => {
//             const dburl = `mongodb+srv://sampleuser:samplepassword@cluster0-fegur.mongodb.net/db${dt.id}?retryWrites=true&w=majority`;
//             mongoose.connect(dburl, { useNewUrlParser: true,
//             useUnifiedTopology: true }).then((db) => {
//                 const user: any = new User(dt);
//                 User.collection.drop();
//                 user.oid = dt.id;
//                 const salt = bcrypt.genSaltSync(10);
//                 const password = bcrypt.hashSync("default", salt);
//                 user.password = password;
//                 // console.log(User);
//                 user.save();
//                 // console.log(`Created DB: ${dt.id} : ${dt.name}`);
//             });
//          });

//      })
//      .catch(err => {
//         return res.json({error: "error"});
//      });
// });

export const userRouter = router;
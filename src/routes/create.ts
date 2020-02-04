import express from 'express';
import { User } from '../models/user';
import { Post } from '../models/post';
import mongoose from 'mongoose';
import fetch from 'node-fetch';
import bcrypt from 'bcryptjs';

const router = express.Router();


router.get('/users', (req, res) => {
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


router.get('/posts', (req, res) => {
    
    const posts:any = [];
    fetch ('http://jsonplaceholder.typicode.com/posts')
     .then(response => response.json())
     .then(data => {
         const arr: any = data;
         arr.forEach((pst: any) => {
             const post = new Post(pst);
             post.save();
         });
         return res.json(data);
     })
     .catch(err => {
        return res.json({error: "error"});
     });
});


export const createRouter = router;
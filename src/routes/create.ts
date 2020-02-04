import express from 'express';
import { User } from '../models/user';
import { Post } from '../models/post';
import mongoose from 'mongoose';
import fetch from 'node-fetch';
import bcrypt from 'bcryptjs';

const router = express.Router();

const posts: any = [];

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
    let comments:any = [];

    fetch ('http://jsonplaceholder.typicode.com/posts')
     .then(response => response.json())
     .then(data => {
         const arr: any = data;
         arr.forEach((post: any) => {
            //  comments.oid = comment.id;
             posts.push(post);
         });

         fetch('http://jsonplaceholder.typicode.com/comments')
         .then(response => response.json())
         .then(data1 => {
             const arr1: any = data1;
             arr1.forEach((comment: any) => {
                //  comments.oid = comment.id;
                 comments.push(comment);
             });

         });

     });
});


export const createRouter = router;
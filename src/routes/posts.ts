import express from 'express';
import { User } from '../models/user';
import mongoose from 'mongoose';
import fetch from 'node-fetch';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.get('/posts', (req, res) => {
    const posts:any = [];
    fetch('http://jsonplaceholder.typicode.com/posts')
     .then(response => response.json())
     .then(data => {
         const arr: any = data;
         arr.forEach((dt: any) => {
             posts.push(dt);
         });
     })
     .catch(err => {
        return res.json({error: "error"});
     });
});

export const userRouter = router;
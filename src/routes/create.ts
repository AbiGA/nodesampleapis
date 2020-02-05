import express from 'express';
import { User } from '../models/user';
import { Post } from '../models/post';
import mongoose from 'mongoose';
import fetch from 'node-fetch';
import bcrypt from 'bcryptjs';

const router = express.Router();
const DB_URI = 'mongodb+srv://sampleuser:samplepassword@cluster0-fegur.mongodb.net/master?retryWrites=true&w=majority';

router.get('/users', (req, res) => {
    mongoose.connect(DB_URI, { useNewUrlParser: true,
        useUnifiedTopology: true  }). then(() => {
           // const fakeDb = new FakeDb;
           // fakeDb.seedDb();
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
});


router.get('/posts', async(req, res) => {

    const posts1:any = [];
    const users:any = [];
    await fetch ('http://jsonplaceholder.typicode.com/posts')
     .then(response => response.json())
     .then(async data => {
         data.forEach((post: any) => {
             post.comments=[];
             posts1.push(post);
         });
         await fetch ('http://jsonplaceholder.typicode.com/comments')
     .then(response => response.json())
     .then(async commentsData => {
         posts1.forEach((post: any, index: any) => {
            const comments: any = [];
            commentsData.forEach((comment: any) => {
                if(comment.postId === post.id) {
                    comments.push(comment);
                }
            });
            posts1[index].comments.push(...comments);
         });
     });

     await fetch('http://jsonplaceholder.typicode.com/users')
     .then(response => response.json())
     .then(arr => {
        arr.forEach((dt: any) => {
            posts1.forEach((pst: any) => {
                if(pst.userId === dt.id) {
                    const post = new Post(pst);
                    users.push(post);
                    // pst.save();
                }
            });

            const dburl = `mongodb+srv://sampleuser:samplepassword@cluster0-fegur.mongodb.net/user${dt.id}?retryWrites=true&w=majority`;
            mongoose.connect(dburl, { useNewUrlParser: true,
                useUnifiedTopology: true }).then((db) => {
                    users.forEach((item: any) => {
                        if(dt.id === +item.userId) {
                            const post = new Post(item);
                            Post.remove({});
                            //  post.save();
                        }
                        // await post.save();
                    });
                });


         });

         return res.json(posts1);
     });

     })
     .catch(err => {
        return res.json({error: "error"});
     });
});

router.get('/dbs', (req, res) => {
    const arr=[1,2,3];
    arr.forEach((ar,index) => {
        const dburl = `mongodb+srv://sampleuser:samplepassword@cluster0-fegur.mongodb.net/db${index}?retryWrites=true&w=majority`;
        mongoose.connect(dburl, { useNewUrlParser: true,
            useUnifiedTopology: true }).then((db) => {
                const post = new Post();
                post.save();
            });
    });
});


export const createRouter = router;
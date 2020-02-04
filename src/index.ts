import express, { response, request } from 'express';
import * as userController from './controllers/user';
import { createRouter }  from './routes/create';
import bodyParse from 'body-parser';
import mongoose from 'mongoose';

const app = express();
const port = 3000;

const DB_URI = 'mongodb+srv://sampleuser:samplepassword@cluster0-fegur.mongodb.net/master?retryWrites=true&w=majority';

app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});

app.use(bodyParse.json());
app.use('/create', createRouter);
// API Endpoints
// app.get("/users", userController.allUsers);
// app.get("/user/:id", userController.getUser);
// app.post("/user", userController.addUser);
// app.put("/user/:id", userController.updateUser);
// app.delete("/user/:id", userController.deleteUser);

mongoose.connect(DB_URI, { useNewUrlParser: true,
    useUnifiedTopology: true  }). then(() => {
       // const fakeDb = new FakeDb;
       // fakeDb.seedDb();
   });

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});
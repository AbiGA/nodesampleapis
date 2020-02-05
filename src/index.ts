import express, { response, request } from 'express';
import { createRouter }  from './routes/create';
import bodyParse from 'body-parser';

import { userRouter } from './routes/user';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});

app.use(bodyParse.json());
app.use('/create', createRouter);
app.use('/user', userRouter);
// API Endpoints
// app.get("/users", userController.allUsers);
// app.get("/user/:id", userController.getUser);
// app.post("/user", userController.addUser);
// app.put("/user/:id", userController.updateUser);
// app.delete("/user/:id", userController.deleteUser);

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});
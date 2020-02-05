import express from 'express';
import * as User  from '../controllers/user';

const router = express.Router();

router.post('/auth', User.auth);

export const userRouter = router;
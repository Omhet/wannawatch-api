import { Router } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';

export const userRouter = Router();

userRouter.get('/', async (_req, res) => {
  const userRepo = getRepository(User);
  const users = await userRepo.find();
  res.json(users);
});

userRouter.get('/:id', (req, res) => {
  // here we will have logic to return user by id
});

userRouter.post('', async (req, res) => {
  const userRepo = getRepository(User);
  const user = await userRepo.create(req.body);
  const result = await userRepo.save(user);
  res.send(result);
});

userRouter.put('/:id', (req, res) => {
  // here we will have logic to update a user by a given user id
});

userRouter.delete('/:id', (req, res) => {
  // here we will have logic to delete a user by a given user id
});

import { hash } from 'bcrypt';
import { validate } from 'class-validator';
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

userRouter.post('', async ({ body }, res) => {
  const userRepo = getRepository(User);

  const saltRounds = 10;
  const hashedPassword = await hash(body.password, saltRounds);
  const user = await userRepo.create({
    ...body,
    password: hashedPassword,
  });

  const errors = await validate(user);
  if (errors.length > 0) {
    throw new Error('User validation failed');
  }

  const result = await userRepo.save(user);
  // @ts-ignore
  delete result.password;
  res.send(result);
});

userRouter.put('/:id', (req, res) => {
  // here we will have logic to update a user by a given user id
});

userRouter.delete('/:id', (req, res) => {
  // here we will have logic to delete a user by a given user id
});

import { hash } from 'bcrypt';
import { validate } from 'class-validator';
import { Router } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';
import { loginRequired } from '../utils/middlewares';

const saltRounds = 10;

export const userRouter = Router();

userRouter.get('/', async (_req, res) => {
    const userRepo = getRepository(User);
    const users = await userRepo.find();
    res.json(users);
});

userRouter.post('/', async ({ body }, res) => {
    const userRepo = getRepository(User);

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
    res.json(result);
});

userRouter.put('/me', loginRequired, async ({ body, user }, res) => {
    const userRepo = await getRepository(User);

    if (body.password) {
        body.password = await hash(body.password, saltRounds);
    }

    await userRepo.update(user?.id, body);
    res.status(204).end();
});

userRouter.delete('/me', loginRequired, async (req, res) => {
    const userRepo = await getRepository(User);
    await userRepo.delete(req.user?.id);
    res.status(204).end();
});

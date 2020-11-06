import { hash } from 'bcrypt';
import { Router } from 'express';
import { getRepository } from 'typeorm';
import { hashSaltRounds } from '../constants';
import { User } from '../models/User';
import { loginRequired } from '../utils/middlewares';


export const currentUserRouter = Router();

currentUserRouter.get('/users', async (_req, res) => {
    const userRepo = getRepository(User);
    const users = await userRepo.find();
    res.json(users);
});

currentUserRouter.put('/', loginRequired, async ({ body, user }, res) => {
    const userRepo = await getRepository(User);

    if (body.password) {
        body.password = await hash(body.password, hashSaltRounds);
    }

    await userRepo.update(user?.id, body);
    res.status(204).end();
});

currentUserRouter.delete('/', loginRequired, async (req, res) => {
    const userRepo = await getRepository(User);
    await userRepo.delete(req.user?.id);
    res.status(204).end();
});

import { compareSync, hash } from 'bcrypt';
import { validate } from 'class-validator';
import { Router } from 'express';
import { getRepository } from 'typeorm';
import { hashSaltRounds } from '../constants';
import { User } from '../models/User';

export const authRouter = Router();

authRouter.post('/register', async ({ body }, res) => {
    const userRepo = getRepository(User);

    const hashedPassword = await hash(body.password, hashSaltRounds);
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

authRouter.post('/login', async (req, res) => {
    const { body: { username, password } } = req;

    const userRepo = getRepository(User);
    const user = await userRepo.findOne({ username });

    const areCredsCorrect =
        user !== undefined && compareSync(password, user.password);
    if (!areCredsCorrect) {
        return res.status(401).json({ error: 'Credentials are not correct ' });
    }

    req.session.userId = user?.id;

    res.status(204).end();
});

authRouter.post('/logout', async (req, res) => {
    req.session.destroy();

    res.status(204).end();
});

import { compareSync } from 'bcrypt';
import { Router } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';

export const authRouter = Router();

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
    req.session.reset();

    res.status(204).end();
});

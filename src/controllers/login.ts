import { compareSync } from 'bcrypt';
import { Router } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';

export const loginRouter = Router();

loginRouter.post('/', async (req, res) => {
    const { body: { username, password } } = req;

    const userRepo = getRepository(User);
    const user = await userRepo.findOne({ username });

    const areCredsCorrect =
        user !== undefined && compareSync(password, user.password);
    if (!areCredsCorrect) {
        return res.status(401).json({ error: 'Credentials are not correct ' });
    }

    // @ts-ignore
    req.session.userId = user?.id;

    res.status(200).end();
});

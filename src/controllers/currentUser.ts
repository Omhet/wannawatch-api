import { hash } from 'bcrypt';
import { Router } from 'express';
import { getRepository } from 'typeorm';
import { hashSaltRounds } from '../constants';
import { Movie } from '../models/Movie';
import { User } from '../models/User';
import { loginRequired } from '../utils/middlewares';

export const currentUserRouter = Router();

currentUserRouter.get('/users', async (_req, res) => {
    const userRepo = getRepository(User);
    const users = await userRepo.find();
    res.json(users);
});

currentUserRouter.get('/allMovies', async (_req, res) => {
    const movieRepo = await getRepository(Movie);
    const movies = await movieRepo.find();
    res.json(movies);
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

currentUserRouter.get('/movies', loginRequired, async (req, res) => {
    res.json(req.user.movies);
});

currentUserRouter.post('/movies', loginRequired, async (req, res) => {
    const movie = req.body;

    try {
        const movieRepo = await getRepository(Movie);
        await movieRepo.save(movie);
    } catch {
        console.log('The movie is already in DB', movie)
    }
    
    const userRepo = await getRepository(User);
    req.user.movies.push(movie)
    await userRepo.save(req.user);

    res.status(204).end();
});

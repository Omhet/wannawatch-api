import { hash } from 'bcrypt';
import { Router } from 'express';
import { getRepository } from 'typeorm';
import { hashSaltRounds } from '../constants';
import { Movie } from '../models/Movie';
import { User } from '../models/User';
import { loginRequired } from '../utils/middlewares';

export const currentUserRouter = Router();

// TODO: Restrict these routes to only DEV env
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
    const movieRepo = await getRepository(Movie);

    const movies = req.user.movies;

    // Delete current user's watchlist
    req.user.movies = [];
    await userRepo.save(req.user);

    // Try to delete from DB every movie current user has if others don't have it
    const deletePromisies = movies.map((movie: Movie) => movieRepo.delete(movie.id))
    try {
        await Promise.all(deletePromisies);
    } catch {
        console.log('Other users stil have this movies',)
    }

    // Delete current user
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

currentUserRouter.delete('/movies/:id', loginRequired, async (req, res) => {
    const { id } = req.params;

    const userRepo = await getRepository(User);
    req.user.movies = req.user.movies.filter((movie: Movie) => movie.id !== id);
    await userRepo.save(req.user);

    try {
        const movieRepo = await getRepository(Movie);
        await movieRepo.delete({ id })
    } catch {
        console.log('Other users stil have this movie with id ', id)
    }

    res.status(204).end();

});
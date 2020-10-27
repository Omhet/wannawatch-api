import express from 'express';
import morgan from 'morgan';
import { unknownEndpoint } from './middlewares.js';

const movies = [
  {
    id: '1',
    name: 'Avatar',
    year: 2008,
  },
  {
    id: '2',
    name: 'Sherlock',
    year: 2005,
  },
];

let users = [
  {
    id: '1',
    name: 'Joe',
    movies: movies.slice(0, 1),
  },
  {
    id: '2',
    name: 'Bob',
    movies,
  },
];

const app = express();
app.use(express.json(), morgan('tiny'));

app.get('/users/:id', (req, res) => {
  const {
    params: { id },
  } = req;
  const user = users.find((user) => user.id === id);

  if (user !== undefined) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

app.delete('/users/:id', (req, res) => {
  const {
    params: { id },
  } = req;
  users = users.filter((user) => user.id !== id);

  res.status(204).end();
});

app.post('/users', (req, res) => {
  const maxId = users.length > 0 ? Math.max(...users.map(({ id }) => id)) : 0;
  const {
    body: { name },
  } = req;
  if (!name) {
    return res.status(400).json({ error: 'name missing' });
  }
  const user = {
    id: String(maxId + 1),
    name,
    movies: [],
  };
  users.push(user);
  res.json(user);
});

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));

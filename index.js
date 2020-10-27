import express from "express";

const movies = [
  {
    id: "1",
    name: "Avatar",
    year: 2008,
  },
  {
    id: "2",
    name: "Sherlock",
    year: 2005,
  },
];

const users = [
  {
    id: "1",
    name: "Joe",
    movies: movies.slice(0, 1),
  },
  {
    id: "2",
    name: "Bob",
    movies,
  },
];

const app = express();

app.get("/users/:id", (req, res) => {
  const {
    params: { id },
  } = req;
  const user = users.find((user) => user.id === id);
  res.json(user);
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));

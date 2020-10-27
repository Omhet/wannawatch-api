import express from "express";

const movies = [
    {
        id: '1',
        name: 'Avatar',
        year: 2008
    },
    {
        id: '2',
        name: 'Sherlock',
        year: 2005
    },
]

const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Hello</h1>')
});

app.get('/movies', (req, res) => {
    res.json(movies)
})

const PORT = 3001;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
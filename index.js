import http from "http";

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

const app = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(movies));
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
const express = require("express");
const logger = require("./logger");

const app = express();

app.use(express.json());
app.use(logger);

app.listen(3000, () => console.log("Listening on port 3000"));

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Romance" },
];

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.post("/api/genres", (req, res) => {
  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  if (!genre) return res.status(400).send("Bad request");
  genres.push(genre);
  res.send(genre);
});

app.put("/api/genres/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Genre was not found");
  genre.name = req.body.name;
  res.send(genre);
});

app.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Course was not find");
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});

app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre)
    res.status(404).send("The genre with the given ID was not found.");
  res.send(genre);
});

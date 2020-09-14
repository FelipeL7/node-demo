const joi = require("joi");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Genre = mongoose.model(
  "Genre",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
  })
);

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.post("/", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });

  genre = await genre.save();

  res.send(genre);
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = await Genre.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true, useFindAndModify: false }
    );

    res.send(genre);
  } catch (ex) {
    return res.status(404).send("The genre with the given ID was not found.");
  }
});

router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id, {
    useFindAndModify: false,
  });

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre)
    res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

function validateGenre(genre) {
  const schema = joi.object({
    name: joi.string().required().min(3),
  });

  return schema.validate(genre);
}

module.exports = router;

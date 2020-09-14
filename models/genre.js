const joi = require("joi");
const mongoose = require("mongoose");

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

function validateGenre(genre) {
  const schema = joi.object({
    name: joi.string().required().min(3),
  });

  return schema.validate(genre);
}

module.exports = {
  Genre,
  validate: validateGenre,
};

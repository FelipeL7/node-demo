const express = require("express");

const auth = require("../routes/auth");
const users = require("../routes/users");
const genres = require("../routes/genres");
const movies = require("../routes/movies");
const error = require("../middleware/error");
const rentals = require("../routes/rentals");
const logger = require("../middleware/logger");
const customers = require("../routes/customers");

module.exports = function (app) {
  app.use(express.json());
  app.use(logger);
  app.use("/api/genres", genres);
  app.use("/api/movies", movies);
  app.use("/api/customers", customers);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/auth", auth);

  app.use(error);
};

const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const mongoose = require("mongoose");

const genres = require("./routes/genres");
const movies = require("./routes/movies");
const customers = require("./routes/customers");
const logger = require("./middleware/logger");
const rentals = require("./routes/rentals");

const app = express();

mongoose
  .connect("mongodb://localhost/node-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.error("Could not connect to MongoDB"));

app.use(express.json());
app.use(logger);
app.use("/api/genres", genres);
app.use("/api/movies", movies);
app.use("/api/customers", customers);
app.use("/api/rentals", rentals);

app.listen(3000, () => console.log("Listening on port 3000"));

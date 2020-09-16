const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const config = require("config");
const express = require("express");
const mongoose = require("mongoose");

const auth = require("./routes/auth");
const users = require("./routes/users");
const genres = require("./routes/genres");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const logger = require("./middleware/logger");
const customers = require("./routes/customers");

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}
const app = express();

mongoose
  .connect("mongodb://localhost/node-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.error("Could not connect to MongoDB"));

app.use(express.json());
app.use(logger);
app.use("/api/genres", genres);
app.use("/api/movies", movies);
app.use("/api/customers", customers);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.listen(3000, () => console.log("Listening on port 3000"));

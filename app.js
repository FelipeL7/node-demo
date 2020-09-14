const express = require("express");
const mongoose = require("mongoose");

const genres = require("./routes/genres");
const logger = require("./middleware/logger");
const customers = require("./routes/customers");

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
app.use("/api/customers", customers);

app.listen(3000, () => console.log("Listening on port 3000"));

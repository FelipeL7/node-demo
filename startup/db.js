const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect("mongodb://localhost/node-app", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log("Connected to MongoDB..."))
    .catch((error) => console.error("Could not connect to MongoDB"));
};

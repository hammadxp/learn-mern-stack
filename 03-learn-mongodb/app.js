const express = require("express");
const { connectToDb, getDb } = require("./db");

// init app and middlewares
const app = express();

// db connection
let db;

connectToDb((err) => {
  if (!err) {
    db = getDb();
    app.listen(5000, () => {
      console.log("Server is listening on port 5000...");
    });
  }
});

// Routes

app.get("/books", (req, res) => {
  res.status(200).send({ msg: "Successful", data: "{}" });
});

const express = require("express");
const app = express();
const { products, people } = require("./data.js");

app.listen(5000, () => {
  console.log("Server listening on port 5000...");
});

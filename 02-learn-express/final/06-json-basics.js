const express = require("express");
const app = express();
const { products } = require("../data.js");

app.get("/", (req, res) => {
  // res.json([{ name: "Hammad" }, { name: "Noman" }]);
  res.json(products);
});

app.listen(5000, () => {
  console.log("Server listening on port 5000...");
});

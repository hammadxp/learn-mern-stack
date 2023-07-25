const express = require("express");
const app = express();

// req => middleware => res

function logger(req, res, next) {
  const method = req.method;
  const url = req.url;
  const time = new Date().getFullYear();
  console.log(method, url, time);

  next();
}

app.get("/", logger, (req, res) => {
  res.send("<h1>Home</h1>");
});
app.get("/about", logger, (req, res) => {
  res.send("<h1>About</h1>");
});

app.listen(5000, () => {
  console.log("Server listening on port 5000...");
});

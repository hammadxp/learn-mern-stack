const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Home page</h1>");
});
app.get("/about", (req, res) => {
  res.status(200);
  res.send("<h1>About page</h1>");
});
app.all("*", (req, res) => {
  res.status(404);
  res.send("<h1>Page not found</h1>");
});

app.listen(5000, () => {
  console.log("Server listening on port 5000...");
});

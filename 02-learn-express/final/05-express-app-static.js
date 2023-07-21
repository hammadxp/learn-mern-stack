const express = require("express");
const app = express();
const path = require("path");

app.use(express.static("./public"));

// app.get("/", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./navbar-app/index.html"));
// });
// index.html from public folder will automatically be rendered

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

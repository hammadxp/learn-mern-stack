const express = require("express");
const app = express();
const logger = require("../logger");
const authorize = require("../authorize");
// const morgan = require("morgan");

// req => middleware => res
// middlewares => user / express built-in / third party

app.use(logger);
app.use("/api", authorize);

// app.use(express.static("./public")); // express built-in middleware

// app.use(morgan('tiny')) // third party middleware

app.get("/", (req, res) => {
  const user = req.user;

  res.send("<h1>Home</h1>");
});
app.get("/about", (req, res) => {
  res.send("<h1>About</h1>");
});
app.get("/api/get", (req, res) => {
  res.send("<h1>Get method</h1>");
});
app.get("/api/post", (req, res) => {
  res.send("<h1>Post method</h1>");
});

app.listen(5000, () => {
  console.log("Server listening on port 5000...");
});

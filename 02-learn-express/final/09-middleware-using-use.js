const express = require("express");
const app = express();
const logger = require("../logger");
const authorize = require("../authorize");
// import logger from "./logger.js";

// req => middleware => res

app.use([logger, authorize]);
// app.use('/api', logger); // route specific middleware

app.get("/", (req, res) => {
  const user = req.user;

  res.send(`<h1>Welcome back, ${user.name}</h1>`);
});
app.get("/about", (req, res) => {
  res.send("<h1>About</h1>");
});

app.listen(5000, () => {
  console.log("Server listening on port 5000...");
});

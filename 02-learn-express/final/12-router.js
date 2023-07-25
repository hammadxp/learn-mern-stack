const express = require("express");
const app = express();
const peopleRouter = require("../routes/people");
const authRouter = require("../routes/auth");

app.use(express.static("./public-2")); // static assets
app.use(express.urlencoded({ extended: false })); // parse form data
app.use(express.json()); // parse json

// router
app.use("/auth", authRouter);
app.use("/api/people", peopleRouter);

app.listen(5000, () => {
  console.log("Server is listening on port 5000...");
});

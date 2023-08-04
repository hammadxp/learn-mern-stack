import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose, { Promise } from "mongoose";

import router from "./router/index";

const app = express();

app.use(bodyParser.json()); // middleware to parse the incoming request body in JSON format
app.use(cookieParser()); // middleware to parse cookies from the request header
app.use(compression()); // middleware to compress HTTP responses before sending them to the client
app.use(
  cors({
    credentials: true, // middleware to enable CORS, allows requests from different origins to access the server resources
  })
);
app.use("/", router());

app.listen(5000, () => console.log("Server running on http://localhost:5000"));

const MONGODB_URL = "mongodb+srv://hammadxp:justpass@cluster0.zjfbgjo.mongodb.net/?retryWrites=true&w=majority";

mongoose.Promise = Promise; // sets up the promise library to be used by Mongoose when dealing with asynchronous operations
mongoose.connect(MONGODB_URL); // connects the Express server to the MongoDB database using Mongoose
mongoose.connection.on("error", (error: Error) => console.log(error)); // sets up event listener to handle any errors

import express from "express";
import authentication from "./authentication";
import users from "./users";

const router = express.Router(); // creates an instance of the Express Router

export default function (): express.Router {
  authentication(router);
  users(router);

  return router; // return type of the function will be 'express.Router' as defined above
}

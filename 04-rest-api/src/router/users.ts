import express from "express";
import { isAuthenticated } from "../middlewares/index";
import { getAllUsers } from "../controllers/users";

export default function (router: express.Router) {
  router.get("/users", isAuthenticated, getAllUsers);
}

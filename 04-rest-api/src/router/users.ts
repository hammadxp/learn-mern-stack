import express from "express";
import { isAuthenticated, isOwner } from "../middlewares/index";
import { getUsers, updateUser, deleteUser } from "../controllers/users";

export default function (router: express.Router) {
  router.get("/users", isAuthenticated, getUsers);
  router.patch("/users/:id", isAuthenticated, isOwner, updateUser);
  router.delete("/users/:id", isAuthenticated, isOwner, deleteUser);
}

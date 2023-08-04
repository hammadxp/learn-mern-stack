import express from "express";
import { signIn, signUp } from "../controllers/authentication";

export default function (router: express.Router) {
  router.post("/auth/sign-in", signIn);
  router.post("/auth/sign-up", signUp);
}

// the above function takes an Express Router as an argument
// we can export functions without a name in Typescript, they are called Anonymous Functions

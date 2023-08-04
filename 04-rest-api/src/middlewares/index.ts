import express from "express";
import { get, merge } from "lodash";
import { getUserBySessionToken } from "../db/users";

export async function isAuthenticated(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    // check if auth token exists in cookies
    const sessionToken = req.cookies["HAMMAD-AUTH"];
    if (!sessionToken) {
      return res.sendStatus(403);
    }

    // check if a user exists in the database with the provided sessionToken
    const user = await getUserBySessionToken(sessionToken);
    if (!user) {
      return res.sendStatus(403);
    }

    merge(req, { identity: user });

    return next(); // 'return next()' is used to not execute any subsequent middlewares
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
}

export async function isOwner(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const { id } = req.params; // id of user to be deleted

    const currentUserId = get(req, "identity._id") as string; // id of current user
    if (!currentUserId) {
      return res.sendStatus(403);
    }

    if (id !== currentUserId.toString()) {
      return res.sendStatus(403);
    }

    next(); // continue with the code, current user is the owner, yup
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
}

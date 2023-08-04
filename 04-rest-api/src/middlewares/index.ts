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
    const userExists = await getUserBySessionToken(sessionToken);
    if (!userExists) {
      return res.sendStatus(403);
    }

    merge(req, { identity: userExists });

    return next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
}

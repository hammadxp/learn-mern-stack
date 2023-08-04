import express from "express";
import { getUsers } from "../db/users";

export async function getAllUsers(req: express.Request, res: express.Response) {
  try {
    const users = await getUsers();

    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
}

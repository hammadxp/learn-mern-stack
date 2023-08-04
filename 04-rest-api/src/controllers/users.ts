import express from "express";
import * as usersDB from "../db/users";

export async function getUsers(req: express.Request, res: express.Response) {
  try {
    const users = await usersDB.getUsers();

    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
}

export async function updateUser(req: express.Request, res: express.Response) {
  try {
    const { id } = req.params;
    const { username } = req.body;

    // check if fields are filled
    if (!username) {
      return res.sendStatus(400);
    }

    // check if user exists
    const user = await usersDB.getUserById(id);
    if (!user) {
      return res.sendStatus(400);
    }

    // update the user
    user.username = username;
    await user.save();

    return res.status(200).json(user).end();
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
}

export async function deleteUser(req: express.Request, res: express.Response) {
  try {
    const { id } = req.params; // id of user to be deleted

    const deletedUser = await usersDB.deleteUserById(id);

    return res.status(200).json(deletedUser);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
}

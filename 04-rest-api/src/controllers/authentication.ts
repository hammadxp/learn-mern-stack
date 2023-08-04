import express from "express";
import { getUserByEmail, createUser } from "../db/users";
import { generateRandomString, encryptString } from "../helpers/authentication";

export async function signIn(req: express.Request, res: express.Response) {
  try {
    const { email, password } = req.body;

    // check if all fields are provided
    if (!email || !password) {
      return res.sendStatus(400);
    }

    // check if user has already signed up and exists in our database so we can sign them in
    // without select, we can't get authentication fields because we protected them
    const user = await getUserByEmail(email).select("+authentication.encryptedPassword +authentication.salt");
    if (!user) {
      return res.sendStatus(400); // response must always be returned, otherwise it's gonna continue executing remaining code
    }

    // check if password hash matches with encryptedPassword hash
    const encryptedPasswordAgain = encryptString(password, user.authentication.salt);
    if (encryptedPasswordAgain !== user.authentication.encryptedPassword) {
      return res.sendStatus(403);
    }

    // sign in user
    const salt = generateRandomString();
    user.authentication.sessionToken = encryptString(user._id.toString(), salt); // assign user a sessionToken each time they sign in

    await user.save();

    res.cookie("HAMMAD-AUTH", user.authentication.sessionToken, { domain: "localhost", path: "/" });

    return res.status(200).json(user).end();
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
}

export async function signUp(req: express.Request, res: express.Response) {
  try {
    const { email, username, password } = req.body;

    // check if all fields are provided
    if (!email || !username || !password) res.sendStatus(400);

    // check if user has already been signed up, if so then exit
    const user = await getUserByEmail(email);
    if (user) {
      return res.sendStatus(400);
    }

    // sign up user
    const salt = generateRandomString();
    const encryptedPassword = encryptString(password, salt);

    const userDoc = await createUser({
      email,
      username,
      authentication: {
        encryptedPassword,
        salt,
      },
    });

    return res.status(200).json(userDoc).end();
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
}

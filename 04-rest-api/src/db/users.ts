import mongoose from "mongoose";

// Schema

// the schema specifies the structure and constraints of a document (e.g. 'user', but in the 'users' collection?)
// 'select: false' means that when querying the database, this field will not be returned by default, it is commonly used to hide sensitive data like passwords from being exposed in queries

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  authentication: {
    encryptedPassword: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

// Model

// the model provides an interface to interact with a MongoDB collection
// mongoose.model takes two arguments, name of the model and the schema (is name of the model actually the name of the collection?)

export const UserModel = mongoose.model("User", UserSchema);

// Actions

// usually we keep actions somewhere separate, but not for now
// below methods/CRUD operations are provided by the Mongoose model
// 'new UserModel(values)' creates a new instance of 'UserModel' and converts the 'values' object into a Mongoose document
// 'user.toObject' method is used to return plain JS object containing only the fields defined in the schema while ignoring Mongoose specific fields
// Record<string, any> is used to define the type of the object, keys -> string, values -> 'any', Record is a built-in TypeScript utility for objects

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({ "authentication.sessionToken": sessionToken });
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);
export const deleteUserById = (id: string) => UserModel.findByIdAndDelete(id);

const express = require("express");
const { connectToDb, getDb } = require("./db");
const { ObjectId } = require("mongodb");

// init app and middlewares
const app = express();

app.use(express.json()); // this method is necessary to be able to read request body when adding data to the database

// db connection
let db;

connectToDb((err) => {
  if (!err) {
    db = getDb();
    app.listen(5000, () => {
      console.log("Server is listening on port 5000...");
    });
  }
});

// Routes

app.get("/students", (req, res) => {
  let currentPage = req.query.page || 1;
  currentPage -= 1;
  const resultsPerPage = 3;

  let students = [];

  db.collection("students")
    .find() // this will return a cursor
    .sort({ name: 1 }) // this will also return a cursor
    .skip(currentPage * resultsPerPage) // for pagination
    .limit(resultsPerPage) // for pagination
    .forEach((student) => students.push(student)) // goes through documents in batches, forEach is a method available on cursors (isArray and forEach)
    .then(() => res.status(200).json(students))
    .catch(() => res.status(500).json({ errorMsg: "Could not fetch documents." }));
});

app.get("/students/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("students")
      .findOne({ _id: new ObjectId(req.params.id) })
      .then((student) => res.status(200).json(student))
      .catch((err) => res.status(500).json({ errorMsg: "Student not found" }));
  } else {
    res.status(500).json({ errorMsg: "Invalid document id" });
  }
});

app.post("/students", (req, res) => {
  const student = req.body;

  db.collection("students")
    .insertOne(student)
    .then((result) => res.status(201).json(result)) // 201 means successfully added data to the database
    .catch((err) => res.status(500).json({ errorMsg: "Could not create the document." }));
});

app.delete("/students/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("students")
      .deleteOne({ _id: new ObjectId(req.params.id) })
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(500).json({ errorMsg: "Could not delete the document" }));
  } else {
    res.status(500).json({ errorMsg: "Invalid document id" });
  }
});

app.patch("/students/:id", (req, res) => {
  const studentUpdates = req.body;

  if (ObjectId.isValid(req.params.id)) {
    db.collection("students")
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: studentUpdates })
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(500).json({ errorMsg: "Could not update the document." }));
  } else {
    res.status(500).json({ errorMsg: "Invalid document id" });
  }
});

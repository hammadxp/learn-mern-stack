const express = require("express");
const app = express();
let { people } = require("../data");

// static assets
app.use(express.static("./public-2"));
// parse form data
app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json());

// GET

app.get("/people", (req, res) => {
  res.status(200).json({ success: true, data: people }); // our api endpoint
});

// POST

app.post("/people", (req, res) => {
  const { name } = req.body; // possible because of express.json middleware, to check if form values are correct, req.body => { name: nameValue }

  if (!name) {
    return res.status(400).json({ success: false, msg: "Please provide some name" });
  }

  res.status(201).json({ success: true, person: name });
});

// PUT

app.put("/people/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body; // get values to update

  const person = people.find((person) => person.id === Number(id));

  if (!person) {
    return res.status(404).json({ success: false, msg: `Can't find the person with id ${id}` });
  }

  const peopleUpdated = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name;
    }

    return person; // return updated person to the new array
  });

  res.status(200).json({ success: true, data: peopleUpdated });
});

// DELETE

app.delete("/people/:id", (req, res) => {
  const person = people.find((person) => person.id === Number(req.params.id));

  if (!person) {
    return res.status(404).json({ success: false, msg: `Can't find the person with id ${req.params.id}` });
  }

  const peopleUpdated = people.filter((person) => person.id !== Number(req.params.id));

  res.status(200).json({ success: true, data: peopleUpdated });
});

// Other

app.post("/my-post-api", (req, res) => {
  const { name, birthYear } = req.body;

  if (!name || !birthYear) {
    return res.status(400).json({ success: false, msg: "Please fill all input fields" });
  }

  res.status(201).json({ success: true, data: [...people, { name, birthYear }] });
});

app.post("/login", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(401).send("Please fill the form with correct credientials.");
  }

  res.status(200).send("Data added");
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000...");
});

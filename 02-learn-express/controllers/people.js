let { people } = require("../data");

const getPeople = (req, res) => {
  res.status(200).json({ success: true, data: people }); // our api endpoint
};

const addPeople = (req, res) => {
  const { name } = req.body; // possible because of express.json middleware, to check if form values are correct, req.body => { name: nameValue }

  if (!name) {
    return res.status(400).json({ success: false, msg: "Please provide some name" });
  }

  res.status(201).json({ success: true, person: name });
};

const updatePerson = (req, res) => {
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
};

const deletePerson = (req, res) => {
  const person = people.find((person) => person.id === Number(req.params.id));

  if (!person) {
    return res.status(404).json({ success: false, msg: `Can't find the person with id ${req.params.id}` });
  }

  const peopleUpdated = people.filter((person) => person.id !== Number(req.params.id));

  res.status(200).json({ success: true, data: peopleUpdated });
};

module.exports = { getPeople, addPeople, updatePerson, deletePerson };

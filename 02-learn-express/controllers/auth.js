const login = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(401).send("Please fill the form with correct credientials.");
  }

  res.status(200).send("Signed In");
};

const signup = (req, res) => {};

module.exports = { login, signup };

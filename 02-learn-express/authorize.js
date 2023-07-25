function authorize(req, res, next) {
  const { user } = req.query;

  if (user === "hammad") {
    req.user = { name: "hammad", id: 7 };
    next();
  } else {
    return res.status(401).send("<h1>Unauthorized</h1>");
  }
}

module.exports = authorize;

const express = require("express");
const router = express.Router();
const { getPeople, addPeople, updatePerson, deletePerson } = require("../controllers/people");

router.get("/", getPeople);
router.post("/", addPeople);
router.put("/:id", updatePerson);
router.delete("/:id", deletePerson);

// alternate way for router

// router.route("/").get(getPeople).post(addPeople);

module.exports = router;

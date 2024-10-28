const express = require("express");
const router = express.Router();
const {
  listUsers,
  addUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

//GET

router.get("/", listUsers);

//POST

router.post("/register", addUser);

// Delete

router.delete("/delete/:id", deleteUser);

//Patch

router.patch("/update/:id", updateUser);

module.exports = router;

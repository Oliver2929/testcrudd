const express = require("express");
const router = express.Router();
const {
  allUsers,
  register,
  login,
  getMe,
  update,
  remove,
} = require("../controllers/userController");
const jwtAuthenticate = require("../middleware/jwtAuthenticate");
const authorizedRoles = require("../middleware/authorizedRoles");

router.get("/", allUsers);

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/me", jwtAuthenticate, getMe);
router.put("/me", jwtAuthenticate, update);
router.delete("/me", jwtAuthenticate, remove);

module.exports = router;

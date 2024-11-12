const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const {
  userList,
  registerUser,
  authenticateUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../services/userService");

const allUsers = async (req, res) => {
  try {
    const users = await userList();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: err.message });
  }
};

//Register a user
const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const user = await registerUser(name, email, password, role);
    res.status(201).json({
      message: "User registered successfully",
      user: {
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//Login user and return JWT
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await authenticateUser(email, password);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

// Get a current user
const getMe = async (req, res) => {
  try {
    const user = await getUserById(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Update user
const update = async (req, res) => {
  try {
    const user = await updateUser(req.user.id, req.body);
    res.json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Delete user
const remove = async (req, res) => {
  try {
    await deleteUser(req.user.id);
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = {
  allUsers,
  register,
  login,
  getMe,
  update,
  remove,
};

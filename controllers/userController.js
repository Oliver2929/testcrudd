const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const {
  getUserList,
  checkUser,
  createUser,
  removeUser,
  modifyUser,
} = require("../services/userService");

const listUsers = async (req, res) => {
  try {
    const users = await getUserList();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: "Unable to list users" });
  }
};

const addUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    res.status(400).send({ message: "Please input name and email!" });
  }

  const userExists = await checkUser(email);

  if (userExists) {
    res.status(400).send({ message: "user already exists" });
  }

  const userCreation = await createUser(name, email);

  if (userCreation) {
    res.status(201).json({
      _id: userCreation._id,
      name: userCreation.name,
      email: userCreation.email,
    });
  } else {
    res.status(400).send({ message: "registration failed" });
  }
});

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const userDeleted = await removeUser(userId);
    if (!userDeleted)
      return res.status(404).send({ message: "User not found" });

    res.status(200).send({ message: "User deleted succesfully!" });
  } catch (error) {
    res.status(500).send({ message: "unable to delete user" });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const userData = req.body;

  try {
    const userChanged = await modifyUser(userId, userData);
    res.status(201).send({ message: "User updated successfully" });
  } catch (error) {
    res.status(404).send({
      message: "unable to insert data because data inserted not matched",
    });
  }
};

module.exports = {
  listUsers,
  addUser,
  deleteUser,
  updateUser,
};

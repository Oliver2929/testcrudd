const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const listUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

const addUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new error("Invalid user data");
  }
});

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return res.status(404).send({ message: "User not found" });

    res.status(200).send({ message: "User deleted succesfully!" });
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).send(user);
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

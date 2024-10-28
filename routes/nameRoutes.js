// const express = require("express");
// const router = express.Router();

// //GET

// router.get("/records", (req, res) => {
//   res.json(users);
// });

// //POST

// router.post("/register", (req, res) => {
//   const newUser = req.body;
//   users.push(newUser);
//   res.status(201).json(users);
// });

// // Delete

// router.delete("/records/:id", (req, res) => {
//   const userId = parseInt(req.params.id, 10);
//   const userIndex = users.findIndex((user) => user.id === userId);

//   if (userIndex !== -1) {
//     users.splice(userIndex, 1);
//     res.status(200).send({ message: "User deleted successfully" });
//   } else {
//     res.status(404).send({ error: "User not found" });
//   }
// });

// //Patch

// router.patch("/records/:id", function (req, res) {
//   let found = users.find(function (item) {
//     return item.id === parseInt(req.params.id);
//   });
//   if (found) {
//     if (req.body.name) {
//       found.name = req.body.name;
//     }

//     res.status(201).json({ message: "data updated" });
//   } else {
//     res.status(404).json({
//       message: "unable to insert data because data inserted not matched",
//     });
//   }
// });

// module.exports = router;

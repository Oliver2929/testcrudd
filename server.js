const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "This is just for testing" });
});

app.use("/api/users", require("./routes/userRoutes"));

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

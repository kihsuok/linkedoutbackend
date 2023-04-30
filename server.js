// Import all required libraries
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();


// Database connection
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("Connected to Database"));

// Middleware
app.use(cors());
app.use(express.json());

// const adminUserRouter = require("./routes/adminUsers");
// app.use("/adminUser", adminUserRouter);

const userRouter = require("./routes/users");
app.use("/user", userRouter);

const adminRouter = require("./routes/admins");
app.use("/admin", adminRouter);


app.listen(process.env.PORT, () => {
  console.log(`Server started on http://localhost:${process.env.PORT}`);
});
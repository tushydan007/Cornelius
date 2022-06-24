const mongoose = require("mongoose");
const express = require("express");
const config = require("config");
const app = express();
const userRouter = require("./routes/users");

mongoose
  .connect(config.get("db"))
  .then(() => console.log("connection to mongoDB succeeded"))
  .catch((err) => console.log("Error connecting to MongoDB", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

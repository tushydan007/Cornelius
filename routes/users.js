const router = require("express").Router();

const User = require("../models/user");

router.get("/", async (req, res) => {
  const user = await User.find();
  res.status(200).send(user);
});

router.post("/", async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  });
  await user.save();
  res.status(200).send(user);
});

module.exports = router;

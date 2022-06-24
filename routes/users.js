const router = require("express").Router();

const { User, validateUser } = require("../models/user");

router.get("/", async (req, res) => {
  const user = await User.find();
  res.status(200).send(user);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user)
    return res.status(404).send("The User with the given ID was not found");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  });
  await user.save();
  res.status(200).send(user);
});

router.put("/:id", async (req, res) => {
  let user = await User.findById(req.params.id);
  if (!user)
    return res.status(404).send("The User with the given ID was not found");

  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  user.name = req.body.name;
  user.email = req.body.email;
  user.save();
  res.status(200).send(user);
});

router.delete("/:id", async (req, res) => {
  let user = await User.findByIdAndRemove(req.params.id);
  if (!user)
    return res.status(404).send("The User with the given ID was not found");

  res.send(user);
});

module.exports = router;

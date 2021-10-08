const router = require("express").Router();
const User = require("../../models/user");
const auth = require("../../middlewares/auth");

// Register new user
 
router.post("/register", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send("That user already exisits!");
    } else {
      const user = new User(req.body);
      await user.save();
      const token = await user.generateAuthToken();
      res.status(201).send({ user, token });
    }
  } catch (e) {
    res.status(400).send(e);
  }
});


//   Get all users

router.get("/getusers", auth.enhance, async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(400).send(e);
  }
});

//  Get logged in user details
 
router.get("/me", auth.enhance, async (req, res) => {
  try {
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

//  Get user by id

router.get("/:id", auth.enhance, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    return !user ? res.sendStatus(404) : res.send(user);
  } catch (e) {
    return res.sendStatus(400);
  }
});

//    Update logged in user

router.patch("/me", auth.simple, async (req, res) => {
  const validationErrors = [];
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password"];
  const isValidOperation = updates.every((update) => {
    const isValid = allowedUpdates.includes(update);
    if (!isValid) validationErrors.push(update);
    return isValid;
  });

  if (!isValidOperation)
    return res
      .status(400)
      .send({ error: `Invalid updates: ${validationErrors.join(",")}` });

  try {
    const { user } = req;
    updates.forEach((update) => {
      user[update] = req.body[update];
    });

    await user.save();
    return res.send(user);
  } catch (e) {
    return res.status(400).send(e);
  }
});

// Update user by id

router.patch("/:id", auth.enhance, async (req, res) => {
  const validationErrors = [];
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password"];
  const isValidOperation = updates.every((update) => {
    const isValid = allowedUpdates.includes(update);
    if (!isValid) validationErrors.push(update);
    return isValid;
  });

  if (!isValidOperation)
    return res
      .status(400)
      .send({ error: `Invalid updates: ${validationErrors.join(",")}` });

  try {
    const _id = req.params.id;
    const user = await User.findById(_id);
    if (!user) return res.sendStatus(404);
    updates.forEach((update) => {
      user[update] = req.body[update];
    });
    await user.save();

    return res.send(user);
  } catch (e) {
    return res.status(400).send(e);
  }
});

//   Delete logged in user

router.delete("/me", auth.simple, async (req, res) => {
  try {
    await req.user.remove();
    res.send({ message: "User Deleted" });
  } catch (e) {
    res.sendStatus(400);
  }
});

//Delete user by id
 
router.delete("/:id", auth.enhance, async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(_id);
    if (!user) return res.sendStatus(404);

    return res.send({ message: "User Deleted" });
  } catch (e) {
    return res.sendStatus(400);
  }
});

module.exports = router;

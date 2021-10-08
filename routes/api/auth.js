const router = require("express").Router();
const User = require("../../models/user");
const auth = require("../../middlewares/auth");
const bcrypt = require('bcrypt');

/**
 * @route   POST /auth/login
 * @desc    Login a user
 * @access  Public
 */
 router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = await user.generateAuthToken();
  res
    .json({ status: "user logged in successfully",token: token });
});

/**
 * @route   POST /auth/logout
 * @desc    Logout a user
 * @access  Private
 */
router.post("/logout", auth.simple, async (req, res) => {
  const { user } = req;
  try {
    user.tokens = user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await user.save();
    res.send({ message: "You have successfully logged out!" });
  } catch (e) {
    res.status(400).send(e);
  }
});

/**
 * @route   POST /auth/logoutAll
 * @desc    Logout a user from all devices
 * @access  Private
 */
router.post("/logoutAll", auth.enhance, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send({ message: "You have successfully logged out!" });
  } catch (e) {
    res.status(400).send(e);
  }
});
module.exports = router;

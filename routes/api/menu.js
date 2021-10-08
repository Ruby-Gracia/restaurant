const express = require("express");
const auth = require("../../middlewares/auth");
const upload = require("../../utils/multer");
const Menu = require("../../models/menu");

const router = new express.Router();

// Create a menu
router.post("/addmenu", auth.enhance, async (req, res) => {
  const menu = new Menu(req.body);
  try {
    await menu.save();
    res.status(201).send(menu);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get(
  "/addmenu/photo/:id",
  auth.enhance,
  upload("menu").single("file"),
  async (req, res, next) => {
    const url = `${req.protocol}://${req.get("host")}`;
    const { file } = req;
    const menuId = req.params.id;
    try {
      if (!file) {
        const error = new Error("Please upload a file");
        error.httpStatusCode = 400;
        return next(error);
      }
      const menu = await Menu.findById(menuId);
      if (!menu) return res.sendStatus(404);
      menu.image = `${url}/${file.path}`;
      await menu.save();
      res.send({ menu, file });
    } catch (e) {
      console.log(e);
      res.sendStatus(400).send(e);
    }
  }
);

// Get all menus 
router.get("/getmenu", async (req, res) => {
  try {
    const menus = await Menu.find({});
    res.send(menus);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;

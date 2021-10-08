const express = require("express");
const auth = require("../../middlewares/auth");
const upload = require("../../utils/multer");
const Cinema = require("../../models/restaurant");
const Restaurant = require("../../models/restaurant");

const router = new express.Router();

// Create a restaurant
router.post("/addrestaurant", auth.enhance, async (req, res) => {
  const restaurant = new Restaurant(req.body);
  try {
    await restaurant.save();
    res.status(201).send(restaurant);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get(
  "/addrestaurant/photo/:id",
  auth.enhance,
  upload("restaurant").single("file"),
  async (req, res, next) => {
    const url = `${req.protocol}://${req.get("host")}`;
    const { file } = req;
    const restaurantId = req.params.id;
    try {
      if (!file) {
        const error = new Error("Please upload a file");
        error.httpStatusCode = 400;
        return next(error);
      }
      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) return res.sendStatus(404);
      restaurant.image = `${url}/${file.path}`;
      await restaurant.save();
      res.send({ restaurant, file });
    } catch (e) {
      console.log(e);
      res.sendStatus(400).send(e);
    }
  }
);

// Get all restaurants
router.get("/getrestaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    res.send(restaurants);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Get restaurant by id
router.get("/getrestaurant/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const restaurant = await Restaurant.findById(_id);
    if (!restaurant) return res.sendStatus(404);
    return res.send(restaurant);
  } catch (e) {
    return res.status(400).send(e);
  }
});

// Update restaurant by id
router.patch("/updaterestaurant/:id", auth.enhance, async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "name",
    "description",
    "rating",
    "cityId",
    "address",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation)
    return res.status(400).send({ error: "Invalid updates!" });

  try {
    const restaurant = await Restaurant.findById(_id);
    updates.forEach((update) => (restaurant[update] = req.body[update]));
    await restaurant.save();
    if (!restaurant) return res.sendStatus(404);
    return res.send(restaurant);
  } catch (e) {
    return res.status(400).send(e);
  }
});

// Delete restaurant by id
router.delete("/deleterestaurant/:id", auth.enhance, async (req, res) => {
  const _id = req.params.id;
  try {
    const restaurant = await Restaurant.findByIdAndDelete(_id);
    if (!restaurant) return res.sendStatus(404);
    return res.send(restaurant);
  } catch (e) {
    return res.sendStatus(400);
  }
});

module.exports = router;

const router = require("express").Router();

router.use("/api/auth", require("./api/auth"));
router.use("/api/user", require("./api/users"));
router.use("/api/city", require("./api/city"));
router.use("/api/restaurant", require("./api/restaurant"));
router.use("/api/movie", require("./api/movie"));
router.use("/api/reservation", require("./api/reservation"));


module.exports = router;

const router = require("express").Router();

router.use("/api/auth", require("./api/auth"));
router.use("/api/user", require("./api/users"));
router.use("/api/city", require("./api/city"));
router.use("/api/restaurant", require("./api/restaurant"));
router.use("/api/menu", require("./api/menu"));

module.exports = router;

const Express = require("express");
const router = Express.Router();

router.use("/api", require("./api"));
router.use("/", require("./app"));
router.use("/user", require("./user"));
router.use("/auth", require("./auth"));

module.exports = router;

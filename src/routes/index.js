const Express = require("express");
const router = Express.Router();

router.use("/api", require("./api"));

router.use("/health", require("./health"));

module.exports = router;

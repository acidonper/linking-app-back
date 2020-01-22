const Express = require("express");
const router = Express.Router();

router.use("/auth", require("./auth"));
router.use("/users", require("./users"));

module.exports = router;

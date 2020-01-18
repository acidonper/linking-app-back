const Express = require("express");
const router = Express.Router();

router.use("/auth", require("./auth"));
router.use("/user", require("./user"));

module.exports = router;

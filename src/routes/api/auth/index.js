const Express = require("express");
const router = Express.Router();

router.use("/login", require("./loginjwt"));
router.use("/logout", require("./logout"));
router.use("/test", require("./test"));

module.exports = router;

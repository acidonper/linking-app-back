const Express = require("express");
const router = Express.Router();

router.use("/login", require("./loginjwt"));

module.exports = router;

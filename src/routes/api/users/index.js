const Express = require("express");
const router = Express.Router();

router.use("/", require("./users"));
router.use("/matchs", require("./matchs"));

module.exports = router;

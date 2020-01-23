const Express = require("express");
const router = Express.Router();

router.use("/", require("./users"));
router.use("/suggestions", require("./suggestions"));
router.use("/beloveds", require("./beloveds"));
router.use("/matches", require("./matches"));

module.exports = router;

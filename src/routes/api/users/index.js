const Express = require("express");
const router = Express.Router();

router.use("/", require("./users"));
router.use("/suggestions", require("./suggestions"));
router.use("/beloveds", require("./beloveds"));
router.use("/matches", require("./matches"));
router.use("/photos", require("./photos"));
router.use("/confirm", require("./confirm"));
router.use("/register", require("./register"));

module.exports = router;

const Express = require("express");
const router = Express.Router();

router.get("/test", async (req, res) => {
    res.status(200).json({ message: "/user/test" });
});

module.exports = router;

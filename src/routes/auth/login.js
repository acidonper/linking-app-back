const Express = require("express");
const router = Express.Router();

router.get("/", async (req, res) => {
    res.status(200).json({ message: "/auth/login" });
});

module.exports = router;

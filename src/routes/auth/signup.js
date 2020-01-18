const Express = require("express");
const router = Express.Router();

router.get("/", async (req, res) => {
    res.status(200).json({ message: "/auth/signup" });
});

module.exports = router;

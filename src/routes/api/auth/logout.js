const Express = require("express");
const router = Express.Router();

router.get("/", async (req, res) => {
    res.status(200).json({ message: "/api/auth/logout" });
});

module.exports = router;

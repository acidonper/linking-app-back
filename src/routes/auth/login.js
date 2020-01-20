const Express = require("express");
const router = Express.Router();
const authenticate = require("../../controllers/auth/index");

router.post("/", async (req, res) => {
    try {
        if (await authenticate.login(req.body))
            res.status(200).json({ message: "/auth/login" });
    } catch (error) {
        res.status(500).json({ error: "Invalid Credentials" });
    }
});

module.exports = router;

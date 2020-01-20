const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../../../middlewares/passport/index");

router.get("/", isAuthenticated, async (req, res) => {
    res.status(200).json({ message: `User ${req.user.username} authorized` });
});

module.exports = router;

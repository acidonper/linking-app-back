const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../../../middlewares/passport/index");
const userLib = require("../../../controllers/mongodb/user/index");

router.get("/", isAuthenticated, async (req, res) => {
    try {
        const id = req.user.username;
        const userProfile = await userLib.searchUserProfile({ username: id });
        res.status(200).json(userProfile);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
});

router.post("/", isAuthenticated, async (req, res) => {
    try {
        const id = req.user.username;
        await userLib.update(id, req.body);
        res.status(200).json({
            message: `User ${id} modified`
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error
        });
    }
});

module.exports = router;

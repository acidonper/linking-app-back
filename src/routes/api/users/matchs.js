const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../../../middlewares/passport/index");
const userLib = require("../../../controllers/mongodb/user/index");

router.get("/", isAuthenticated, async (req, res) => {
    try {
        const { id } = req.query;
        if (!id)
            res.status(400).json({
                message: { error: "Bad parameters" }
            });
        const query = { username: id };
        const users = await userLib.userSearchMatchs(query);
        res.status(200).json({
            users: users
        });
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
});

module.exports = router;

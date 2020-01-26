const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../../../middlewares/passport/index");
const matchLib = require("../../../controllers/mongodb/match/index");

router.get("/", isAuthenticated, async (req, res) => {
    try {
        const id = req.user.username;
        if (!id)
            res.status(400).json({
                message: { error: "Bad parameters" }
            });
        const query = { username: id };
        const users = await matchLib.searchSuggestions(query);
        res.status(200).json({
            users: users
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
});

module.exports = router;

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
        const users = await matchLib.searchMatches(query);
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

router.delete("/", isAuthenticated, async (req, res) => {
    try {
        const id = req.user.username;
        const { suggestionID } = req.body;

        if (!id || !suggestionID) {
            res.status(400).json({
                message: { error: "Bad parameters" }
            });
        } else {
            const query = { username: id, suggestionUsername: suggestionID };
            const result = await matchLib.unmatch(query);
            if (result) {
                res.status(200).json({ users: result });
            } else {
                throw "Internal Server Error";
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
});

module.exports = router;

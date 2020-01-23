const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../../../middlewares/passport/index");
const matchLib = require("../../../controllers/mongodb/match/index");

router.post("/", isAuthenticated, async (req, res) => {
    try {
        const { id } = req.query;
        const { suggestionID } = req.body;

        if (!id || !suggestionID) {
            res.status(400).json({
                message: { error: "Bad parameters" }
            });
        } else {
            console.log(id, suggestionID);
            const query = { username: id, suggestionUsername: suggestionID };
            const saved = await matchLib.includeBeloved(query);
            if (saved) res.status(200).json({ users: "hola" });
            throw "Internal Server Error";
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
});

module.exports = router;

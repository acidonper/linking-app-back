const express = require("express");
const router = express.Router();
const userLib = require("../../../controllers/mongodb/user/index");

router.post("/", async (req, res) => {
    try {
        await userLib.new(req.body);
        res.status(200).json({
            message: `User ${req.body.username} registered`
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error
        });
    }
});

module.exports = router;

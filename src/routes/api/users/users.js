const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../../../middlewares/passport/index");
const isAdmin = require("../../../middlewares/isAdmin");
const userLib = require("../../../controllers/mongodb/user/index");

router.get("/", isAuthenticated, async (req, res) => {
    try {
        const userAdmin = await isAdmin(req.user.username);
        if (userAdmin) {
            const users = await userLib.adminSearch(req.query);
            res.status(200).json({
                users: users
            });
        } else {
            const users = await userLib.userSearch(req.query);
            res.status(200).json({
                users: users
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
});

router.post("/", isAuthenticated, async (req, res) => {
    try {
        const userAdmin = await isAdmin(req.user.username);
        if (userAdmin) {
            await userLib.new(req.body);
            res.status(200).json({
                message: `User ${req.body.username} created`
            });
        } else {
            res.status(200).json({
                message: `Not authorized to create users`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error
        });
    }
});

module.exports = router;

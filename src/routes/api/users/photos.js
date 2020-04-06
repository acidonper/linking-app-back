const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../../../middlewares/passport/index");
const userLib = require("../../../controllers/mongodb/user/index");
const fs = require("fs");

router.get("/", isAuthenticated, async (req, res) => {
    try {
        const id = req.user.username;
        if (!id) {
            res.status(400).json({
                message: { error: "Bad parameters" }
            });
        } else {
            const query = { username: id };
            const userPhotos = await userLib.searchUserPhotos(query);
            res.status(200).json({
                userPhotos: userPhotos
            });
        }
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
        const { photo } = req.body;
        if (!id || !photo) {
            res.status(400).json({
                message: { error: "Bad parameters" }
            });
        } else {
            const user = { username: id };

            // DELETING WHEN FRONT
            // const imageData = await fs.readFileSync(
            //     process.cwd() + "/image.png"
            // );

            console.log(req.body);

            const imageData = photo;
            const imageString = Buffer.from(imageData).toString("base64");

            await userLib.addPhoto(user, imageString);
            const userPhotos = await userLib.searchUserPhotos(user);
            res.status(200).json({
                userPhotos: userPhotos
            });
        }
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
        const { photo } = req.body;
        if (!id || !photo) {
            res.status(400).json({
                message: { error: "Bad parameters" }
            });
        } else {
            const user = { username: id };
            await userLib.deletePhoto(user, photo);
            const userPhotos = await userLib.searchUserPhotos(user);
            res.status(200).json({
                userPhotos: userPhotos
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
});

module.exports = router;

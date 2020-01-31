const express = require("express");
const router = express.Router();
const userLib = require("../../../controllers/mongodb/user/index");

router.get("/:confirmationcode", async (req, res) => {
    try {
        const { confirmationcode } = req.params;
        if (!confirmationcode)
            res.status(400).json({
                message: { error: "Bad parameters" }
            });

        const userConfirmation = await userLib.confirm(confirmationcode);
        console.log(userConfirmation);
        if (userConfirmation) {
            res.status(200).json({
                message: "User Confirmed! Please, login!"
            });
        } else {
            res.status(500).json({
                error: "Activation code not allowed"
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

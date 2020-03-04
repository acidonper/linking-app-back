const passport = require("passport");

module.exports = {
    isActive: (req, res, next) => {
        passport.authenticate("jwt", { session: false }, (error, user) => {
            if (error !== null)
                return res
                    .status(500)
                    .json({ message: "Internal Server Error" });

            if (!user)
                return res.status(401).json({ message: "Non authenticated" });

            req.user = user;
            next();
        })(req, res, next);
    }
};

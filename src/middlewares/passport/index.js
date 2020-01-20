const passport = require("passport");

module.exports = {
    isAuthenticated: (req, res, next) => {
        passport.authenticate(
            "jwt",
            { session: false },
            (error, user, info) => {
                if (error !== null)
                    return res
                        .status(500)
                        .json({ message: "Internal Server Error" });

                if (!user)
                    return res.status(401).json({ message: "Non authorized" });

                req.user = user;
                next();
            }
        )(req, res, next);
    }
};

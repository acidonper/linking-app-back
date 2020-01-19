const passport = require("passport");

module.exports = app => {
    app.use(passport.initialize());
    passport.use(require("./strategies/localStrategy"));
    passport.use(require("./strategies/jwtStrategy"));
};

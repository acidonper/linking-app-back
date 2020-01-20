const LocalStrategy = require("passport-local").Strategy;
const authLib = require("../../index");

module.exports = new LocalStrategy(
    {
        usernameField: "username",
        passwordField: "password",
        session: false
    },
    async (username, password, next) => {
        try {
            const login = {
                username: username,
                password: password
            };
            const user = await authLib.loginjwt(login);
            if (user) return next(null, user);
            return next(null, false, { message: "Invalid credentials" });
        } catch (error) {
            return next(error);
        }
    }
);

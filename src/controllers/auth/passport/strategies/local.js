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

            if (!Object.keys(user).includes("error")) {
                return next(null, user);
            } else {
                return next(null, false, { error: "Invalid credentials" });
            }
        } catch (error) {
            next(error);
        }
    }
);

const LocalStrategy = require("passport-local").Strategy;
const authLib = require("../../index");

module.exports = new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password",
        session: false
    },
    async (login, next) => {
        console.log(`Local Strategy. Credentials -> ${login}`);
        try {
            if (check.emptyObject(login)) throw "Empty login object";
            if (
                !check.like(login, { username: "baz", password: "pass" }) &&
                !check.like(login, { email: "baz", password: "pass" })
            )
                throw "Invalid login object";

            if (authLib.login(login)) next(null, user);
            next(null, false, { message: "Invalid credentials" });
        } catch (error) {
            next(error);
        }
    }
);

const mongoUserLib = require("../mongodb/user/index");
const passport = require("passport");
const jwt = require("jsonwebtoken");

var check = require("check-types");

module.exports = {
    login: async login => {
        try {
            if (check.emptyObject(login)) throw "Empty login object";
            if (
                !check.like(login, { username: "baz", password: "pass" }) &&
                !check.like(login, { email: "baz", password: "pass" })
            )
                throw "Invalid login object";

            const userLogin = await mongoUserLib.login(login);
            if (userLogin) return "User Logged";
            return "Invalid Credentials";
        } catch (error) {
            throw error;
        }
    },
    loginjwt: async login => {
        try {
            if (check.emptyObject(login)) throw "Empty login object";
            if (
                !check.like(login, { username: "baz", password: "pass" }) &&
                !check.like(login, { email: "baz", password: "pass" })
            )
                throw "Invalid login object";

            const userLogin = await mongoUserLib.loginjwt(login);
            if (userLogin) return userLogin;
            return "Invalid Credentials";
        } catch (error) {
            throw error;
        }
    },
    generatetoken: async (req, res) => {
        try {
            passport.authenticate(
                "local",
                { session: false },
                (error, user, info) => {
                    if (error !== null)
                        res.status(500).json({
                            message: "Internal Server Error"
                        });

                    if (info) res.status(400).json({ message: info });

                    const payload = {
                        sub: user._id,
                        exp: Date.now() + parseInt(process.env.JWT_EXPIRES),
                        username: user.username
                    };

                    const token = jwt.sign(
                        JSON.stringify(payload),
                        process.env.JWT_SECRET
                    );
                    res.status(200).json({ data: { token } });
                }
            )(req, res);
        } catch (error) {
            throw error;
        }
    },
    find: async search => {
        try {
            if (check.emptyObject(search)) throw "Empty search object";
            if (
                !check.like(search, { _id: "baz" }) &&
                !check.like(search, { username: "baz" }) &&
                !check.like(search, { email: "baz" })
            )
                throw "Invalid search object";

            const user = mongoUserLib.find(search);
            if (user) return user;
            return false;
        } catch (error) {
            throw error;
        }
    }
};

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

            if (!Object.keys(userLogin).includes("error")) {
                return userLogin;
            } else {
                return { error: "Invalid Credentials" };
            }
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
                    if (!user) {
                        res.status(401).json({ message: info });
                    } else {
                        const payload = {
                            sub: user._id,
                            exp: Date.now() + parseInt(process.env.JWT_EXPIRES),
                            username: user.username
                        };

                        const token = jwt.sign(
                            JSON.stringify(payload),
                            process.env.JWT_SECRET
                        );

                        res.status(200).json({ message: { token } });
                    }
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

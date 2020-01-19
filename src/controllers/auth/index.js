const mongoUserLib = require("../mongodb/user/index");
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
    jwtlogin: login => {
        try {
            if (check.emptyObject(login)) throw "Empty login object";
            if (
                !check.like(login, { username: "baz", password: "pass" }) &&
                !check.like(login, { email: "baz", password: "pass" })
            )
                throw "Invalid login object";

            if (mongoUserLib.login(login)) return "User Logged";
            return "Invalid Credentials";
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

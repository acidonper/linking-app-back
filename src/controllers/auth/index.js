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

            if (mongoUserLib.login(login)) return "User Logged";
            return "Invalid Credentials";
        } catch (error) {
            throw error;
        }
    }
};

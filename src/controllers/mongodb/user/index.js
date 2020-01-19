const userModel = require("../../../models/user");
const passLib = require("../../auth/password/index");
var check = require("check-types");

module.exports = {
    new: async user => {
        try {
            const { password } = user;

            if (check.emptyString(password)) throw "Empty password provided";

            const pass = passLib.encrypt(password);
            user.password = pass;

            const newUser = new userModel(user, { autoIndex: false });
            await newUser.save();

            return true;
        } catch (error) {
            throw error;
        }
    },
    delete: async search => {
        try {
            if (check.emptyObject(search)) throw "Empty search object";
            if (
                !check.like(search, { _id: "baz" }) &&
                !check.like(search, { username: "baz" }) &&
                !check.like(search, { email: "baz" })
            )
                throw "Invalid search object";

            const userDeleted = userModel.deleteOne(search);
            await userDeleted.exec();

            return true;
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

            const userSearched = userModel.find(search);
            const findAction = await userSearched.exec();

            if (findAction.length === 0)
                throw `User not found providing search: ${search}`;
            if (findAction.length > 1)
                throw `User duplicated providing search: ${search}`;

            return findAction[0];
        } catch (error) {
            throw error;
        }
    },
    login: async userLogin => {
        try {
            if (check.emptyObject(userLogin)) throw "Empty login object";
            if (
                !check.like(userLogin, { username: "baz", password: "pass" }) &&
                !check.like(userLogin, { email: "baz", password: "pass" })
            )
                throw "Invalid login object";

            let userSearched;

            if (check.containsKey(userLogin, "username"))
                userSearched = userModel.find({ username: userLogin.username });
            if (check.containsKey(userLogin, "email"))
                userSearched = userModel.find({ email: userLogin.email });

            const findAction = await userSearched.exec();

            if (findAction.length === 0) throw `User ${userLogin} not found`;

            const passwordDB = findAction[0].password;
            if (!passLib.compare(passwordDB, userLogin.password))
                throw `Invalid Password`;

            return true;
        } catch (error) {
            throw error;
        }
    }
};

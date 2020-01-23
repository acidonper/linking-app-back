const userModel = require("../../../models/user");
const passLib = require("../../auth/password/index");
const check = require("check-types");
const matchLib = require("../match/index");

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

            const userSearched = userModel.find(search).select("+role");
            const findAction = await userSearched.exec();

            if (findAction.length === 0) return false;
            if (findAction.length > 1)
                throw `User duplicated providing search: ${search}`;

            return findAction[0];
        } catch (error) {
            throw error;
        }
    },
    getId: async search => {
        try {
            if (check.emptyObject(search)) throw "Empty search object";
            if (
                !check.like(search, { username: "baz" }) &&
                !check.like(search, { email: "baz" })
            )
                throw "Invalid search object";

            const userSearched = userModel.find(search);
            const findAction = await userSearched.exec();

            if (findAction.length === 0) return false;
            if (findAction.length > 1)
                throw `User duplicated providing search: ${search}`;

            return findAction[0]._id;
        } catch (error) {
            throw error;
        }
    },
    adminSearch: async search => {
        try {
            const usersSearched = userModel.find(search);
            const findAction = await usersSearched.exec();
            return findAction;
        } catch (error) {
            throw error;
        }
    },
    userSearch: async search => {
        try {
            delete search.password;
            search.role = "user";
            const usersSearched = userModel
                .find(search)
                .select("-password -role -__v -_id");
            const findAction = await usersSearched.exec();
            return findAction;
        } catch (error) {
            throw error;
        }
    },
    userSearchMatches: async usernameQuery => {
        try {
            const usersSearched = userModel.find(usernameQuery);
            const findAction = await usersSearched.exec();
            if (findAction.length !== 1) throw "Username provided not found";
            const usersmatched = await matchLib.searchSuggestions(
                findAction[0]
            );
            return usersmatched;
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
                userSearched = userModel
                    .find({ username: userLogin.username })
                    .select("+password");
            if (check.containsKey(userLogin, "email"))
                userSearched = userModel
                    .find({ email: userLogin.email })
                    .select("+password");

            const findAction = await userSearched.exec();
            if (findAction.length === 0) throw "User not found";

            const passwordDB = findAction[0].password;
            if (!passLib.compare(passwordDB, userLogin.password))
                throw "Invalid Password";

            return true;
        } catch (error) {
            throw error;
        }
    },
    loginjwt: async userLogin => {
        try {
            if (check.emptyObject(userLogin)) throw "Empty login object";
            if (
                !check.like(userLogin, { username: "baz", password: "pass" }) &&
                !check.like(userLogin, { email: "baz", password: "pass" })
            )
                throw "Invalid login object";

            let userSearched;

            if (check.containsKey(userLogin, "username"))
                userSearched = userModel
                    .find({ username: userLogin.username })
                    .select("+password");
            if (check.containsKey(userLogin, "email"))
                userSearched = userModel
                    .find({ email: userLogin.email })
                    .select("+password");

            const findAction = await userSearched.exec();

            if (findAction.length === 0) return { error: "User not found" };

            const passwordDB = findAction[0].password;
            if (!passLib.compare(passwordDB, userLogin.password))
                return { error: "Invalid Password" };

            return findAction[0];
        } catch (error) {
            throw error;
        }
    }
};

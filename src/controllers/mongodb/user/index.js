const userModel = require("../../../models/user");
const passLib = require("../../auth/password/index");
const photosLib = require("../../clouddinary/index");
const check = require("check-types");
const uuid = require("uuid/v1");
const mailer = require("../../mail/index");

module.exports = {
    new: async user => {
        try {
            if (check.emptyObject(user)) throw "Empty search object";

            const { password, email } = user;

            user.confirmationCode = uuid();

            if (check.emptyString(password)) throw "Empty password provided";

            const mailerActivation = process.env.CONFIRMATION_NODEMAILER;

            if (mailerActivation === "true") {
                await mailer.sendConfirmation(email, user.confirmationCode);
                user.status = "disable";
            } else {
                user.status = "active";
            }

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
    searchUserPhotos: async search => {
        try {
            if (check.emptyObject(search)) throw "Empty search object";
            if (
                !check.like(search, { username: "baz" }) &&
                !check.like(search, { email: "baz" })
            )
                throw "Invalid search object";

            const usersSearched = userModel.findOne(search).select("photos");
            const findAction = await usersSearched.exec();
            return findAction;
        } catch (error) {
            throw error;
        }
    },
    addPhoto: async (user, photo) => {
        try {
            if (check.emptyObject(user)) throw "Empty search object";
            if (
                !check.like(user, { username: "baz" }) &&
                !check.like(user, { email: "baz" })
            )
                throw "Invalid user object";

            const newPhoto = await photosLib.uploadPhoto(user.username, photo);
            const userAddPhoto = userModel.findOneAndUpdate(user, {
                $addToSet: { photos: newPhoto.secure_url }
            });
            await userAddPhoto.exec();

            return true;
        } catch (error) {
            throw error;
        }
    },
    deletePhoto: async (user, photo) => {
        try {
            if (check.emptyObject(user)) throw "Empty search object";
            if (
                !check.like(user, { username: "baz" }) &&
                !check.like(user, { email: "baz" })
            )
                throw "Invalid user object";

            const userDeletePhoto = userModel.findOneAndUpdate(user, {
                $pull: { photos: photo }
            });
            await userDeletePhoto.exec();

            return true;
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
    },
    confirm: async confirmationcode => {
        try {
            const userSearched = userModel.findOneAndUpdate(
                { confirmationCode: confirmationcode },
                { status: "enable" }
            );
            const findAction = await userSearched.exec();
            if (findAction === null) return false;
            return true;
        } catch (error) {
            throw error;
        }
    }
};

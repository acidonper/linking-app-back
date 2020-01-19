const mongoose = require("mongoose");
require("dotenv").config({ path: "../../../.env" });
const DB_PORT = process.env.MONGO_PORT;
const DB_HOST = process.env.MONGO_HOST;
const DB_NAME = process.env.MONGO_DB;

const assert = require("assert");
const expect = require("expect");

const authLib = require("../../../src/controllers/auth/index");
const userLib = require("../../../src/controllers/mongodb/user/index");
const userLogin = require("../../resources/userLogin");

console.log(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`);

mongoose
    .connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(result => {
        console.log(
            `Connection to mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME} established`
        );
    })
    .catch(error => {
        throw error;
    });

describe("Authentication Library", () => {
    it("Should create a user", async () => {
        assert.equal(await userLib.new(userLogin), true);
    });
    it("Login with user", async () => {
        assert.equal(
            await authLib.login({
                username: "robot123456789001",
                password: "robot1234567890./*01"
            }),
            "User Logged"
        );
    });
    it("Should delete an user", async () => {
        assert.equal(
            await userLib.delete({ username: userLogin.username }),
            true
        );
        mongoose.connection.close();
    });
});

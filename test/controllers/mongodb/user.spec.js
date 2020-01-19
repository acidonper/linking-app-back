const mongoose = require("mongoose");
require("dotenv").config({ path: "../../../.env" });
const DB_PORT = process.env.MONGO_PORT;
const DB_HOST = process.env.MONGO_HOST;
const DB_NAME = process.env.MONGO_DB;
const userLib = require("../../../src/controllers/mongodb/user/index");
const newUser = require("../../resources/user");

const assert = require("assert");
const expect = require("expect");

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

describe("User Library Test", () => {
    it("Should create an user", async () => {
        assert.equal(await userLib.new(newUser), true);
    });
    it("Should find an user", async () => {
        const search = await userLib.find({ username: newUser.username });
        expect(typeof search).toBe("object");
    });
    it("Should delete an user", async () => {
        assert.equal(
            await userLib.delete({ username: newUser.username }),
            true
        );
        mongoose.connection.close();
    });
});

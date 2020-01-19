const mongoose = require("mongoose");
const userLib = require("../../../src/controllers/mongodb/user/index");
const newUser = require("../../resources/user");

const assert = require("assert");
const expect = require("expect");

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

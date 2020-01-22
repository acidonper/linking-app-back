const mongoose = require("mongoose");
const userLib = require("../../../src/controllers/mongodb/user/index");
const newUser = require("../../resources/user");

const assert = require("assert");
const expect = require("expect");

describe("User Library Test", () => {
    it("Should create an user", async () => {
        assert.equal(await userLib.new(newUser), true);
    });
    it("Should find an user using find", async () => {
        const search = await userLib.find({ username: newUser.username });
        expect(typeof search).toBe("object");
    });
    it("Should find an user using adminSearch", async () => {
        const search = await userLib.adminSearch({
            username: newUser.username
        });
        expect(typeof search).toBe("object");
    });
    it("Should find an user using userSearch", async () => {
        const search = await userLib.userSearch({ username: newUser.username });
        expect(typeof search).toBe("object");
    });
    it("Should find an user using userSearchMatchs", async () => {
        const search = await userLib.userSearchMatchs({
            username: newUser.username
        });
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

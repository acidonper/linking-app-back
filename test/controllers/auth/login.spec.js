const assert = require("assert");

const authLib = require("../../../src/controllers/auth/index");
const userLib = require("../../../src/controllers/mongodb/user/index");
const userLogin = require("../../resources/userLogin");
// const userTest = require("../../resources/userTest");

describe("Authentication Library", () => {
    it("Should create a user", async () => {
        assert.equal(await userLib.new(userLogin), true);
    });
    it("Login with user", async () => {
        const login = await authLib.login({
            username: "robot123456789001",
            password: "robot1234567890./*01"
        });
        console.log(login);
        assert.equal(login, "User Logged");
    });
    it("Should delete an user", async () => {
        assert.equal(
            await userLib.delete({ username: userLogin.username }),
            true
        );
    });
    // it("Should create a user", async () => {
    //     assert.equal(await userLib.new(userTest), true);
    // });
});

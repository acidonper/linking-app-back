const assert = require("assert");
const expect = require("expect");

const passLib = require("../../../src/controllers/auth/password/index");

describe("Password Library", () => {
    it("Should encrypt password", () => {
        const passHash = passLib.encrypt("password");
        expect(typeof passHash).toBe("string");
    });
    it("Should compare DB password and password", () => {
        assert.equal(
            passLib.compare(
                "$2b$10$Ctg3pBAzLsz2/WB4sqHDqeTBZkS4hk0.sxUXSwvd4mChIUoJh7lE6",
                "password"
            ),
            true
        );
    });
});

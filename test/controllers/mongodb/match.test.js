const userLib = require("../../../src/controllers/mongodb/user/index");
const matchLib = require("../../../src/controllers/mongodb/match/index");
const userMatch = require("../../resources/userTest");

const assert = require("assert");
const expect = require("expect");

const mongoose = require("mongoose");
const Mockgoose = require("mock-mongoose").Mockgoose;
const mockgoose = new Mockgoose(mongoose);

before(function(done) {
    mockgoose.prepareStorage().then(function() {
        mongoose.connect(
            "mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            },
            function(err) {
                done(err);
            }
        );
    });
});

describe("Match Library Test", () => {
    it("Should create an user", async () => {
        assert.equal(await userLib.new(userMatch), true);
    });

    it("Should search an users' suggestion using searchSuggestions", async () => {
        const search = await matchLib.searchSuggestions({
            username: userMatch.username
        });
        expect(typeof search).toBe("object");
    });

    it("Should add an users' beloved using includeBeloved", async () => {
        const search = await matchLib.includeBeloved({
            username: userMatch.username,
            suggestionUsername: userMatch.username
        });
        assert.equal(search, "Added beloved and found a new match");
    });

    it("Should find users' beloveds using searchBeloveds", async () => {
        const search = await matchLib.searchBeloveds({
            username: userMatch.username
        });
        expect(typeof search).toBe("object");
    });

    it("Should delete an users' match using unmatch", async () => {
        const search = await matchLib.unmatch({
            username: userMatch.username,
            suggestionUsername: userMatch.username
        });
        assert.equal(search, "Delete Match");
    });

    it("Should find users' suggestions using searchMatches", async () => {
        const search = await matchLib.searchMatches({
            username: userMatch.username
        });
        expect(typeof search).toBe("object");
    });

    it("Should find an user using searchMatches", async () => {
        const search = await matchLib.searchMatches({
            username: userMatch.username
        });
        expect(typeof search).toBe("object");
    });

    it("Should delete an user", async () => {
        assert.equal(
            await userLib.delete({ username: userMatch.username }),
            true
        );
    });

    it("Finish", done => {
        done();
    });
});

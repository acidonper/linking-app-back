const assert = require("assert");

const authLib = require("../../../src/controllers/auth/index");
const userLib = require("../../../src/controllers/mongodb/user/index");
const userLogin = require("../../resources/userLogin");

const mongoose = require("mongoose");
const Mockgoose = require("mock-mongoose").Mockgoose;
const mockgoose = new Mockgoose(mongoose);

describe("Authentication Library", () => {
  before(function (done) {
    mockgoose.prepareStorage().then(function () {
      mongoose.connect(
        "mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
        },
        function (err) {
          done(err);
        }
      );
    });
  });
  it("Should create a user", async () => {
    assert.equal(await userLib.new(userLogin), true);
  });
  it("Login with user", async () => {
    const login = await authLib.login({
      username: "robot123456789001",
      password: "robot1234567890./*01",
    });
    assert.equal(login, "User Logged");
  });
  it("Should delete an user", async () => {
    assert.equal(await userLib.delete({ username: userLogin.username }), true);
  });

  it("Finish", (done) => {
    done();
  });
});

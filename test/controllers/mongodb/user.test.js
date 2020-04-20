const userLib = require("../../../src/controllers/mongodb/user/index");
const newUser = require("../../resources/user");

const assert = require("assert");
const expect = require("expect");

const mongoose = require("mongoose");
const Mockgoose = require("mock-mongoose").Mockgoose;
const mockgoose = new Mockgoose(mongoose);

describe("User Library Test", () => {
  before(function (done) {
    mockgoose.prepareStorage().then(function () {
      mongoose.connect(
        "mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false,
        },
        function (err) {
          done(err);
        }
      );
    });
  });
  it("Should create an user", async () => {
    assert.equal(await userLib.new(newUser), true);
  });

  it("Should find an user using find", async () => {
    const search = await userLib.find({ username: newUser.username });
    expect(typeof search).toBe("object");
  });

  it("Should find an user using adminSearch", async () => {
    const search = await userLib.adminSearch({
      username: newUser.username,
    });
    expect(typeof search).toBe("object");
  });

  it("Should find an user using userSearch", async () => {
    const search = await userLib.userSearch({ username: newUser.username });
    expect(typeof search).toBe("object");
  });

  it("Should search an users' photo using searchUserPhotos", async () => {
    const search = await userLib.searchUserPhotos({
      username: newUser.username,
    });
    expect(typeof search).toBe("object");
  });

  // it("Should add an users' photo using addPhoto", async () => {
  //     const search = await userLib.addPhoto(
  //         {
  //             username: newUser.username
  //         },
  //         "http://myphoto.example.com"
  //     );
  //     expect(typeof search).toBe("object");
  // });

  it("Should delete an users' photo using deletePhoto", async () => {
    const search = await userLib.deletePhoto(
      {
        username: newUser.username,
      },
      "http://myphoto.example.com"
    );
    expect(search).toBe(true);
  });

  it("Should find an users' ID using getId", async () => {
    const search = await userLib.getId({
      username: newUser.username,
    });
    expect(typeof search).toBe("object");
  });

  it("Should delete an user", async () => {
    assert.equal(await userLib.delete({ username: newUser.username }), true);
  });

  it("Finish", (done) => {
    done();
  });
});

const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    suggestions: [{ type: Schema.Types.ObjectId, ref: "User" }],
    beloved: [{ type: Schema.Types.ObjectId, ref: "User" }],
    lovers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    matches: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

userSchema.plugin(uniqueValidator, { message: "{PATH} has to be uniq" });

module.exports = mongoose.model("Matches", userSchema);

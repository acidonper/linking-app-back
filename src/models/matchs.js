const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    source: { type: Schema.Types.ObjectId, ref: "User" },
    destinations: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

userSchema.plugin(uniqueValidator, { message: "{PATH} has to be uniq" });

module.exports = mongoose.model("Marchs", userSchema);

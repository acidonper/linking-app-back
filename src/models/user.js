const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    lastname: {
        type: String,
        required: [true, "lastname is required"]
    },
    username: {
        type: String,
        required: [true, "username es is required"],
        unique: true
    },
    password: {
        type: Object,
        required: [true, "Password is required"]
    },
    email: {
        type: String,
        required: [true, "email es is required"],
        unique: true
    }
});

userSchema.plugin(uniqueValidator, { message: "{PATH} has to be uniq" });

module.exports = mongoose.model("Users", userSchema);

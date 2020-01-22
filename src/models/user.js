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
        required: [true, "Password is required"],
        select: false
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    role: {
        type: String,
        required: [true, "role is required"],
        enum: ["admin", "user"]
    },
    chat: {
        id: {
            type: String
        },
        status: {
            type: String,
            enum: ["online", "offline"]
        }
    },
    information: {
        age: {
            type: Number,
            required: [true, "age is required"],
            min: 18,
            max: 80
        },
        gender: {
            type: String,
            required: [true, "gender is required"],
            enum: ["male", "female"]
        },
        education: {
            type: String,
            required: [true, "education is required"],
            enum: ["elementary", "highSchool", "university"]
        },
        physicalCondition: {
            type: String,
            required: [true, "physicalCondition is required"],
            enum: ["thin", "fitness", "curvy"]
        },
        activity: {
            type: String,
            required: [true, "activity is required"],
            enum: ["homeLover", "active", "energetic"]
        },
        lifeStyle: {
            type: String,
            required: [true, "lifeStyle is required"],
            enum: ["working", "studying", "enjoying"]
        },
        city: {
            type: String,
            required: [true, "city is required"]
        }
    },
    preferences: {
        culturalInterest: {
            type: String,
            enum: ["low", "medium", "high"],
            required: [true, "culturalInterest is required"]
        },
        sportCadence: {
            type: String,
            enum: ["low", "medium", "high"],
            required: [true, "sportCadence is required"]
        },
        travelCadence: {
            type: String,
            enum: ["low", "medium", "high"],
            required: [true, "travelCadence is required"]
        },
        owlOrSkyLark: {
            type: String,
            enum: ["owl", "skylark"],
            required: [true, "owlOrSkyLark is required"]
        },
        sexualPreferences: {
            type: String,
            enum: ["male", "female", "both"],
            required: [true, "sexualPreferences is required"]
        },
        ageRange: {
            min: {
                type: Number,
                min: 18,
                max: 80,
                required: [true, "Min ageRange is required"]
            },
            max: {
                type: Number,
                min: 18,
                max: 80,
                required: [true, "Max ageRange is required"]
            }
        }
    }
});

userSchema.plugin(uniqueValidator, { message: "{PATH} has to be uniq" });

module.exports = mongoose.model("Users", userSchema);

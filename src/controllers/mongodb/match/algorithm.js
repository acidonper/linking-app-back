const matchModel = require("../../../models/matches");
const userModel = require("../../../models/user");
const check = require("check-types");

module.exports = async search => {
    try {
        if (check.emptyObject(search)) throw "Empty search object";
        if (
            !check.like(search, { username: "baz" }) &&
            !check.like(search, { email: "baz" })
        )
            throw "Invalid search object";

        const userSearch = userModel.findOne(search);
        const userDefinition = await userSearch.exec();
        const { information, preferences } = userDefinition;

        if (
            information.education === "university" &&
            preferences.culturalInterest === "low"
        )
            preferences.culturalInterest = "medium";

        const usersSearch = userModel
            .find({
                "information.age": { $gte: preferences.ageRange.min }
            })
            .find({
                "information.age": { $lte: preferences.ageRange.max }
            })
            .find({ "information.gender": preferences.sexualPreferences })
            .find({ "information.city": information.city })
            .find({ "information.kidsLover": information.kidsLover })
            .find({ "information.PetsLover": information.PetsLover });
        // .find({
        //     "preference.culturalInterest": preferences.culturalInterest
        // })
        // .find({ "preference.sportCadence": preferences.sportCadence })
        // .find({ "preference.travelCadence": preferences.travelCadence })
        // .find({ "preference.owlOrSkyLark": preferences.owlOrSkyLark })

        const users = await usersSearch.exec();

        let usersIDs = [];

        users.map(user => {
            usersIDs.push(user._id);
        });

        const newSuggestions = new matchModel(
            { user: userDefinition._id, suggestions: usersIDs },
            { autoIndex: false }
        );
        const suggestions = await newSuggestions.save();

        const userSuggestionsSearch = matchModel
            .findOne({ user: userDefinition._id })
            .select({ suggestions: 1 })
            .populate({
                path: "suggestions",
                model: "Users",
                select: "-_id -name -lastname -email -role -__v"
            });
        const searchBelovedAction = await userSuggestionsSearch.exec();

        return searchBelovedAction.suggestions;
    } catch (error) {
        throw error;
    }
};

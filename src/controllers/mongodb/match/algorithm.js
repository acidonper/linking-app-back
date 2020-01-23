const matchModel = require("../../../models/matches");
const userModel = require("../../../models/user");

module.exports = async user => {
    try {
        const { information, preferences } = user;

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
        // .find({ "preference.owlOrSkyLark": preferences.owlOrSkyLark });

        const users = await usersSearch.exec();

        let usersIDs = [];

        users.map(user => {
            usersIDs.push(user._id);
        });

        const newSuggestions = new matchModel(
            { user: user._id, suggestions: usersIDs },
            { autoIndex: false }
        );
        const suggestions = await newSuggestions.save();

        return [suggestions];
    } catch (error) {
        throw error;
    }
};

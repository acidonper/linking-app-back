const matchModel = require("../../../models/matchs");
const userModel = require("../../../models/user");

module.exports = async user => {
    try {
        // Move to another microservice
        // Destructure
        const { preferences, _id, information } = user;

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
            .find({ "information.city": information.city });
        // .find({
        //     "preference.culturalInterest": preferences.culturalInterest
        // })
        // .find({ "preference.sportCadence": preferences.sportCadence })
        // .find({ "preference.travelCadence": preferences.travelCadence })
        // .find({ "preference.owlOrSkyLark": preferences.owlOrSkyLark });

        const users = await usersSearch.exec();

        console.log(preferences);
        console.log(_id);
        console.log(information);

        return users;
    } catch (error) {
        throw error;
    }
};

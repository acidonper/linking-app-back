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
        const { information, preferences, category } = userDefinition;

        const userSuggestions = userModel.find({
            "information.age": { $gte: preferences.ageRange.min },
            "information.age": { $lte: preferences.ageRange.max },
            "information.gender": preferences.sexualPreferences,
            "information.city": information.city,
            "information.kidsLover": information.kidsLover,
            "information.petsLover": information.petsLover,
            "preferences.owlOrSkyLark": preferences.owlOrSkyLark,
            category: category
        });

        const users = await userSuggestions.exec();

        let usersIDs = [];

        users.map(user => {
            usersIDs.push(user._id);
        });

        const userSuggestionsSearch = matchModel
            .findOne({
                user: userDefinition._id
            })
            .select({ suggestions: 1 });
        const userCurrentSuggestions = await userSuggestionsSearch.exec();

        if (!userCurrentSuggestions) {
            const newSuggestions = new matchModel(
                { user: userDefinition._id, suggestions: usersIDs },
                { autoIndex: false }
            );
            await newSuggestions.save();
        } else {
            const updateSuggestions = matchModel.findOneAndUpdate(
                {
                    user: userDefinition._id
                },
                { suggestions: usersIDs }
            );
            await updateSuggestions.exec();
        }

        const userNewSuggestionsSearch = matchModel
            .findOne({ user: userDefinition._id })
            .select({ suggestions: 1 })
            .populate({
                path: "suggestions",
                model: "Users",
                select: "-_id -name -lastname -email -role -__v"
            });
        const searchBelovedAction = await userNewSuggestionsSearch.exec();

        return searchBelovedAction.suggestions;
    } catch (error) {
        throw error;
    }
};

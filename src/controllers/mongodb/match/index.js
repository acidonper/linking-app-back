const matchAlgorithm = require("./algorithm");
const matchModel = require("../../../models/matches");
const userLib = require("../user/index");

module.exports = {
    searchSuggestions: async user => {
        try {
            const usersSuggestions = matchModel
                .find({
                    user: user._id
                })
                .populate({
                    path: "suggestions",
                    model: "Users",
                    select: "-_id -name -lastname -email -role -__v"
                });

            const suggestions = await usersSuggestions.exec();

            if (suggestions.length === 0) {
                const calculatedSuggestion = await matchAlgorithm(user);
                return calculatedSuggestion;
            }

            return suggestions;
        } catch (error) {
            throw error;
        }
    },
    includeBeloved: async newBeloved => {
        try {
            const { username, suggestionUsername } = newBeloved;

            console.log(username, suggestionUsername);

            console.log(userLib);

            const userID = await userLib.userSearch({ username: username });

            // const userID = await userLib.getId({ username: username });
            // const suggestionID = await userLib.getId({
            //     username: suggestionUsername
            // });

            console.log(userID, suggestionID);

            return true;
        } catch (error) {
            throw error;
        }
    }
};

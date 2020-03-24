const matchAlgorithm = require("./algorithm");
const matchModel = require("../../../models/matches");
const userModel = require("../../../models/user");
const check = require("check-types");

module.exports = {
    searchSuggestions: async user => {
        try {
            if (check.emptyObject(user)) throw "Empty user object";
            if (
                !check.like(user, { username: "baz" }) &&
                !check.like(user, { email: "baz" })
            )
                throw "Invalid user object";

            const userSearch = userModel.findOne(user);
            const userDefinition = await userSearch.exec();

            const userSuggestionsSearch = matchModel
                .findOne({ user: userDefinition._id })
                .select({ suggestions: 1 })
                .populate({
                    path: "suggestions",
                    model: "Users",
                    select: "-_id -name -lastname -email -role -__v"
                });

            const userSuggestions = await userSuggestionsSearch.exec();

            if (!userSuggestions) {
                const calculatedSuggestion = await matchAlgorithm(user);
                return calculatedSuggestion;
            }

            // const userBeloveds = matchModel
            //     .findOne({ user: userDefinition._id })
            //     .select({ beloved: 1 })
            //     .populate({
            //         path: "beloved",
            //         model: "Users",
            //         select: "-_id -name -lastname -email -role -__v"
            //     });

            // if (userBeloveds) {
            //     if (userBeloveds.length > 0) {
            //         const calculatedSuggestion = await matchAlgorithm(user);
            //         return calculatedSuggestion;
            //     }
            // }

            return userSuggestions.suggestions;
        } catch (error) {
            throw error;
        }
    },
    includeBeloved: async newBeloved => {
        try {
            const { username, suggestionUsername } = newBeloved;

            // Implement bidirectional functions call error
            // const userID = await userLib.getId({ username: username });
            // const suggestionID = await userLib.getId({
            //     username: suggestionUsername
            // });

            const userID = await getIdLocal({ username: username });
            const suggestionID = await getIdLocal({
                username: suggestionUsername
            });

            const userAddBeloved = matchModel.findOneAndUpdate(
                { user: userID },
                { $addToSet: { beloved: suggestionID } }
            );
            await userAddBeloved.exec();

            const suggestionUserAddLover = matchModel.findOneAndUpdate(
                { user: suggestionID },
                { $addToSet: { lovers: userID } }
            );
            await suggestionUserAddLover.exec();

            const suggestionUserSearchBeloved = matchModel.findOne({
                user: suggestionID
            });
            const suggestionUserBeloveds = await suggestionUserSearchBeloved.exec();

            if (suggestionUserBeloveds) {
                if (suggestionUserBeloveds.beloved.includes(userID)) {
                    const userAddMatch = matchModel.findOneAndUpdate(
                        { user: userID },
                        { $addToSet: { matches: suggestionID } }
                    );
                    await userAddMatch.exec();
                    const suggestionUserAddMatch = matchModel.findOneAndUpdate(
                        { user: suggestionID },
                        { $addToSet: { matches: userID } }
                    );
                    await suggestionUserAddMatch.exec();
                    return "Added beloved and found a new match";
                }
            }
            return "Added beloved";
        } catch (error) {
            throw error;
        }
    },
    searchBeloveds: async user => {
        try {
            // Implement bidirectional functions call error
            // const userID = await userLib.getId({ username: username });

            const userID = await getIdLocal(user);
            const userMatchesSearched = matchModel
                .findOne({ user: userID })
                .populate({
                    path: "beloved",
                    model: "Users",
                    select: "-_id -name -lastname -email -role -__v"
                });
            const searchBelovedAction = await userMatchesSearched.exec();

            return searchBelovedAction;
        } catch (error) {
            throw error;
        }
    },
    unmatch: async unmatch => {
        try {
            const { username, suggestionUsername } = unmatch;

            // Implement bidirectional functions call error
            // const userID = await userLib.getId({ username: username });
            // const suggestionID = await userLib.getId({
            //     username: suggestionUsername
            // });

            const userID = await getIdLocal({ username: username });
            const suggestionID = await getIdLocal({
                username: suggestionUsername
            });

            const userRemoveBeloved = matchModel.findOneAndUpdate(
                { user: userID },
                { $pull: { beloved: suggestionID } }
            );
            await userRemoveBeloved.exec();

            const suugestionUserDeleteLover = matchModel.findOneAndUpdate(
                { user: suggestionID },
                { $pull: { lovers: userID } }
            );
            await suugestionUserDeleteLover.exec();

            const userDeleteMatch = matchModel.findOneAndUpdate(
                { user: userID },
                { $pull: { matches: suggestionID } }
            );
            await userDeleteMatch.exec();
            const suggestionUserDeleteMatch = matchModel.findOneAndUpdate(
                { user: suggestionID },
                { $pull: { matches: userID } }
            );
            await suggestionUserDeleteMatch.exec();

            return "Delete Match";
        } catch (error) {
            throw error;
        }
    },
    searchMatches: async user => {
        try {
            // Implement bidirectional functions call error
            // const userID = await userLib.getId({ username: username });

            const userID = await getIdLocal(user);
            const userMatchesSearched = matchModel
                .findOne({ user: userID })
                .select({ matches: 1 })
                .populate({
                    path: "matches",
                    model: "Users",
                    select: "-_id -name -lastname -email -role -__v"
                });
            const searchMatchesAction = await userMatchesSearched.exec();

            return searchMatchesAction.matches;
        } catch (error) {
            throw error;
        }
    }
};

const getIdLocal = async search => {
    try {
        if (check.emptyObject(search)) throw "Empty search object";
        if (
            !check.like(search, { username: "baz" }) &&
            !check.like(search, { email: "baz" })
        )
            throw "Invalid search object";

        const userSearched = userModel.find(search);
        const findAction = await userSearched.exec();

        if (findAction.length === 0) return false;
        if (findAction.length > 1)
            throw `User duplicated providing search: ${search}`;

        return findAction[0]._id;
    } catch (error) {
        throw error;
    }
};

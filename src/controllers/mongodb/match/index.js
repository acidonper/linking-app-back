const matchAlgorithm = require("./algorithm");
const matchModel = require("../../../models/matches");

// const userLib = require("../user/index");
const userModel = require("../../../models/user");
const check = require("check-types");

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

            // Implement bidirectional functions call error
            // const userID = await userLib.getId({ username: username });
            // const suggestionID = await userLib.getId({
            //     username: suggestionUsername
            // });

            const getId = async search => {
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

            const userID = await getId({ username: username });
            const suggestionID = await getId({
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
            return "Added beloved";
        } catch (error) {
            throw error;
        }
    },
    searchBeloveds: async user => {
        try {
            // Implement bidirectional functions call error
            // const userID = await userLib.getId({ username: username });

            const getId = async search => {
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

            const userID = await getId(user);
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

            const getId = async search => {
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

            const userID = await getId({ username: username });
            const suggestionID = await getId({
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

            const getId = async search => {
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

            const userID = await getId(user);
            const userMatchessSearched = matchModel
                .findOne({ user: userID })
                .populate({
                    path: "matches",
                    model: "Users",
                    select: "-_id -name -lastname -email -role -__v"
                });
            const searchMatchesAction = await userMatchessSearched.exec();

            return searchMatchesAction;
        } catch (error) {
            throw error;
        }
    }
};

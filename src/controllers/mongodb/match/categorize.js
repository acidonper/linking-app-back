module.exports = (information, preferences) => {
    let category = "";

    if (roles.isLearnedPerson(information, preferences))
        category = "learnedPerson";
    if (roles.isSportPerson(information, preferences)) category = "sportPerson";
    if (roles.isActivePerson(information, preferences))
        category = "activePerson";
    if (roles.isLazyPerson(information, preferences)) category = "lazyPerson";
    if (category === "") category = "uncategorized";

    return category;
};

const roles = {
    isLearnedPerson: (info, pref) => {
        if (
            (info.education === "highSchool" ||
                info.education === "university") &&
            (info.physicalCondition === "thin" ||
                info.physicalCondition === "curvy") &&
            (info.activity === "homeLover" || info.activity === "active") &&
            (info.lifeStyle === "working" || info.lifeStyle === "studying") &&
            (pref.culturalInterest === "medium" ||
                pref.culturalInterest === "high") &&
            (pref.sportCadence === "low" || pref.sportCadence === "medium") &&
            (pref.travelCadence === "medium" || pref.travelCadence === "high")
        ) {
            return true;
        } else {
            return false;
        }
    },
    isSportPerson: (info, pref) => {
        if (
            (info.education === "highSchool" ||
                info.education === "elementary") &&
            (info.physicalCondition === "thin" ||
                info.physicalCondition === "fitness") &&
            (info.activity === "homeLover" ||
                info.activity === "active" ||
                info.activity === "energetic") &&
            (info.lifeStyle === "working" ||
                info.lifeStyle === "studying" ||
                info.lifeStyle === "enjoying") &&
            (pref.culturalInterest === "low" ||
                pref.culturalInterest === "medium") &&
            pref.sportCadence === "high" &&
            (pref.travelCadence === "low" || pref.travelCadence === "medium")
        ) {
            return true;
        } else {
            return false;
        }
    },
    isActivePerson: (info, pref) => {
        if (
            (info.education === "highSchool" ||
                info.education === "university") &&
            (info.physicalCondition === "thin" ||
                info.physicalCondition === "fitness") &&
            (info.activity === "active" || info.activity === "energetic") &&
            (info.lifeStyle === "working" ||
                info.lifeStyle === "studying" ||
                info.lifeStyle === "enjoying") &&
            (pref.culturalInterest === "medium" ||
                pref.culturalInterest === "high") &&
            (pref.sportCadence === "low" || pref.sportCadence === "medium") &&
            (pref.travelCadence === "medium" || pref.travelCadence === "high")
        ) {
            return true;
        } else {
            return false;
        }
    },
    isLazyPerson: (info, pref) => {
        if (
            (info.education === "elementary" ||
                info.education === "highSchool") &&
            (info.physicalCondition === "thin" ||
                info.physicalCondition === "curvy") &&
            info.activity === "homeLover" &&
            (info.lifeStyle === "working" || info.lifeStyle === "enjoying") &&
            pref.culturalInterest === "low" &&
            pref.sportCadence === "low" &&
            (pref.travelCadence === "low" || pref.travelCadence === "medium")
        ) {
            return true;
        } else {
            return false;
        }
    }
};

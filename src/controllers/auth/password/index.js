const bcrypt = require("bcrypt");
var check = require("check-types");

module.exports = {
    encrypt: pass => {
        if (check.emptyString(pass)) throw "Empty password provided";
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPass = bcrypt.hashSync(pass, salt);
        return hashPass;
    },
    compare: (passDB, passTry) => {
        if (!bcrypt.compareSync(passTry, passDB)) return false;
        return true;
    }
};

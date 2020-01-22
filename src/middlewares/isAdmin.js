const authLib = require("../controllers/auth/index");

module.exports = async username => {
    try {
        const search = { username: username };
        const user = await authLib.find(search);
        if (user.role === "admin") return true;
        return false;
    } catch (error) {
        throw error;
    }
};

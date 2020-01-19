const userLib = require("../../user/index");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

module.exports = new JwtStrategy(opts, async (tokenPayload, next) => {
    console.log(
        `JSON Web Token Strategy. Information -> token ${tokenPayload}`
    );
    try {
        const user = await userLib.find({ _id: tokenPayload.sub });

        if (!user) next(null, false, { message: "Invalid token" });

        next(null, user);
    } catch (error) {
        next(error);
    }
});

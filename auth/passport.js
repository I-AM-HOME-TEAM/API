const passport = require("passport");
const passportJwt = require("passport-jwt");
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const User = require("../models/user");
const GoogleStrategy = require("passport-google-oauth20")

passport.use(
    new StrategyJwt({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    },
    function (jwtPayload, done) {
        return User.findOne({ where: { id: jwtPayload.id } })
            .then((user) => {
                return done(null, user);
            })
            .catch((err) => {
                return done(err);
            });
    }
    )
);

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/api/v1/google/callback"
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const { id, displayName, emails } = profile;

                // Check if the user already exists in the database
                const [user, created] = await User.findOrCreate({
                    where: { google_id: id },
                    defaults: {
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        google_id: profile.id,
                        google_token: accessToken,
                    },
                });

                if (!created) {
                    return done(null, user);
                }

                user.is_verified = 1;
                await user.save();

                return done(null, user);
            } catch (error) {
                console.error('Error saving Google user:', error);
                return done(error, null);
            }
        }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");

const User = require("../models/User");

//put user infomation inside cookie
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//find user ID in cookie
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy(
        {
            //public
            clientID: process.env.googleClientID,
            clientSecret: process.env.googleClientSecret,
            //after user have permission, send user back to this route, this must be match the setting Authorised redirect URIs on gg
            callbackURL: "/auth/google/callback",
            //tell google to trust server proxy
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {
            //accessToken: provide right to interact with customer data
            //refreshToken: get new access token
            //profile: hold all user information
            //done: finish authentication

            //check if user already sign up or not
            const foundUser = await User.findOne({ googleId: profile.id });

            if (foundUser) {
                done(null, foundUser);
            } else {
                const user = await new User({ googleId: profile.id }).save();
                done(null, user);
            }
        }
    )
);

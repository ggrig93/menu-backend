import passport from 'passport';
import {Strategy as JWTstrategy, ExtractJwt} from 'passport-jwt';
const { jwtSecret } = require('../../config');
import prisma from "../prisma";
// We use this to extract the JWT sent by the user

// This verifies that the token sent by the user is valid
passport.use(new JWTstrategy({
    // secret we used to sign our JWT
    secretOrKey: jwtSecret,
    // we expect the user to send the token as a query parameter with the name 'secret_token'
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, async (token, done) => {
    try {
        // Get user by id
        const user =  await prisma.user.findUnique({
            where: { id: String(token.user.id) }
        })

        // Pass the user details to the next middleware
        return done(null, user);
    } catch (error) {
        done(error);
    }
}));

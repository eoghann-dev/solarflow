import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import {
    findUserById,
    findUserByUsername,
    getSafeUser,
    verifyPassword,
} from "./auth.service.js";

export function configurePassport() {
    passport.use(
        new LocalStrategy(async (username, password, done) => {
            try {
                const user = await findUserByUsername(username);

                if (!user) {
                    return done(null, false);
                }

                const isValid = await verifyPassword(password, user.passwordHash);

                if (!isValid) {
                    return done(null, false);
                }

                return done(null, getSafeUser(user));
            } catch (error) {
                return done(error);
            }
        }),
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await findUserById(id);
            done(null, user ? getSafeUser(user) : false);
        } catch (error) {
            done(error);
        }
    });
}

export { passport };
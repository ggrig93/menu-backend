import './auth';
import passport from 'passport';
import { AppError } from '../helpers/error';

/**
 * @description User JWT Authentication
 *
 * @param req
 * @param res
 * @param next
 */
export const requireAuth = (req, res, next) => {
    passport.authenticate('jwt', {session : false}, (err, user) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            throw new AppError('401', 'User is not authenticated.');
        }

        req.user = user;
        next();
    })(req, res, next);
};

module.exports = {
    requireAuth
};

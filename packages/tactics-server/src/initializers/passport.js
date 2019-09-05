import passportJWT from 'passport-jwt';
import LocalStrategy from 'passport-local';
import passport from 'passport';
import logger from '../services/loggerService';
import models from '../models';
import config from '../config';

const JWTStrategy = passportJWT.Strategy;

export default function(app) {
    const localOpts = {
        usernameField: 'email',
        passwordField: 'password'
    };

    const JWTOpts = {
        jwtFromRequest: req => req.cookies['jwt'] || null,
        secretOrKey: config.SESSION.SECRET
    };

    const localHandler = async (email, password, done) => {
        try {
            const user = await models.user.findOne({ email });

            if (!user || !(await user.comparePassword(password))) {
                logger.error('invalid credentials');
                return done(null, false, { message: 'InvalidLogin' });
            }
            
            return done(null, user.toJSON());
        } catch (err) {
            logger.error(err);
            return done(null, false, { message: 'InvalidLogin' });
        }
    };

    const JWTHandler = async (payload, done) => {
        try {
            const user = await models.user.findOne({ id: payload.sub });

            return done(null, user.toJSON());
        } catch (err) {
            logger.error(err);
            return done(err);
        }
    };

    passport.use('local', new LocalStrategy(localOpts, localHandler));
    passport.use('jwt', new JWTStrategy(JWTOpts, JWTHandler));

    app.use(passport.initialize());
}
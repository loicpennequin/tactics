import passport from 'passport';
import jwt from 'jsonwebtoken';
import errorFactory from '../factories/errorFactory';
import serviceFactory from '../factories/serviceFactory';
import config from '../config';
import models from '../models';

class AuthService {
    _generateJWT(user) {
        const userData = {
            sub: user.id,
            auth_time: new Date().getTime()
        };
        return jwt.sign(userData, config.SESSION.SECRET, {
            expiresIn: config.JWT.MAXAGE,
            issuer: config.JWT.ISSUER
        });
    }

    async _generateRefreshTokenAndUpdateUser(user) {
        const token = jwt.sign({}, config.REFRESH_TOKEN.SECRET, {
            expiresIn: Date.now() + config.REFRESH_TOKEN.MAXAGE
        });
        await models.user.update({ refresh_token: token }, { id: user.id });
        return token;
    }

    _checkTokenExpiration(token) {
        const { exp } = jwt.verify(token, config.REFRESH_TOKEN.SECRET);

        if (Date.now() > exp) {
            throw errorFactory.tokenExpired();
        }
    }

    _onJWTAuthenticateFailed(res, err) {
        const { httpError, ...error } = errorFactory.unauthorized(
            'Authentication failed.',
            err
        );
        return res.status(httpError).json({ error: true, ...error });
    }

    async _getUserFromRefreshToken(req) {
        if (req.cookies?.refresh_token) {
            const user = await models.user.findOne({
                refresh_token: req.cookies.refresh_token
            });
            this._checkTokenExpiration(req.cookies.refresh_token);
            return user;
        }
    }

    async _setCookies(res, user) {
        res.cookie('jwt', this._generateJWT(user), {
            path: config.COOKIE.PATH,
            httpOnly: config.COOKIE.HTTPONLY,
            secure: config.COOKIE.SECURE,
            sameSite: config.COOKIE.SAMESITE,
            maxAge: cfg.COOKIE.MAXAGE,
            secret: config.SESSION.SECRET
        });
        res.cookie(
            'refresh_token',
            await this._generateRefreshTokenAndUpdateUser(user),
            {
                path: config.REFRESH_TOKEN.PATH,
                httpOnly: config.REFRESH_TOKEN.HTTPONLY,
                secure: config.REFRESH_TOKEN.SECURE,
                sameSite: config.REFRESH_TOKEN.SAMESITE,
                secret: config.REFRESH_TOKEN.SECRET,
                maxAge: Date.now() + config.REFRESH_TOKEN.MAXAGE
            }
        );
    }

    async ensureAuthenticated(req, res) {
        passport.authenticate('jwt', { session: false }, async (err, user) => {
            try {
                if (err) throw errorFactory.internalServerError(undefined, err);
                if (!user) user = await this._getUserFromRefreshToken(req);
            } catch (err) {
                return this._onJWTAuthenticateFailed(res, err);
            }

            req.login(user, { session: false }, async err => {
                if (err) {
                    // prettier-ignore
                    const {httpError,...error} = errorFactory.internalServerError();

                    // prettier-ignore
                    res.status(httpError || 500).json({error: true,...error});
                }
            });
        })(req, res);
    }

    async login(req, res) {
        return new Promise((resolve, reject) => {
            passport.authenticate('local', { session: false }, (err, user) => {
                if (err)
                    reject(errorFactory.internalServerError(undefined, err));
                else if (!user)
                    reject(errorFactory.unauthorized('Invalid credentials'));

                req.login(user, { session: false }, async err => {
                    if (err) {
                        reject(
                            errorFactory.internalServerError(undefined, err)
                        );
                    }

                    await this._setCookies(res, user);
                    resolve({ userId: user.id });
                });
            })(req, res);
        });
    }

    async logout(req, res) {
        req.logout();
        res.clearCookie('jwt');
        return {
            data: { authenticated: false }
        };
    }

    async checkResetPasswordTokenValidity(token) {
        try {
            const user = await models.user.findOne({
                reset_password_token: token
            });

            const { reset_password_token_expire } = user.toJSON();

            if (reset_password_token_expire < Date.now()) {
                throw new Error();
            } else {
                return { message: 'ok' };
            }
        } catch (err) {
            return errorFactory.tokenExpired('Refresh Token expired', err);
        }
    }

    async resetPassword(password, token) {
        const user = await models.user
            .forge({ reset_password_token: token })
            .fetch({ require: true });
        user.set('password', password);
        user.set('reset_password_token', null);
        user.set('reset_password_token_expire', null);
        await user.save();

        return { message: 'ok' };
    }
}

export default serviceFactory('authService', new AuthService());

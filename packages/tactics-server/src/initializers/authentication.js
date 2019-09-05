import passport from 'passport';
import errorService from '../services/errorService';
import authService from '../services/authService';
import ensureAuth from '../middlewares/ensureAuth';
import { paths } from 'tactics-common';


export default function(app) {
    app.use(passport.initialize());
    app.post(paths.LOGIN, errorService.wrap((req, res) => authService.login(req, res)));
    app.get(
        paths.IS_LOGGED_IN,
        ensureAuth,
        errorService.wrap(() => authService.ensureAuthenticated())
    );
    app.get(
        paths.LOGOUT,
        ensureAuth,
        errorService.wrap((req, res) => authService.logout(req, res))
    );
    app.post(
        paths.RESET_PASSWORD,
        errorService.wrap((req, res) => authService.sendResetPasswordEmail(req.body))
    );
    app.put(
        paths.RESET_PASSWORD,
        errorService.wrap((req, res) => authService.resetPassword(req.body, req.query.token))
    );
    app.get(
        paths.RESET_PASSWORD,
        errorService.wrap((req, res) => authService.checkExpireTokenValidity(req.query.token))
    );

}
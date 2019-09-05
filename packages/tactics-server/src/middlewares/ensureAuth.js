import authService from '../services/authService';

export default async function(req, res, next) {
    await authService.ensureAuthenticated(req, res, next);
}

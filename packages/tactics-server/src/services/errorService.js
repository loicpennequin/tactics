import logger from './loggerService';
import { inspect } from 'util';
import errorFactory from '../factories/errorFactory';

class ErrorService {
    constructor() {
        Object.entries(errorFactory).forEach(([key, value]) => {
            this[key] = value;
        });
    }

    _onSuccess(result, req, res) {
        res.status(200).json(result);
    }

    _onError(err, req, res) {
        const { httpError, ...error } = err;
        res.status(httpError || 500).json({
            error: true,
            ...error
        });
    }

    wrap(
        handler,
        successCallback = this._onSuccess,
        errorCallback = this._onError
    ) {
        return async (req, res, next) => {
            try {
                const result = await handler(req, res, next);
                return await successCallback(result, req, res);
            } catch (err) {
                logger.error(inspect(err));
                return await errorCallback(err, req, res);
            }
        };
    }

    async graphQLWrap(handler) {
        return await this.wrap(handler, result => result, err => err)();
    }
}

export default new ErrorService();

import logger from '../Services/loggerService';

export default function(req, res, next) {
    logger.info('=========================');
    logger.info(`API REQUEST - ${req.method} :  ${req.url}`);
    logger.info('=========================');
    next();
}

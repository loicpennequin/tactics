import logger from '../services/loggerService';

const services = {};

const makeServiceHandler = name => ({
    get: function(target, property) {
        if (typeof target[property] === 'function' && !property.startsWith('_')) {
            logger.info(`${name}.${property}`);
        }
        return Reflect.get(...arguments);
    }
});

export default function serviceFactory(name, definition) {
    if (!services[name]) {
        services[name] = new Proxy(
            definition,
            makeServiceHandler(name)
        );
    }
    return services[name];
}
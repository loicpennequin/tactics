import logger from '../services/loggerService';

const makeServiceHandler = name => ({
    get: function(target, property) {
        if (
            typeof target[property] === 'function' &&
            !property.startsWith('_')
        ) {
            logger.info(`${name}.${property}`);
        }
        return Reflect.get(...arguments);
    }
});

export default function serviceFactory(name, definition) {
    return new Proxy(definition, makeServiceHandler(name));
}

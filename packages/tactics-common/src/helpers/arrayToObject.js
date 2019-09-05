import { isFunction } from './isFunction';

export const arrayToObject = (arr, prop = 'id', valueMapper = val => val) =>
    arr.reduce((output, current) => {
        const keyName = isFunction(prop) ? prop(current) : prop;
        return {
            ...output,
            [keyName]: valueMapper(current)
        };
    }, {});

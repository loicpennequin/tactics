import { isObject } from './isObject';

export const isEmptyObject = obj =>
    isObject(obj) && Object.keys(obj).length > 0;
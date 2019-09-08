export function random(min, max) {
    return min + Math.round(Math.random() * max);
}

export function clamp(value, min, max) {
    if (value < min) return min;
    if (value > max) return max;

    return value;
}

export function scaleValue(value, oldMax, newMax) {
    return (value * newMax) / oldMax;
}

export function getPercentage([max, current]) {
    return (current / max) * 100;
}

export const toPixels = number => Math.round(number) + 'px';

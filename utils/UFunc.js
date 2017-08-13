import {map, isEmpty, isNumber, remove, maxBy, flattenDeep} from 'lodash/fp';

const numbersBy = (obj, name) => {
    const fields = Object.entries(obj).map(([key, value]) => isNumber(value) && {key, [name ? key : 'value']: value});
    return remove(i => isEmpty(i), fields);
};

const maxPointBy = (arr, key) => {
    if (isEmpty(arr)) {
        return 0;
    }
    const propKey = key || 'value';
    const maxItem = maxBy(propKey, flattenDeep(map(i => numbersBy(i, key), arr)));

    const a = maxItem[propKey] > 1000 ? 1000 : maxItem[propKey] > 100 ? 100 : maxItem[propKey] > 50 ? 50 : maxItem[propKey] > 10 ? 10 : 1;
    return (~~((maxItem[propKey] + a - 1) / a) * a);
};

const pointBy = (value, max, weight) => ((weight * ((value * 100) / max)) / 100);
const pointZBy = (radius, rad) => (Math.sqrt((2 * radius * radius) - (2 * radius * radius * Math.cos(rad))));
const pointXBy = (radius, rad, calc) => (calc <= 90 ? radius * Math.sin(rad) : radius * Math.sin(((180 - calc) * Math.PI) / 180));
const pointYBy = (z, x) => (Math.sqrt((z * z) - (x * x)));
const calcBy = percentage => ((percentage > 180) ? 360 - percentage : percentage);
const radBy = calc => ((calc * Math.PI) / 180);
const radiusBy = (diameter, depth, index) => {
    const c = (2 * depth) + 1;
    return (((diameter - 1) / 2) / c) * (c - index);
};

const indexBy = (arr, key, target) => {
    for (let i = 0; i < arr.length; i += 1) {
        if (arr[i][key] === target) {
            return i;
        }
    }
    return -1;
};

const itemBy = (arr, key, target) => {
    const index = indexBy(arr, key, target);
    return index !== -1 ? arr[index] : undefined;
};

const depthTree = (data) => {
    if (!data || data.length <= 0) {
        return 0;
    }
    let depth = 0;
    for (let i = 0; i < data.length; i += 1) {
        depth = Math.max(depth, depthTree(data[i].children));
    }
    return 1 + depth;
};

export {
    maxPointBy,
    pointBy,
    pointZBy,
    pointXBy,
    pointYBy,
    calcBy,
    radBy,
    indexBy,
    itemBy,
    depthTree,
    radiusBy,
    numbersBy,
};
export const { toString } = Object.prototype;
export const escapeHtmlRegex = /["&<>]/;
export const each = (obj, cb) => {
    if (obj) {
        if (Array.isArray(obj)) {
            obj.forEach(cb);
        }
        else {
            Object.keys(obj).forEach(key => {
                cb(obj[key], key);
            });
        }
    }
};
export const some = (obj, cb) => {
    if (obj) {
        if (Array.isArray(obj)) {
            return obj.some(cb);
        }
        return Object.keys(obj).some(key => cb(obj[key], key));
    }
    return false;
};
export const every = (obj, cb) => {
    if (obj) {
        if (Array.isArray(obj)) {
            return obj.every(cb);
        }
        return Object.keys(obj).every(key => cb(obj[key], key));
    }
    return true;
};
export const map = (obj, cb) => {
    if (obj) {
        if (Array.isArray(obj)) {
            return obj.map(cb);
        }
        return Object.keys(obj).map(key => cb(obj[key], key));
    }
    return [];
};
export const keyBy = (a, p) => a.reduce((o, v) => {
    o[v[p]] = v;
    return o;
}, {});
export const isEqual = (a, b) => {
    const aType = typeof a;
    const bType = typeof b;
    const aArray = Array.isArray(a);
    const bArray = Array.isArray(b);
    let keys;
    if (aType !== bType) {
        return false;
    }
    switch (typeof a) {
        case 'object':
            if (aArray || bArray) {
                if (aArray && bArray) {
                    return (a.length === b.length &&
                        a.every((aValue, index) => {
                            const bValue = b[index];
                            return isEqual(aValue, bValue);
                        }));
                }
                return false;
            }
            if (a === null || b === null) {
                return a === b;
            }
            // Compare object keys and values
            keys = Object.keys(a);
            if (Object.keys(b).length !== keys.length) {
                return false;
            }
            for (const key of keys) {
                if (!b.hasOwnProperty(key)) {
                    return false;
                }
            }
            return every(a, (aValue, key) => {
                const bValue = b[key];
                return isEqual(aValue, bValue);
            });
        default:
            return a === b;
    }
};
export const escapeHtml = (html) => {
    const regexResult = escapeHtmlRegex.exec(html);
    if (!regexResult)
        return html;
    let result = '';
    let escape = '';
    let lastIndex = 0;
    let i = regexResult.index;
    for (; i < html.length; i++) {
        switch (html.charAt(i)) {
            case '"':
                escape = '&quot;';
                break;
            case '&':
                escape = '&amp;';
                break;
            case '\'':
                escape = '&apos;';
                break;
            case '<':
                escape = '&lt;';
                break;
            case '>':
                escape = '&gt;';
                break;
            default:
                continue;
        }
        if (lastIndex !== i)
            result += html.substring(lastIndex, i);
        lastIndex = i + 1;
        result += escape;
    }
    if (lastIndex !== i)
        return result + html.substring(lastIndex, i);
    return result;
};
export const strcmp = (a, b) => {
    if (a < b)
        return -1;
    if (a > b)
        return 1;
    return 0;
};
export const isUndefined = (val) => {
    return toString.call(val) === '[object Undefined]';
};
export const isObject = (val) => {
    return toString.call(val) === '[object Object]';
};
export const deepMerge = function () {
    const target = arguments[0] || {};
    const { length } = arguments;
    let src, clone, copyIsArray;
    function assignValue(val, key) {
        src = target[key];
        copyIsArray = Array.isArray(val);
        if (isObject(val) || copyIsArray) {
            if (copyIsArray) {
                copyIsArray = false;
                clone = src && Array.isArray(src) ? src : [];
            }
            else {
                clone = src && isObject(src) ? src : {};
            }
            target[key] = deepMerge(clone, val);
        }
        else if (!isUndefined(val)) {
            target[key] = val;
        }
    }
    for (let i = 0; i < length; i++) {
        each(arguments[i], assignValue);
    }
    return target;
};
export default 2;

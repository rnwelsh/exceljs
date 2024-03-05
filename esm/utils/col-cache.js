const addressRegex = /^[A-Z]+\d+$/;
// =================================_========================================
// Column Letter to Number conversion
// const colCache = {
const __cache = {
    dictionary: [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
    ],
    l2nFill: 0,
    l2n: {},
    n2l: [],
    hasdh: {},
}, _level = (n) => {
    if (n <= 26) {
        return 1;
    }
    if (n <= 26 * 26) {
        return 2;
    }
    return 3;
}, _fill = (level) => {
    let c;
    let v;
    let l1;
    let l2;
    let l3;
    let n = 1;
    if (level >= 4) {
        throw new Error('Out of bounds. Excel supports columns from 1 to 16384');
    }
    if (__cache.l2nFill < 1 && level >= 1) {
        while (n <= 26) {
            c = _dictionary[n - 1];
            __cache.n2l[n] = c;
            __cache.l2n[c] = n;
            n++;
        }
        __cache.l2nFill = 1;
    }
    if (__cache.l2nFill < 2 && level >= 2) {
        n = 27;
        while (n <= 26 + (26 * 26)) {
            v = n - (26 + 1);
            l1 = v % 26;
            l2 = Math.floor(v / 26);
            c = _dictionary[l2] + _dictionary[l1];
            __cache.n2l[n] = c;
            __cache.l2n[c] = n;
            n++;
        }
        __cache.l2nFill = 2;
    }
    if (__cache.l2nFill < 3 && level >= 3) {
        n = 26 + (26 * 26) + 1;
        while (n <= 16384) {
            v = n - ((26 * 26) + 26 + 1);
            l1 = v % 26;
            l2 = Math.floor(v / 26) % 26;
            l3 = Math.floor(v / (26 * 26));
            c = _dictionary[l3] + _dictionary[l2] + _dictionary[l1];
            __cache.n2l[n] = c;
            __cache.l2n[c] = n;
            n++;
        }
        __cache.l2nFill = 3;
    }
};
export const l2n = (l) => {
    if (!__cache.l2n[l]) {
        _fill(l.length);
    }
    if (!__cache.l2n[l]) {
        throw new Error(`Out of bounds. Invalid column letter: ${l}`);
    }
    return __cache.l2n[l];
}, n2l = (n) => {
    if (n < 1 || n > 16384) {
        throw new Error(`${n} is out of bounds. Excel supports columns from 1 to 16384`);
    }
    if (!__cache.n2l[n]) {
        _fill(_level(n));
    }
    return __cache.n2l[n];
}, 
// check if value looks like an address
validateAddress = (value) => {
    if (!addressRegex.test(value)) {
        throw new Error(`Invalid Address: ${value}`);
    }
    return true;
}, 
// convert address string into structure
decodeAddress = (value) => {
    const valueLength = value.length;
    const addr = valueLength < 5 && __cache.hash[value];
    if (addr) {
        return addr;
    }
    let hasCol = false;
    let col = '';
    let colNumber = 0;
    let hasRow = false;
    let row = '';
    let rowNumber = 0;
    for (let i = 0, char; i < valueLength; i++) {
        char = value.charCodeAt(i);
        // col should before row
        if (!hasRow && char >= 65 && char <= 90) {
            // 65 = 'A'.charCodeAt(0)
            // 90 = 'Z'.charCodeAt(0)
            hasCol = true;
            col += value[i];
            // colNumber starts from 1
            colNumber = (colNumber * 26) + char - 64;
        }
        else if (char >= 48 && char <= 57) {
            // 48 = '0'.charCodeAt(0)
            // 57 = '9'.charCodeAt(0)
            hasRow = true;
            row += value[i];
            // rowNumber starts from 0
            rowNumber = (rowNumber * 10) + char - 48;
        }
        else if (hasRow && hasCol && char !== 36) {
            // 36 = '$'.charCodeAt(0)
            break;
        }
    }
    if (!hasCol) {
        colNumber = undefined;
    }
    else if (colNumber > 16384) {
        throw new Error(`Out of bounds. Invalid column letter: ${col}`);
    }
    if (!hasRow) {
        rowNumber = undefined;
    }
    // in case $row$col
    value = col + row;
    const address = {
        address: value,
        col: colNumber,
        row: rowNumber,
        $col$row: `$${col}$${row}`,
    };
    // mem fix - cache only the tl 100x100 square
    if (colNumber <= 100 && rowNumber <= 100) {
        __cache.hash[value] = address;
        __cache.hash[address.$col$row] = address;
    }
    return address;
}, 
// convert r,c into structure (if only 1 arg, assume r is address string)
getAddress = (r, c) => {
    if (c) {
        const address = n2l(c) + r;
        return decodeAddress(address);
    }
    return decodeAddress(r);
}, 
// convert [address], [tl:br] into address structures
decode = (value) => {
    const parts = value.split(':');
    if (parts.length === 2) {
        const tl = decodeAddress(parts[0]);
        const br = decodeAddress(parts[1]);
        const result = {
            top: Math.min(tl.row, br.row),
            left: Math.min(tl.col, br.col),
            bottom: Math.max(tl.row, br.row),
            right: Math.max(tl.col, br.col),
        };
        // reconstruct tl, br and dimensions
        result.tl = n2l(result.left) + result.top;
        result.br = n2l(result.right) + result.bottom;
        result.dimensions = `${result.tl}:${result.br}`;
        return result;
    }
    return decodeAddress(value);
}, 
// convert [sheetName!][$]col[$]row[[$]col[$]row] into address or range structures
decodeEx = (value) => {
    const groups = value.match(/(?:(?:(?:'((?:[^']|'')*)')|([^'^ !]*))!)?(.*)/);
    const sheetName = groups[1] || groups[2]; // Qouted and unqouted groups
    const reference = groups[3]; // Remaining address
    const parts = reference.split(':');
    if (parts.length > 1) {
        let tl = decodeAddress(parts[0]);
        let br = decodeAddress(parts[1]);
        const top = Math.min(tl.row, br.row);
        const left = Math.min(tl.col, br.col);
        const bottom = Math.max(tl.row, br.row);
        const right = Math.max(tl.col, br.col);
        tl = n2l(left) + top;
        br = n2l(right) + bottom;
        return {
            top,
            left,
            bottom,
            right,
            sheetName,
            tl: { address: tl, col: left, row: top, $col$row: `$${n2l(left)}$${top}`, sheetName },
            br: {
                address: br,
                col: right,
                row: bottom,
                $col$row: `$${n2l(right)}$${bottom}`,
                sheetName,
            },
            dimensions: `${tl}:${br}`,
        };
    }
    if (reference.startsWith('#')) {
        return sheetName ? { sheetName, error: reference } : { error: reference };
    }
    const address = decodeAddress(reference);
    return sheetName ? { sheetName, ...address } : address;
}, 
// convert row,col into address string
encodeAddress = (row, col) => {
    return n2l(col) + row;
}, 
// convert row,col into string address or t,l,b,r into range
encode = () => {
    switch (arguments.length) {
        case 2:
            return encodeAddress(arguments[0], arguments[1]);
        case 4:
            return `${encodeAddress(arguments[0], arguments[1])}:${encodeAddress(arguments[2], arguments[3])}`;
        default:
            throw new Error('Can only encode with 2 or 4 arguments');
    }
}, 
// return true if address is contained within range
inRange = (range, address) => {
    const [left, top, , right, bottom] = range;
    const [col, row] = address;
    return col >= left && col <= right && row >= top && row <= bottom;
};
// };
export default {
    l2n,
    n2l,
    validateAddress,
    decodeAddress,
    getAddress,
    decode,
    decodeEx,
    encodeAddress,
    encode,
    inRange
};

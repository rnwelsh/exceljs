var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// esm/utils/under-dash.js
var toString, escapeHtmlRegex, each, some2, every, map, keyBy, isEqual, escapeHtml, strcmp, isUndefined, isObject, deepMerge;
var init_under_dash = __esm({
  "esm/utils/under-dash.js"() {
    ({ toString } = Object.prototype);
    escapeHtmlRegex = /["&<>]/;
    each = (obj, cb) => {
      if (obj) {
        if (Array.isArray(obj)) {
          obj.forEach(cb);
        } else {
          Object.keys(obj).forEach((key) => {
            cb(obj[key], key);
          });
        }
      }
    };
    some2 = (obj, cb) => {
      if (obj) {
        if (Array.isArray(obj)) {
          return obj.some(cb);
        }
        return Object.keys(obj).some((key) => cb(obj[key], key));
      }
      return false;
    };
    every = (obj, cb) => {
      if (obj) {
        if (Array.isArray(obj)) {
          return obj.every(cb);
        }
        return Object.keys(obj).every((key) => cb(obj[key], key));
      }
      return true;
    };
    map = (obj, cb) => {
      if (obj) {
        if (Array.isArray(obj)) {
          return obj.map(cb);
        }
        return Object.keys(obj).map((key) => cb(obj[key], key));
      }
      return [];
    };
    keyBy = (a, p) => a.reduce((o, v) => {
      o[v[p]] = v;
      return o;
    }, {});
    isEqual = (a, b) => {
      const aType = typeof a;
      const bType = typeof b;
      const aArray = Array.isArray(a);
      const bArray = Array.isArray(b);
      let keys;
      if (aType !== bType) {
        return false;
      }
      switch (typeof a) {
        case "object":
          if (aArray || bArray) {
            if (aArray && bArray) {
              return a.length === b.length && a.every((aValue, index) => {
                const bValue = b[index];
                return isEqual(aValue, bValue);
              });
            }
            return false;
          }
          if (a === null || b === null) {
            return a === b;
          }
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
    escapeHtml = (html) => {
      const regexResult = escapeHtmlRegex.exec(html);
      if (!regexResult)
        return html;
      let result = "";
      let escape = "";
      let lastIndex = 0;
      let i = regexResult.index;
      for (; i < html.length; i++) {
        switch (html.charAt(i)) {
          case '"':
            escape = "&quot;";
            break;
          case "&":
            escape = "&amp;";
            break;
          case "'":
            escape = "&apos;";
            break;
          case "<":
            escape = "&lt;";
            break;
          case ">":
            escape = "&gt;";
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
    strcmp = (a, b) => {
      if (a < b)
        return -1;
      if (a > b)
        return 1;
      return 0;
    };
    isUndefined = (val) => {
      return toString.call(val) === "[object Undefined]";
    };
    isObject = (val) => {
      return toString.call(val) === "[object Object]";
    };
    deepMerge = function() {
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
          } else {
            clone = src && isObject(src) ? src : {};
          }
          target[key] = deepMerge(clone, val);
        } else if (!isUndefined(val)) {
          target[key] = val;
        }
      }
      for (let i = 0; i < length; i++) {
        each(arguments[i], assignValue);
      }
      return target;
    };
  }
});

// esm/utils/col-cache.js
var addressRegex, __cache, _level, _fill, l2n, n2l2, validateAddress, decodeAddress, getAddress, decode, decodeEx, encodeAddress, encode;
var init_col_cache = __esm({
  "esm/utils/col-cache.js"() {
    addressRegex = /^[A-Z]+\d+$/;
    __cache = {
      dictionary: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ],
      l2nFill: 0,
      l2n: {},
      n2l: [],
      hasdh: {}
    };
    _level = (n) => {
      if (n <= 26) {
        return 1;
      }
      if (n <= 26 * 26) {
        return 2;
      }
      return 3;
    };
    _fill = (level) => {
      let c2;
      let v;
      let l1;
      let l2;
      let l3;
      let n = 1;
      if (level >= 4) {
        throw new Error("Out of bounds. Excel supports columns from 1 to 16384");
      }
      if (__cache.l2nFill < 1 && level >= 1) {
        while (n <= 26) {
          c2 = _dictionary[n - 1];
          __cache.n2l[n] = c2;
          __cache.l2n[c2] = n;
          n++;
        }
        __cache.l2nFill = 1;
      }
      if (__cache.l2nFill < 2 && level >= 2) {
        n = 27;
        while (n <= 26 + 26 * 26) {
          v = n - (26 + 1);
          l1 = v % 26;
          l2 = Math.floor(v / 26);
          c2 = _dictionary[l2] + _dictionary[l1];
          __cache.n2l[n] = c2;
          __cache.l2n[c2] = n;
          n++;
        }
        __cache.l2nFill = 2;
      }
      if (__cache.l2nFill < 3 && level >= 3) {
        n = 26 + 26 * 26 + 1;
        while (n <= 16384) {
          v = n - (26 * 26 + 26 + 1);
          l1 = v % 26;
          l2 = Math.floor(v / 26) % 26;
          l3 = Math.floor(v / (26 * 26));
          c2 = _dictionary[l3] + _dictionary[l2] + _dictionary[l1];
          __cache.n2l[n] = c2;
          __cache.l2n[c2] = n;
          n++;
        }
        __cache.l2nFill = 3;
      }
    };
    l2n = (l) => {
      if (!__cache.l2n[l]) {
        _fill(l.length);
      }
      if (!__cache.l2n[l]) {
        throw new Error(`Out of bounds. Invalid column letter: ${l}`);
      }
      return __cache.l2n[l];
    };
    n2l2 = (n) => {
      if (n < 1 || n > 16384) {
        throw new Error(`${n} is out of bounds. Excel supports columns from 1 to 16384`);
      }
      if (!__cache.n2l[n]) {
        _fill(_level(n));
      }
      return __cache.n2l[n];
    };
    validateAddress = (value) => {
      if (!addressRegex.test(value)) {
        throw new Error(`Invalid Address: ${value}`);
      }
      return true;
    };
    decodeAddress = (value) => {
      const valueLength = value.length;
      const addr = valueLength < 5 && __cache.hash[value];
      if (addr) {
        return addr;
      }
      let hasCol = false;
      let col = "";
      let colNumber = 0;
      let hasRow = false;
      let row = "";
      let rowNumber = 0;
      for (let i = 0, char; i < valueLength; i++) {
        char = value.charCodeAt(i);
        if (!hasRow && char >= 65 && char <= 90) {
          hasCol = true;
          col += value[i];
          colNumber = colNumber * 26 + char - 64;
        } else if (char >= 48 && char <= 57) {
          hasRow = true;
          row += value[i];
          rowNumber = rowNumber * 10 + char - 48;
        } else if (hasRow && hasCol && char !== 36) {
          break;
        }
      }
      if (!hasCol) {
        colNumber = void 0;
      } else if (colNumber > 16384) {
        throw new Error(`Out of bounds. Invalid column letter: ${col}`);
      }
      if (!hasRow) {
        rowNumber = void 0;
      }
      value = col + row;
      const address = {
        address: value,
        col: colNumber,
        row: rowNumber,
        $col$row: `$${col}$${row}`
      };
      if (colNumber <= 100 && rowNumber <= 100) {
        __cache.hash[value] = address;
        __cache.hash[address.$col$row] = address;
      }
      return address;
    };
    getAddress = (r, c2) => {
      if (c2) {
        const address = n2l2(c2) + r;
        return decodeAddress(address);
      }
      return decodeAddress(r);
    };
    decode = (value) => {
      const parts = value.split(":");
      if (parts.length === 2) {
        const tl = decodeAddress(parts[0]);
        const br = decodeAddress(parts[1]);
        const result = {
          top: Math.min(tl.row, br.row),
          left: Math.min(tl.col, br.col),
          bottom: Math.max(tl.row, br.row),
          right: Math.max(tl.col, br.col)
        };
        result.tl = n2l2(result.left) + result.top;
        result.br = n2l2(result.right) + result.bottom;
        result.dimensions = `${result.tl}:${result.br}`;
        return result;
      }
      return decodeAddress(value);
    };
    decodeEx = (value) => {
      const groups = value.match(/(?:(?:(?:'((?:[^']|'')*)')|([^'^ !]*))!)?(.*)/);
      const sheetName = groups[1] || groups[2];
      const reference = groups[3];
      const parts = reference.split(":");
      if (parts.length > 1) {
        let tl = decodeAddress(parts[0]);
        let br = decodeAddress(parts[1]);
        const top = Math.min(tl.row, br.row);
        const left = Math.min(tl.col, br.col);
        const bottom = Math.max(tl.row, br.row);
        const right = Math.max(tl.col, br.col);
        tl = n2l2(left) + top;
        br = n2l2(right) + bottom;
        return {
          top,
          left,
          bottom,
          right,
          sheetName,
          tl: { address: tl, col: left, row: top, $col$row: `$${n2l2(left)}$${top}`, sheetName },
          br: {
            address: br,
            col: right,
            row: bottom,
            $col$row: `$${n2l2(right)}$${bottom}`,
            sheetName
          },
          dimensions: `${tl}:${br}`
        };
      }
      if (reference.startsWith("#")) {
        return sheetName ? { sheetName, error: reference } : { error: reference };
      }
      const address = decodeAddress(reference);
      return sheetName ? { sheetName, ...address } : address;
    };
    encodeAddress = (row, col) => {
      return n2l2(col) + row;
    };
    encode = () => {
      switch (arguments.length) {
        case 2:
          return encodeAddress(arguments[0], arguments[1]);
        case 4:
          return `${encodeAddress(arguments[0], arguments[1])}:${encodeAddress(arguments[2], arguments[3])}`;
        default:
          throw new Error("Can only encode with 2 or 4 arguments");
      }
    };
  }
});

// esm/utils/utils.js
var xmlDecodeRegex, dateToExcel, excelToDate, xmlEncode, xmlDecode, validInt, isDateFmt, parseBoolean, range, toSortedArray, objectFromProps;
var init_utils = __esm({
  "esm/utils/utils.js"() {
    xmlDecodeRegex = /[<>&'"\x7F\x00-\x08\x0B-\x0C\x0E-\x1F]/;
    dateToExcel = (d, date1904) => {
      return 25569 + d.getTime() / (24 * 3600 * 1e3) - (date1904 ? 1462 : 0);
    };
    excelToDate = (v, date1904) => {
      const millisecondSinceEpoch = Math.round((v - 25569 + (date1904 ? 1462 : 0)) * 24 * 3600 * 1e3);
      return new Date(millisecondSinceEpoch);
    };
    xmlEncode = (text) => {
      const regexResult = xmlDecodeRegex.exec(text);
      if (!regexResult)
        return text;
      let result = "";
      let escape = "";
      let lastIndex = 0;
      let i = regexResult.index;
      for (; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        switch (charCode) {
          case 34:
            escape = "&quot;";
            break;
          case 38:
            escape = "&amp;";
            break;
          case 39:
            escape = "&apos;";
            break;
          case 60:
            escape = "&lt;";
            break;
          case 62:
            escape = "&gt;";
            break;
          case 127:
            escape = "";
            break;
          default: {
            if (charCode <= 31 && (charCode <= 8 || charCode >= 11 && charCode !== 13)) {
              escape = "";
              break;
            }
            continue;
          }
        }
        if (lastIndex !== i)
          result += text.substring(lastIndex, i);
        lastIndex = i + 1;
        if (escape)
          result += escape;
      }
      if (lastIndex !== i)
        return result + text.substring(lastIndex, i);
      return result;
    };
    xmlDecode = (text) => {
      return text.replace(/&([a-z]*);/g, (c2) => {
        switch (c2) {
          case "&lt;":
            return "<";
          case "&gt;":
            return ">";
          case "&amp;":
            return "&";
          case "&apos;":
            return "'";
          case "&quot;":
            return '"';
          default:
            return c2;
        }
      });
    };
    validInt = (value) => {
      const i = parseInt(value, 10);
      return !Number.isNaN(i) ? i : 0;
    };
    isDateFmt = (fmt) => {
      if (!fmt) {
        return false;
      }
      fmt = fmt.replace(/\[[^\]]*]/g, "");
      fmt = fmt.replace(/"[^"]*"/g, "");
      const result = fmt.match(/[ymdhMsb]+/) !== null;
      return result;
    };
    parseBoolean = (value) => {
      return value === true || value === "true" || value === 1 || value === "1";
    };
    range = function* (start, stop, step = 1) {
      const compareOrder = step > 0 ? (a, b) => a < b : (a, b) => a > b;
      for (let value = start; compareOrder(value, stop); value += step) {
        yield value;
      }
    };
    toSortedArray = (values) => {
      const result = Array.from(values);
      if (result.every((item) => Number.isFinite(item))) {
        const compareNumbers = (a, b) => a - b;
        return result.sort(compareNumbers);
      }
      return result.sort();
    };
    objectFromProps = (props, value = null) => {
      return props.reduce((result, property) => {
        result[property] = value;
        return result;
      }, {});
    };
  }
});

// esm/utils/xml-stream.js
function pushAttribute(xml, name, value) {
  xml.push(` ${name}="${xmlEncode(value.toString())}"`);
}
function pushAttributes(xml, attributes) {
  if (attributes) {
    const tmp = [];
    each(attributes, (value, name) => {
      if (value !== void 0) {
        pushAttribute(tmp, name, value);
      }
    });
    xml.push(tmp.join(""));
  }
}
var OPEN_ANGLE, CLOSE_ANGLE, OPEN_ANGLE_SLASH, CLOSE_SLASH_ANGLE, XmlStream, xml_stream_default;
var init_xml_stream = __esm({
  "esm/utils/xml-stream.js"() {
    init_under_dash();
    init_utils();
    OPEN_ANGLE = "<";
    CLOSE_ANGLE = ">";
    OPEN_ANGLE_SLASH = "</";
    CLOSE_SLASH_ANGLE = "/>";
    XmlStream = class {
      constructor() {
        this._xml = [];
        this._stack = [];
        this._rollbacks = [];
      }
      get tos() {
        return this._stack.length ? this._stack[this._stack.length - 1] : void 0;
      }
      get cursor() {
        return this._xml.length;
      }
      openXml(docAttributes) {
        const xml = this._xml;
        xml.push("<?xml");
        pushAttributes(xml, docAttributes);
        xml.push("?>\n");
      }
      openNode(name, attributes) {
        const parent = this.tos;
        const xml = this._xml;
        if (parent && this.open) {
          xml.push(CLOSE_ANGLE);
        }
        this._stack.push(name);
        xml.push(OPEN_ANGLE);
        xml.push(name);
        pushAttributes(xml, attributes);
        this.leaf = true;
        this.open = true;
      }
      addAttribute(name, value) {
        if (!this.open) {
          throw new Error("Cannot write attributes to node if it is not open");
        }
        if (value !== void 0) {
          pushAttribute(this._xml, name, value);
        }
      }
      addAttributes(attrs) {
        if (!this.open) {
          throw new Error("Cannot write attributes to node if it is not open");
        }
        pushAttributes(this._xml, attrs);
      }
      writeText(text) {
        const xml = this._xml;
        if (this.open) {
          xml.push(CLOSE_ANGLE);
          this.open = false;
        }
        this.leaf = false;
        xml.push(xmlEncode(text.toString()));
      }
      writeXml(xml) {
        if (this.open) {
          this._xml.push(CLOSE_ANGLE);
          this.open = false;
        }
        this.leaf = false;
        this._xml.push(xml);
      }
      closeNode() {
        const node = this._stack.pop();
        const xml = this._xml;
        if (this.leaf) {
          xml.push(CLOSE_SLASH_ANGLE);
        } else {
          xml.push(OPEN_ANGLE_SLASH);
          xml.push(node);
          xml.push(CLOSE_ANGLE);
        }
        this.open = false;
        this.leaf = false;
      }
      leafNode(name, attributes, text) {
        this.openNode(name, attributes);
        if (text !== void 0) {
          this.writeText(text);
        }
        this.closeNode();
      }
      closeAll() {
        while (this._stack.length) {
          this.closeNode();
        }
      }
      addRollback() {
        this._rollbacks.push({
          xml: this._xml.length,
          stack: this._stack.length,
          leaf: this.leaf,
          open: this.open
        });
        return this.cursor;
      }
      commit() {
        this._rollbacks.pop();
      }
      rollback() {
        const r = this._rollbacks.pop();
        if (this._xml.length > r.xml) {
          this._xml.splice(r.xml, this._xml.length - r.xml);
        }
        if (this._stack.length > r.stack) {
          this._stack.splice(r.stack, this._stack.length - r.stack);
        }
        this.leaf = r.leaf;
        this.open = r.open;
      }
      get xml() {
        this.closeAll();
        return this._xml.join("");
      }
    };
    XmlStream.StdDocAttributes = {
      version: "1.0",
      encoding: "UTF-8",
      standalone: "yes"
    };
    xml_stream_default = XmlStream;
  }
});

// node_modules/xmlchars/xml/1.0/ed5.js
var require_ed5 = __commonJS({
  "node_modules/xmlchars/xml/1.0/ed5.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CHAR = "	\n\r -\uD7FF\uE000-\uFFFD\u{10000}-\u{10FFFF}";
    exports.S = " 	\r\n";
    exports.NAME_START_CHAR = ":A-Z_a-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{EFFFF}";
    exports.NAME_CHAR = "-" + exports.NAME_START_CHAR + ".0-9\xB7\u0300-\u036F\u203F-\u2040";
    exports.CHAR_RE = new RegExp("^[" + exports.CHAR + "]$", "u");
    exports.S_RE = new RegExp("^[" + exports.S + "]+$", "u");
    exports.NAME_START_CHAR_RE = new RegExp("^[" + exports.NAME_START_CHAR + "]$", "u");
    exports.NAME_CHAR_RE = new RegExp("^[" + exports.NAME_CHAR + "]$", "u");
    exports.NAME_RE = new RegExp("^[" + exports.NAME_START_CHAR + "][" + exports.NAME_CHAR + "]*$", "u");
    exports.NMTOKEN_RE = new RegExp("^[" + exports.NAME_CHAR + "]+$", "u");
    var TAB = 9;
    var NL = 10;
    var CR = 13;
    var SPACE = 32;
    exports.S_LIST = [SPACE, NL, CR, TAB];
    function isChar(c2) {
      return c2 >= SPACE && c2 <= 55295 || c2 === NL || c2 === CR || c2 === TAB || c2 >= 57344 && c2 <= 65533 || c2 >= 65536 && c2 <= 1114111;
    }
    exports.isChar = isChar;
    function isS(c2) {
      return c2 === SPACE || c2 === NL || c2 === CR || c2 === TAB;
    }
    exports.isS = isS;
    function isNameStartChar(c2) {
      return c2 >= 65 && c2 <= 90 || c2 >= 97 && c2 <= 122 || c2 === 58 || c2 === 95 || c2 === 8204 || c2 === 8205 || c2 >= 192 && c2 <= 214 || c2 >= 216 && c2 <= 246 || c2 >= 248 && c2 <= 767 || c2 >= 880 && c2 <= 893 || c2 >= 895 && c2 <= 8191 || c2 >= 8304 && c2 <= 8591 || c2 >= 11264 && c2 <= 12271 || c2 >= 12289 && c2 <= 55295 || c2 >= 63744 && c2 <= 64975 || c2 >= 65008 && c2 <= 65533 || c2 >= 65536 && c2 <= 983039;
    }
    exports.isNameStartChar = isNameStartChar;
    function isNameChar(c2) {
      return isNameStartChar(c2) || c2 >= 48 && c2 <= 57 || c2 === 45 || c2 === 46 || c2 === 183 || c2 >= 768 && c2 <= 879 || c2 >= 8255 && c2 <= 8256;
    }
    exports.isNameChar = isNameChar;
  }
});

// node_modules/xmlchars/xml/1.1/ed2.js
var require_ed2 = __commonJS({
  "node_modules/xmlchars/xml/1.1/ed2.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CHAR = "-\uD7FF\uE000-\uFFFD\u{10000}-\u{10FFFF}";
    exports.RESTRICTED_CHAR = "-\b\v\f-\x7F-\x84\x86-\x9F";
    exports.S = " 	\r\n";
    exports.NAME_START_CHAR = ":A-Z_a-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{EFFFF}";
    exports.NAME_CHAR = "-" + exports.NAME_START_CHAR + ".0-9\xB7\u0300-\u036F\u203F-\u2040";
    exports.CHAR_RE = new RegExp("^[" + exports.CHAR + "]$", "u");
    exports.RESTRICTED_CHAR_RE = new RegExp("^[" + exports.RESTRICTED_CHAR + "]$", "u");
    exports.S_RE = new RegExp("^[" + exports.S + "]+$", "u");
    exports.NAME_START_CHAR_RE = new RegExp("^[" + exports.NAME_START_CHAR + "]$", "u");
    exports.NAME_CHAR_RE = new RegExp("^[" + exports.NAME_CHAR + "]$", "u");
    exports.NAME_RE = new RegExp("^[" + exports.NAME_START_CHAR + "][" + exports.NAME_CHAR + "]*$", "u");
    exports.NMTOKEN_RE = new RegExp("^[" + exports.NAME_CHAR + "]+$", "u");
    var TAB = 9;
    var NL = 10;
    var CR = 13;
    var SPACE = 32;
    exports.S_LIST = [SPACE, NL, CR, TAB];
    function isChar(c2) {
      return c2 >= 1 && c2 <= 55295 || c2 >= 57344 && c2 <= 65533 || c2 >= 65536 && c2 <= 1114111;
    }
    exports.isChar = isChar;
    function isRestrictedChar(c2) {
      return c2 >= 1 && c2 <= 8 || c2 === 11 || c2 === 12 || c2 >= 14 && c2 <= 31 || c2 >= 127 && c2 <= 132 || c2 >= 134 && c2 <= 159;
    }
    exports.isRestrictedChar = isRestrictedChar;
    function isCharAndNotRestricted(c2) {
      return c2 === 9 || c2 === 10 || c2 === 13 || c2 > 31 && c2 < 127 || c2 === 133 || c2 > 159 && c2 <= 55295 || c2 >= 57344 && c2 <= 65533 || c2 >= 65536 && c2 <= 1114111;
    }
    exports.isCharAndNotRestricted = isCharAndNotRestricted;
    function isS(c2) {
      return c2 === SPACE || c2 === NL || c2 === CR || c2 === TAB;
    }
    exports.isS = isS;
    function isNameStartChar(c2) {
      return c2 >= 65 && c2 <= 90 || c2 >= 97 && c2 <= 122 || c2 === 58 || c2 === 95 || c2 === 8204 || c2 === 8205 || c2 >= 192 && c2 <= 214 || c2 >= 216 && c2 <= 246 || c2 >= 248 && c2 <= 767 || c2 >= 880 && c2 <= 893 || c2 >= 895 && c2 <= 8191 || c2 >= 8304 && c2 <= 8591 || c2 >= 11264 && c2 <= 12271 || c2 >= 12289 && c2 <= 55295 || c2 >= 63744 && c2 <= 64975 || c2 >= 65008 && c2 <= 65533 || c2 >= 65536 && c2 <= 983039;
    }
    exports.isNameStartChar = isNameStartChar;
    function isNameChar(c2) {
      return isNameStartChar(c2) || c2 >= 48 && c2 <= 57 || c2 === 45 || c2 === 46 || c2 === 183 || c2 >= 768 && c2 <= 879 || c2 >= 8255 && c2 <= 8256;
    }
    exports.isNameChar = isNameChar;
  }
});

// node_modules/xmlchars/xmlns/1.0/ed3.js
var require_ed3 = __commonJS({
  "node_modules/xmlchars/xmlns/1.0/ed3.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NC_NAME_START_CHAR = "A-Z_a-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{EFFFF}";
    exports.NC_NAME_CHAR = "-" + exports.NC_NAME_START_CHAR + ".0-9\xB7\u0300-\u036F\u203F-\u2040";
    exports.NC_NAME_START_CHAR_RE = new RegExp("^[" + exports.NC_NAME_START_CHAR + "]$", "u");
    exports.NC_NAME_CHAR_RE = new RegExp("^[" + exports.NC_NAME_CHAR + "]$", "u");
    exports.NC_NAME_RE = new RegExp("^[" + exports.NC_NAME_START_CHAR + "][" + exports.NC_NAME_CHAR + "]*$", "u");
    function isNCNameStartChar(c2) {
      return c2 >= 65 && c2 <= 90 || c2 === 95 || c2 >= 97 && c2 <= 122 || c2 >= 192 && c2 <= 214 || c2 >= 216 && c2 <= 246 || c2 >= 248 && c2 <= 767 || c2 >= 880 && c2 <= 893 || c2 >= 895 && c2 <= 8191 || c2 >= 8204 && c2 <= 8205 || c2 >= 8304 && c2 <= 8591 || c2 >= 11264 && c2 <= 12271 || c2 >= 12289 && c2 <= 55295 || c2 >= 63744 && c2 <= 64975 || c2 >= 65008 && c2 <= 65533 || c2 >= 65536 && c2 <= 983039;
    }
    exports.isNCNameStartChar = isNCNameStartChar;
    function isNCNameChar(c2) {
      return isNCNameStartChar(c2) || (c2 === 45 || c2 === 46 || c2 >= 48 && c2 <= 57 || c2 === 183 || c2 >= 768 && c2 <= 879 || c2 >= 8255 && c2 <= 8256);
    }
    exports.isNCNameChar = isNCNameChar;
  }
});

// node_modules/saxes/saxes.js
var require_saxes = __commonJS({
  "node_modules/saxes/saxes.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SaxesParser = exports.EVENTS = void 0;
    var ed5 = require_ed5();
    var ed2 = require_ed2();
    var NSed3 = require_ed3();
    var isS = ed5.isS;
    var isChar10 = ed5.isChar;
    var isNameStartChar = ed5.isNameStartChar;
    var isNameChar = ed5.isNameChar;
    var S_LIST = ed5.S_LIST;
    var NAME_RE = ed5.NAME_RE;
    var isChar11 = ed2.isChar;
    var isNCNameStartChar = NSed3.isNCNameStartChar;
    var isNCNameChar = NSed3.isNCNameChar;
    var NC_NAME_RE = NSed3.NC_NAME_RE;
    var XML_NAMESPACE = "http://www.w3.org/XML/1998/namespace";
    var XMLNS_NAMESPACE = "http://www.w3.org/2000/xmlns/";
    var rootNS = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
      __proto__: null,
      xml: XML_NAMESPACE,
      xmlns: XMLNS_NAMESPACE
    };
    var XML_ENTITIES = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
      __proto__: null,
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'"
    };
    var EOC = -1;
    var NL_LIKE = -2;
    var S_BEGIN = 0;
    var S_BEGIN_WHITESPACE = 1;
    var S_DOCTYPE = 2;
    var S_DOCTYPE_QUOTE = 3;
    var S_DTD = 4;
    var S_DTD_QUOTED = 5;
    var S_DTD_OPEN_WAKA = 6;
    var S_DTD_OPEN_WAKA_BANG = 7;
    var S_DTD_COMMENT = 8;
    var S_DTD_COMMENT_ENDING = 9;
    var S_DTD_COMMENT_ENDED = 10;
    var S_DTD_PI = 11;
    var S_DTD_PI_ENDING = 12;
    var S_TEXT = 13;
    var S_ENTITY = 14;
    var S_OPEN_WAKA = 15;
    var S_OPEN_WAKA_BANG = 16;
    var S_COMMENT = 17;
    var S_COMMENT_ENDING = 18;
    var S_COMMENT_ENDED = 19;
    var S_CDATA = 20;
    var S_CDATA_ENDING = 21;
    var S_CDATA_ENDING_2 = 22;
    var S_PI_FIRST_CHAR = 23;
    var S_PI_REST = 24;
    var S_PI_BODY = 25;
    var S_PI_ENDING = 26;
    var S_XML_DECL_NAME_START = 27;
    var S_XML_DECL_NAME = 28;
    var S_XML_DECL_EQ = 29;
    var S_XML_DECL_VALUE_START = 30;
    var S_XML_DECL_VALUE = 31;
    var S_XML_DECL_SEPARATOR = 32;
    var S_XML_DECL_ENDING = 33;
    var S_OPEN_TAG = 34;
    var S_OPEN_TAG_SLASH = 35;
    var S_ATTRIB = 36;
    var S_ATTRIB_NAME = 37;
    var S_ATTRIB_NAME_SAW_WHITE = 38;
    var S_ATTRIB_VALUE = 39;
    var S_ATTRIB_VALUE_QUOTED = 40;
    var S_ATTRIB_VALUE_CLOSED = 41;
    var S_ATTRIB_VALUE_UNQUOTED = 42;
    var S_CLOSE_TAG = 43;
    var S_CLOSE_TAG_SAW_WHITE = 44;
    var TAB = 9;
    var NL = 10;
    var CR = 13;
    var SPACE = 32;
    var BANG = 33;
    var DQUOTE = 34;
    var AMP = 38;
    var SQUOTE = 39;
    var MINUS = 45;
    var FORWARD_SLASH = 47;
    var SEMICOLON = 59;
    var LESS = 60;
    var EQUAL = 61;
    var GREATER = 62;
    var QUESTION = 63;
    var OPEN_BRACKET = 91;
    var CLOSE_BRACKET = 93;
    var NEL = 133;
    var LS = 8232;
    var isQuote = (c2) => c2 === DQUOTE || c2 === SQUOTE;
    var QUOTES = [DQUOTE, SQUOTE];
    var DOCTYPE_TERMINATOR = [...QUOTES, OPEN_BRACKET, GREATER];
    var DTD_TERMINATOR = [...QUOTES, LESS, CLOSE_BRACKET];
    var XML_DECL_NAME_TERMINATOR = [EQUAL, QUESTION, ...S_LIST];
    var ATTRIB_VALUE_UNQUOTED_TERMINATOR = [...S_LIST, GREATER, AMP, LESS];
    function nsPairCheck(parser, prefix, uri) {
      switch (prefix) {
        case "xml":
          if (uri !== XML_NAMESPACE) {
            parser.fail(`xml prefix must be bound to ${XML_NAMESPACE}.`);
          }
          break;
        case "xmlns":
          if (uri !== XMLNS_NAMESPACE) {
            parser.fail(`xmlns prefix must be bound to ${XMLNS_NAMESPACE}.`);
          }
          break;
        default:
      }
      switch (uri) {
        case XMLNS_NAMESPACE:
          parser.fail(prefix === "" ? `the default namespace may not be set to ${uri}.` : `may not assign a prefix (even "xmlns") to the URI ${XMLNS_NAMESPACE}.`);
          break;
        case XML_NAMESPACE:
          switch (prefix) {
            case "xml":
              break;
            case "":
              parser.fail(`the default namespace may not be set to ${uri}.`);
              break;
            default:
              parser.fail("may not assign the xml namespace to another prefix.");
          }
          break;
        default:
      }
    }
    function nsMappingCheck(parser, mapping) {
      for (const local of Object.keys(mapping)) {
        nsPairCheck(parser, local, mapping[local]);
      }
    }
    var isNCName = (name) => NC_NAME_RE.test(name);
    var isName = (name) => NAME_RE.test(name);
    var FORBIDDEN_START = 0;
    var FORBIDDEN_BRACKET = 1;
    var FORBIDDEN_BRACKET_BRACKET = 2;
    exports.EVENTS = [
      "xmldecl",
      "text",
      "processinginstruction",
      "doctype",
      "comment",
      "opentagstart",
      "attribute",
      "opentag",
      "closetag",
      "cdata",
      "error",
      "end",
      "ready"
    ];
    var EVENT_NAME_TO_HANDLER_NAME = {
      xmldecl: "xmldeclHandler",
      text: "textHandler",
      processinginstruction: "piHandler",
      doctype: "doctypeHandler",
      comment: "commentHandler",
      opentagstart: "openTagStartHandler",
      attribute: "attributeHandler",
      opentag: "openTagHandler",
      closetag: "closeTagHandler",
      cdata: "cdataHandler",
      error: "errorHandler",
      end: "endHandler",
      ready: "readyHandler"
    };
    var SaxesParser2 = class {
      /**
       * @param opt The parser options.
       */
      constructor(opt) {
        this.opt = opt !== null && opt !== void 0 ? opt : {};
        this.fragmentOpt = !!this.opt.fragment;
        const xmlnsOpt = this.xmlnsOpt = !!this.opt.xmlns;
        this.trackPosition = this.opt.position !== false;
        this.fileName = this.opt.fileName;
        if (xmlnsOpt) {
          this.nameStartCheck = isNCNameStartChar;
          this.nameCheck = isNCNameChar;
          this.isName = isNCName;
          this.processAttribs = this.processAttribsNS;
          this.pushAttrib = this.pushAttribNS;
          this.ns = Object.assign({ __proto__: null }, rootNS);
          const additional = this.opt.additionalNamespaces;
          if (additional != null) {
            nsMappingCheck(this, additional);
            Object.assign(this.ns, additional);
          }
        } else {
          this.nameStartCheck = isNameStartChar;
          this.nameCheck = isNameChar;
          this.isName = isName;
          this.processAttribs = this.processAttribsPlain;
          this.pushAttrib = this.pushAttribPlain;
        }
        this.stateTable = [
          /* eslint-disable @typescript-eslint/unbound-method */
          this.sBegin,
          this.sBeginWhitespace,
          this.sDoctype,
          this.sDoctypeQuote,
          this.sDTD,
          this.sDTDQuoted,
          this.sDTDOpenWaka,
          this.sDTDOpenWakaBang,
          this.sDTDComment,
          this.sDTDCommentEnding,
          this.sDTDCommentEnded,
          this.sDTDPI,
          this.sDTDPIEnding,
          this.sText,
          this.sEntity,
          this.sOpenWaka,
          this.sOpenWakaBang,
          this.sComment,
          this.sCommentEnding,
          this.sCommentEnded,
          this.sCData,
          this.sCDataEnding,
          this.sCDataEnding2,
          this.sPIFirstChar,
          this.sPIRest,
          this.sPIBody,
          this.sPIEnding,
          this.sXMLDeclNameStart,
          this.sXMLDeclName,
          this.sXMLDeclEq,
          this.sXMLDeclValueStart,
          this.sXMLDeclValue,
          this.sXMLDeclSeparator,
          this.sXMLDeclEnding,
          this.sOpenTag,
          this.sOpenTagSlash,
          this.sAttrib,
          this.sAttribName,
          this.sAttribNameSawWhite,
          this.sAttribValue,
          this.sAttribValueQuoted,
          this.sAttribValueClosed,
          this.sAttribValueUnquoted,
          this.sCloseTag,
          this.sCloseTagSawWhite
          /* eslint-enable @typescript-eslint/unbound-method */
        ];
        this._init();
      }
      /**
       * Indicates whether or not the parser is closed. If ``true``, wait for
       * the ``ready`` event to write again.
       */
      get closed() {
        return this._closed;
      }
      _init() {
        var _a;
        this.openWakaBang = "";
        this.text = "";
        this.name = "";
        this.piTarget = "";
        this.entity = "";
        this.q = null;
        this.tags = [];
        this.tag = null;
        this.topNS = null;
        this.chunk = "";
        this.chunkPosition = 0;
        this.i = 0;
        this.prevI = 0;
        this.carriedFromPrevious = void 0;
        this.forbiddenState = FORBIDDEN_START;
        this.attribList = [];
        const { fragmentOpt } = this;
        this.state = fragmentOpt ? S_TEXT : S_BEGIN;
        this.reportedTextBeforeRoot = this.reportedTextAfterRoot = this.closedRoot = this.sawRoot = fragmentOpt;
        this.xmlDeclPossible = !fragmentOpt;
        this.xmlDeclExpects = ["version"];
        this.entityReturnState = void 0;
        let { defaultXMLVersion } = this.opt;
        if (defaultXMLVersion === void 0) {
          if (this.opt.forceXMLVersion === true) {
            throw new Error("forceXMLVersion set but defaultXMLVersion is not set");
          }
          defaultXMLVersion = "1.0";
        }
        this.setXMLVersion(defaultXMLVersion);
        this.positionAtNewLine = 0;
        this.doctype = false;
        this._closed = false;
        this.xmlDecl = {
          version: void 0,
          encoding: void 0,
          standalone: void 0
        };
        this.line = 1;
        this.column = 0;
        this.ENTITIES = Object.create(XML_ENTITIES);
        (_a = this.readyHandler) === null || _a === void 0 ? void 0 : _a.call(this);
      }
      /**
       * The stream position the parser is currently looking at. This field is
       * zero-based.
       *
       * This field is not based on counting Unicode characters but is to be
       * interpreted as a plain index into a JavaScript string.
       */
      get position() {
        return this.chunkPosition + this.i;
      }
      /**
       * The column number of the next character to be read by the parser.  *
       * This field is zero-based. (The first column in a line is 0.)
       *
       * This field reports the index at which the next character would be in the
       * line if the line were represented as a JavaScript string.  Note that this
       * *can* be different to a count based on the number of *Unicode characters*
       * due to how JavaScript handles astral plane characters.
       *
       * See [[column]] for a number that corresponds to a count of Unicode
       * characters.
       */
      get columnIndex() {
        return this.position - this.positionAtNewLine;
      }
      /**
       * Set an event listener on an event. The parser supports one handler per
       * event type. If you try to set an event handler over an existing handler,
       * the old handler is silently overwritten.
       *
       * @param name The event to listen to.
       *
       * @param handler The handler to set.
       */
      on(name, handler) {
        this[EVENT_NAME_TO_HANDLER_NAME[name]] = handler;
      }
      /**
       * Unset an event handler.
       *
       * @parma name The event to stop listening to.
       */
      off(name) {
        this[EVENT_NAME_TO_HANDLER_NAME[name]] = void 0;
      }
      /**
       * Make an error object. The error object will have a message that contains
       * the ``fileName`` option passed at the creation of the parser. If position
       * tracking was turned on, it will also have line and column number
       * information.
       *
       * @param message The message describing the error to report.
       *
       * @returns An error object with a properly formatted message.
       */
      makeError(message) {
        var _a;
        let msg = (_a = this.fileName) !== null && _a !== void 0 ? _a : "";
        if (this.trackPosition) {
          if (msg.length > 0) {
            msg += ":";
          }
          msg += `${this.line}:${this.column}`;
        }
        if (msg.length > 0) {
          msg += ": ";
        }
        return new Error(msg + message);
      }
      /**
       * Report a parsing error. This method is made public so that client code may
       * check for issues that are outside the scope of this project and can report
       * errors.
       *
       * @param message The error to report.
       *
       * @returns this
       */
      fail(message) {
        const err = this.makeError(message);
        const handler = this.errorHandler;
        if (handler === void 0) {
          throw err;
        } else {
          handler(err);
        }
        return this;
      }
      /**
       * Write a XML data to the parser.
       *
       * @param chunk The XML data to write.
       *
       * @returns this
       */
      // We do need object for the type here. Yes, it often causes problems
      // but not in this case.
      write(chunk) {
        if (this.closed) {
          return this.fail("cannot write after close; assign an onready handler.");
        }
        let end = false;
        if (chunk === null) {
          end = true;
          chunk = "";
        } else if (typeof chunk === "object") {
          chunk = chunk.toString();
        }
        if (this.carriedFromPrevious !== void 0) {
          chunk = `${this.carriedFromPrevious}${chunk}`;
          this.carriedFromPrevious = void 0;
        }
        let limit = chunk.length;
        const lastCode = chunk.charCodeAt(limit - 1);
        if (!end && // A trailing CR or surrogate must be carried over to the next
        // chunk.
        (lastCode === CR || lastCode >= 55296 && lastCode <= 56319)) {
          this.carriedFromPrevious = chunk[limit - 1];
          limit--;
          chunk = chunk.slice(0, limit);
        }
        const { stateTable } = this;
        this.chunk = chunk;
        this.i = 0;
        while (this.i < limit) {
          stateTable[this.state].call(this);
        }
        this.chunkPosition += limit;
        return end ? this.end() : this;
      }
      /**
       * Close the current stream. Perform final well-formedness checks and reset
       * the parser tstate.
       *
       * @returns this
       */
      close() {
        return this.write(null);
      }
      /**
       * Get a single code point out of the current chunk. This updates the current
       * position if we do position tracking.
       *
       * This is the algorithm to use for XML 1.0.
       *
       * @returns The character read.
       */
      getCode10() {
        const { chunk, i } = this;
        this.prevI = i;
        this.i = i + 1;
        if (i >= chunk.length) {
          return EOC;
        }
        const code = chunk.charCodeAt(i);
        this.column++;
        if (code < 55296) {
          if (code >= SPACE || code === TAB) {
            return code;
          }
          switch (code) {
            case NL:
              this.line++;
              this.column = 0;
              this.positionAtNewLine = this.position;
              return NL;
            case CR:
              if (chunk.charCodeAt(i + 1) === NL) {
                this.i = i + 2;
              }
              this.line++;
              this.column = 0;
              this.positionAtNewLine = this.position;
              return NL_LIKE;
            default:
              this.fail("disallowed character.");
              return code;
          }
        }
        if (code > 56319) {
          if (!(code >= 57344 && code <= 65533)) {
            this.fail("disallowed character.");
          }
          return code;
        }
        const final = 65536 + (code - 55296) * 1024 + (chunk.charCodeAt(i + 1) - 56320);
        this.i = i + 2;
        if (final > 1114111) {
          this.fail("disallowed character.");
        }
        return final;
      }
      /**
       * Get a single code point out of the current chunk. This updates the current
       * position if we do position tracking.
       *
       * This is the algorithm to use for XML 1.1.
       *
       * @returns {number} The character read.
       */
      getCode11() {
        const { chunk, i } = this;
        this.prevI = i;
        this.i = i + 1;
        if (i >= chunk.length) {
          return EOC;
        }
        const code = chunk.charCodeAt(i);
        this.column++;
        if (code < 55296) {
          if (code > 31 && code < 127 || code > 159 && code !== LS || code === TAB) {
            return code;
          }
          switch (code) {
            case NL:
              this.line++;
              this.column = 0;
              this.positionAtNewLine = this.position;
              return NL;
            case CR: {
              const next = chunk.charCodeAt(i + 1);
              if (next === NL || next === NEL) {
                this.i = i + 2;
              }
            }
            case NEL:
            case LS:
              this.line++;
              this.column = 0;
              this.positionAtNewLine = this.position;
              return NL_LIKE;
            default:
              this.fail("disallowed character.");
              return code;
          }
        }
        if (code > 56319) {
          if (!(code >= 57344 && code <= 65533)) {
            this.fail("disallowed character.");
          }
          return code;
        }
        const final = 65536 + (code - 55296) * 1024 + (chunk.charCodeAt(i + 1) - 56320);
        this.i = i + 2;
        if (final > 1114111) {
          this.fail("disallowed character.");
        }
        return final;
      }
      /**
       * Like ``getCode`` but with the return value normalized so that ``NL`` is
       * returned for ``NL_LIKE``.
       */
      getCodeNorm() {
        const c2 = this.getCode();
        return c2 === NL_LIKE ? NL : c2;
      }
      unget() {
        this.i = this.prevI;
        this.column--;
      }
      /**
       * Capture characters into a buffer until encountering one of a set of
       * characters.
       *
       * @param chars An array of codepoints. Encountering a character in the array
       * ends the capture. (``chars`` may safely contain ``NL``.)
       *
       * @return The character code that made the capture end, or ``EOC`` if we hit
       * the end of the chunk. The return value cannot be NL_LIKE: NL is returned
       * instead.
       */
      captureTo(chars) {
        let { i: start } = this;
        const { chunk } = this;
        while (true) {
          const c2 = this.getCode();
          const isNLLike = c2 === NL_LIKE;
          const final = isNLLike ? NL : c2;
          if (final === EOC || chars.includes(final)) {
            this.text += chunk.slice(start, this.prevI);
            return final;
          }
          if (isNLLike) {
            this.text += `${chunk.slice(start, this.prevI)}
`;
            start = this.i;
          }
        }
      }
      /**
       * Capture characters into a buffer until encountering a character.
       *
       * @param char The codepoint that ends the capture. **NOTE ``char`` MAY NOT
       * CONTAIN ``NL``.** Passing ``NL`` will result in buggy behavior.
       *
       * @return ``true`` if we ran into the character. Otherwise, we ran into the
       * end of the current chunk.
       */
      captureToChar(char) {
        let { i: start } = this;
        const { chunk } = this;
        while (true) {
          let c2 = this.getCode();
          switch (c2) {
            case NL_LIKE:
              this.text += `${chunk.slice(start, this.prevI)}
`;
              start = this.i;
              c2 = NL;
              break;
            case EOC:
              this.text += chunk.slice(start);
              return false;
            default:
          }
          if (c2 === char) {
            this.text += chunk.slice(start, this.prevI);
            return true;
          }
        }
      }
      /**
       * Capture characters that satisfy ``isNameChar`` into the ``name`` field of
       * this parser.
       *
       * @return The character code that made the test fail, or ``EOC`` if we hit
       * the end of the chunk. The return value cannot be NL_LIKE: NL is returned
       * instead.
       */
      captureNameChars() {
        const { chunk, i: start } = this;
        while (true) {
          const c2 = this.getCode();
          if (c2 === EOC) {
            this.name += chunk.slice(start);
            return EOC;
          }
          if (!isNameChar(c2)) {
            this.name += chunk.slice(start, this.prevI);
            return c2 === NL_LIKE ? NL : c2;
          }
        }
      }
      /**
       * Skip white spaces.
       *
       * @return The character that ended the skip, or ``EOC`` if we hit
       * the end of the chunk. The return value cannot be NL_LIKE: NL is returned
       * instead.
       */
      skipSpaces() {
        while (true) {
          const c2 = this.getCodeNorm();
          if (c2 === EOC || !isS(c2)) {
            return c2;
          }
        }
      }
      setXMLVersion(version) {
        this.currentXMLVersion = version;
        if (version === "1.0") {
          this.isChar = isChar10;
          this.getCode = this.getCode10;
        } else {
          this.isChar = isChar11;
          this.getCode = this.getCode11;
        }
      }
      // STATE ENGINE METHODS
      // This needs to be a state separate from S_BEGIN_WHITESPACE because we want
      // to be sure never to come back to this state later.
      sBegin() {
        if (this.chunk.charCodeAt(0) === 65279) {
          this.i++;
          this.column++;
        }
        this.state = S_BEGIN_WHITESPACE;
      }
      sBeginWhitespace() {
        const iBefore = this.i;
        const c2 = this.skipSpaces();
        if (this.prevI !== iBefore) {
          this.xmlDeclPossible = false;
        }
        switch (c2) {
          case LESS:
            this.state = S_OPEN_WAKA;
            if (this.text.length !== 0) {
              throw new Error("no-empty text at start");
            }
            break;
          case EOC:
            break;
          default:
            this.unget();
            this.state = S_TEXT;
            this.xmlDeclPossible = false;
        }
      }
      sDoctype() {
        var _a;
        const c2 = this.captureTo(DOCTYPE_TERMINATOR);
        switch (c2) {
          case GREATER: {
            (_a = this.doctypeHandler) === null || _a === void 0 ? void 0 : _a.call(this, this.text);
            this.text = "";
            this.state = S_TEXT;
            this.doctype = true;
            break;
          }
          case EOC:
            break;
          default:
            this.text += String.fromCodePoint(c2);
            if (c2 === OPEN_BRACKET) {
              this.state = S_DTD;
            } else if (isQuote(c2)) {
              this.state = S_DOCTYPE_QUOTE;
              this.q = c2;
            }
        }
      }
      sDoctypeQuote() {
        const q = this.q;
        if (this.captureToChar(q)) {
          this.text += String.fromCodePoint(q);
          this.q = null;
          this.state = S_DOCTYPE;
        }
      }
      sDTD() {
        const c2 = this.captureTo(DTD_TERMINATOR);
        if (c2 === EOC) {
          return;
        }
        this.text += String.fromCodePoint(c2);
        if (c2 === CLOSE_BRACKET) {
          this.state = S_DOCTYPE;
        } else if (c2 === LESS) {
          this.state = S_DTD_OPEN_WAKA;
        } else if (isQuote(c2)) {
          this.state = S_DTD_QUOTED;
          this.q = c2;
        }
      }
      sDTDQuoted() {
        const q = this.q;
        if (this.captureToChar(q)) {
          this.text += String.fromCodePoint(q);
          this.state = S_DTD;
          this.q = null;
        }
      }
      sDTDOpenWaka() {
        const c2 = this.getCodeNorm();
        this.text += String.fromCodePoint(c2);
        switch (c2) {
          case BANG:
            this.state = S_DTD_OPEN_WAKA_BANG;
            this.openWakaBang = "";
            break;
          case QUESTION:
            this.state = S_DTD_PI;
            break;
          default:
            this.state = S_DTD;
        }
      }
      sDTDOpenWakaBang() {
        const char = String.fromCodePoint(this.getCodeNorm());
        const owb = this.openWakaBang += char;
        this.text += char;
        if (owb !== "-") {
          this.state = owb === "--" ? S_DTD_COMMENT : S_DTD;
          this.openWakaBang = "";
        }
      }
      sDTDComment() {
        if (this.captureToChar(MINUS)) {
          this.text += "-";
          this.state = S_DTD_COMMENT_ENDING;
        }
      }
      sDTDCommentEnding() {
        const c2 = this.getCodeNorm();
        this.text += String.fromCodePoint(c2);
        this.state = c2 === MINUS ? S_DTD_COMMENT_ENDED : S_DTD_COMMENT;
      }
      sDTDCommentEnded() {
        const c2 = this.getCodeNorm();
        this.text += String.fromCodePoint(c2);
        if (c2 === GREATER) {
          this.state = S_DTD;
        } else {
          this.fail("malformed comment.");
          this.state = S_DTD_COMMENT;
        }
      }
      sDTDPI() {
        if (this.captureToChar(QUESTION)) {
          this.text += "?";
          this.state = S_DTD_PI_ENDING;
        }
      }
      sDTDPIEnding() {
        const c2 = this.getCodeNorm();
        this.text += String.fromCodePoint(c2);
        if (c2 === GREATER) {
          this.state = S_DTD;
        }
      }
      sText() {
        if (this.tags.length !== 0) {
          this.handleTextInRoot();
        } else {
          this.handleTextOutsideRoot();
        }
      }
      sEntity() {
        let { i: start } = this;
        const { chunk } = this;
        loop:
          while (true) {
            switch (this.getCode()) {
              case NL_LIKE:
                this.entity += `${chunk.slice(start, this.prevI)}
`;
                start = this.i;
                break;
              case SEMICOLON: {
                const { entityReturnState } = this;
                const entity = this.entity + chunk.slice(start, this.prevI);
                this.state = entityReturnState;
                let parsed;
                if (entity === "") {
                  this.fail("empty entity name.");
                  parsed = "&;";
                } else {
                  parsed = this.parseEntity(entity);
                  this.entity = "";
                }
                if (entityReturnState !== S_TEXT || this.textHandler !== void 0) {
                  this.text += parsed;
                }
                break loop;
              }
              case EOC:
                this.entity += chunk.slice(start);
                break loop;
              default:
            }
          }
      }
      sOpenWaka() {
        const c2 = this.getCode();
        if (isNameStartChar(c2)) {
          this.state = S_OPEN_TAG;
          this.unget();
          this.xmlDeclPossible = false;
        } else {
          switch (c2) {
            case FORWARD_SLASH:
              this.state = S_CLOSE_TAG;
              this.xmlDeclPossible = false;
              break;
            case BANG:
              this.state = S_OPEN_WAKA_BANG;
              this.openWakaBang = "";
              this.xmlDeclPossible = false;
              break;
            case QUESTION:
              this.state = S_PI_FIRST_CHAR;
              break;
            default:
              this.fail("disallowed character in tag name");
              this.state = S_TEXT;
              this.xmlDeclPossible = false;
          }
        }
      }
      sOpenWakaBang() {
        this.openWakaBang += String.fromCodePoint(this.getCodeNorm());
        switch (this.openWakaBang) {
          case "[CDATA[":
            if (!this.sawRoot && !this.reportedTextBeforeRoot) {
              this.fail("text data outside of root node.");
              this.reportedTextBeforeRoot = true;
            }
            if (this.closedRoot && !this.reportedTextAfterRoot) {
              this.fail("text data outside of root node.");
              this.reportedTextAfterRoot = true;
            }
            this.state = S_CDATA;
            this.openWakaBang = "";
            break;
          case "--":
            this.state = S_COMMENT;
            this.openWakaBang = "";
            break;
          case "DOCTYPE":
            this.state = S_DOCTYPE;
            if (this.doctype || this.sawRoot) {
              this.fail("inappropriately located doctype declaration.");
            }
            this.openWakaBang = "";
            break;
          default:
            if (this.openWakaBang.length >= 7) {
              this.fail("incorrect syntax.");
            }
        }
      }
      sComment() {
        if (this.captureToChar(MINUS)) {
          this.state = S_COMMENT_ENDING;
        }
      }
      sCommentEnding() {
        var _a;
        const c2 = this.getCodeNorm();
        if (c2 === MINUS) {
          this.state = S_COMMENT_ENDED;
          (_a = this.commentHandler) === null || _a === void 0 ? void 0 : _a.call(this, this.text);
          this.text = "";
        } else {
          this.text += `-${String.fromCodePoint(c2)}`;
          this.state = S_COMMENT;
        }
      }
      sCommentEnded() {
        const c2 = this.getCodeNorm();
        if (c2 !== GREATER) {
          this.fail("malformed comment.");
          this.text += `--${String.fromCodePoint(c2)}`;
          this.state = S_COMMENT;
        } else {
          this.state = S_TEXT;
        }
      }
      sCData() {
        if (this.captureToChar(CLOSE_BRACKET)) {
          this.state = S_CDATA_ENDING;
        }
      }
      sCDataEnding() {
        const c2 = this.getCodeNorm();
        if (c2 === CLOSE_BRACKET) {
          this.state = S_CDATA_ENDING_2;
        } else {
          this.text += `]${String.fromCodePoint(c2)}`;
          this.state = S_CDATA;
        }
      }
      sCDataEnding2() {
        var _a;
        const c2 = this.getCodeNorm();
        switch (c2) {
          case GREATER: {
            (_a = this.cdataHandler) === null || _a === void 0 ? void 0 : _a.call(this, this.text);
            this.text = "";
            this.state = S_TEXT;
            break;
          }
          case CLOSE_BRACKET:
            this.text += "]";
            break;
          default:
            this.text += `]]${String.fromCodePoint(c2)}`;
            this.state = S_CDATA;
        }
      }
      // We need this separate state to check the first character fo the pi target
      // with this.nameStartCheck which allows less characters than this.nameCheck.
      sPIFirstChar() {
        const c2 = this.getCodeNorm();
        if (this.nameStartCheck(c2)) {
          this.piTarget += String.fromCodePoint(c2);
          this.state = S_PI_REST;
        } else if (c2 === QUESTION || isS(c2)) {
          this.fail("processing instruction without a target.");
          this.state = c2 === QUESTION ? S_PI_ENDING : S_PI_BODY;
        } else {
          this.fail("disallowed character in processing instruction name.");
          this.piTarget += String.fromCodePoint(c2);
          this.state = S_PI_REST;
        }
      }
      sPIRest() {
        const { chunk, i: start } = this;
        while (true) {
          const c2 = this.getCodeNorm();
          if (c2 === EOC) {
            this.piTarget += chunk.slice(start);
            return;
          }
          if (!this.nameCheck(c2)) {
            this.piTarget += chunk.slice(start, this.prevI);
            const isQuestion = c2 === QUESTION;
            if (isQuestion || isS(c2)) {
              if (this.piTarget === "xml") {
                if (!this.xmlDeclPossible) {
                  this.fail("an XML declaration must be at the start of the document.");
                }
                this.state = isQuestion ? S_XML_DECL_ENDING : S_XML_DECL_NAME_START;
              } else {
                this.state = isQuestion ? S_PI_ENDING : S_PI_BODY;
              }
            } else {
              this.fail("disallowed character in processing instruction name.");
              this.piTarget += String.fromCodePoint(c2);
            }
            break;
          }
        }
      }
      sPIBody() {
        if (this.text.length === 0) {
          const c2 = this.getCodeNorm();
          if (c2 === QUESTION) {
            this.state = S_PI_ENDING;
          } else if (!isS(c2)) {
            this.text = String.fromCodePoint(c2);
          }
        } else if (this.captureToChar(QUESTION)) {
          this.state = S_PI_ENDING;
        }
      }
      sPIEnding() {
        var _a;
        const c2 = this.getCodeNorm();
        if (c2 === GREATER) {
          const { piTarget } = this;
          if (piTarget.toLowerCase() === "xml") {
            this.fail("the XML declaration must appear at the start of the document.");
          }
          (_a = this.piHandler) === null || _a === void 0 ? void 0 : _a.call(this, {
            target: piTarget,
            body: this.text
          });
          this.piTarget = this.text = "";
          this.state = S_TEXT;
        } else if (c2 === QUESTION) {
          this.text += "?";
        } else {
          this.text += `?${String.fromCodePoint(c2)}`;
          this.state = S_PI_BODY;
        }
        this.xmlDeclPossible = false;
      }
      sXMLDeclNameStart() {
        const c2 = this.skipSpaces();
        if (c2 === QUESTION) {
          this.state = S_XML_DECL_ENDING;
          return;
        }
        if (c2 !== EOC) {
          this.state = S_XML_DECL_NAME;
          this.name = String.fromCodePoint(c2);
        }
      }
      sXMLDeclName() {
        const c2 = this.captureTo(XML_DECL_NAME_TERMINATOR);
        if (c2 === QUESTION) {
          this.state = S_XML_DECL_ENDING;
          this.name += this.text;
          this.text = "";
          this.fail("XML declaration is incomplete.");
          return;
        }
        if (!(isS(c2) || c2 === EQUAL)) {
          return;
        }
        this.name += this.text;
        this.text = "";
        if (!this.xmlDeclExpects.includes(this.name)) {
          switch (this.name.length) {
            case 0:
              this.fail("did not expect any more name/value pairs.");
              break;
            case 1:
              this.fail(`expected the name ${this.xmlDeclExpects[0]}.`);
              break;
            default:
              this.fail(`expected one of ${this.xmlDeclExpects.join(", ")}`);
          }
        }
        this.state = c2 === EQUAL ? S_XML_DECL_VALUE_START : S_XML_DECL_EQ;
      }
      sXMLDeclEq() {
        const c2 = this.getCodeNorm();
        if (c2 === QUESTION) {
          this.state = S_XML_DECL_ENDING;
          this.fail("XML declaration is incomplete.");
          return;
        }
        if (isS(c2)) {
          return;
        }
        if (c2 !== EQUAL) {
          this.fail("value required.");
        }
        this.state = S_XML_DECL_VALUE_START;
      }
      sXMLDeclValueStart() {
        const c2 = this.getCodeNorm();
        if (c2 === QUESTION) {
          this.state = S_XML_DECL_ENDING;
          this.fail("XML declaration is incomplete.");
          return;
        }
        if (isS(c2)) {
          return;
        }
        if (!isQuote(c2)) {
          this.fail("value must be quoted.");
          this.q = SPACE;
        } else {
          this.q = c2;
        }
        this.state = S_XML_DECL_VALUE;
      }
      sXMLDeclValue() {
        const c2 = this.captureTo([this.q, QUESTION]);
        if (c2 === QUESTION) {
          this.state = S_XML_DECL_ENDING;
          this.text = "";
          this.fail("XML declaration is incomplete.");
          return;
        }
        if (c2 === EOC) {
          return;
        }
        const value = this.text;
        this.text = "";
        switch (this.name) {
          case "version": {
            this.xmlDeclExpects = ["encoding", "standalone"];
            const version = value;
            this.xmlDecl.version = version;
            if (!/^1\.[0-9]+$/.test(version)) {
              this.fail("version number must match /^1\\.[0-9]+$/.");
            } else if (!this.opt.forceXMLVersion) {
              this.setXMLVersion(version);
            }
            break;
          }
          case "encoding":
            if (!/^[A-Za-z][A-Za-z0-9._-]*$/.test(value)) {
              this.fail("encoding value must match /^[A-Za-z0-9][A-Za-z0-9._-]*$/.");
            }
            this.xmlDeclExpects = ["standalone"];
            this.xmlDecl.encoding = value;
            break;
          case "standalone":
            if (value !== "yes" && value !== "no") {
              this.fail('standalone value must match "yes" or "no".');
            }
            this.xmlDeclExpects = [];
            this.xmlDecl.standalone = value;
            break;
          default:
        }
        this.name = "";
        this.state = S_XML_DECL_SEPARATOR;
      }
      sXMLDeclSeparator() {
        const c2 = this.getCodeNorm();
        if (c2 === QUESTION) {
          this.state = S_XML_DECL_ENDING;
          return;
        }
        if (!isS(c2)) {
          this.fail("whitespace required.");
          this.unget();
        }
        this.state = S_XML_DECL_NAME_START;
      }
      sXMLDeclEnding() {
        var _a;
        const c2 = this.getCodeNorm();
        if (c2 === GREATER) {
          if (this.piTarget !== "xml") {
            this.fail("processing instructions are not allowed before root.");
          } else if (this.name !== "version" && this.xmlDeclExpects.includes("version")) {
            this.fail("XML declaration must contain a version.");
          }
          (_a = this.xmldeclHandler) === null || _a === void 0 ? void 0 : _a.call(this, this.xmlDecl);
          this.name = "";
          this.piTarget = this.text = "";
          this.state = S_TEXT;
        } else {
          this.fail("The character ? is disallowed anywhere in XML declarations.");
        }
        this.xmlDeclPossible = false;
      }
      sOpenTag() {
        var _a;
        const c2 = this.captureNameChars();
        if (c2 === EOC) {
          return;
        }
        const tag2 = this.tag = {
          name: this.name,
          attributes: /* @__PURE__ */ Object.create(null)
        };
        this.name = "";
        if (this.xmlnsOpt) {
          this.topNS = tag2.ns = /* @__PURE__ */ Object.create(null);
        }
        (_a = this.openTagStartHandler) === null || _a === void 0 ? void 0 : _a.call(this, tag2);
        this.sawRoot = true;
        if (!this.fragmentOpt && this.closedRoot) {
          this.fail("documents may contain only one root.");
        }
        switch (c2) {
          case GREATER:
            this.openTag();
            break;
          case FORWARD_SLASH:
            this.state = S_OPEN_TAG_SLASH;
            break;
          default:
            if (!isS(c2)) {
              this.fail("disallowed character in tag name.");
            }
            this.state = S_ATTRIB;
        }
      }
      sOpenTagSlash() {
        if (this.getCode() === GREATER) {
          this.openSelfClosingTag();
        } else {
          this.fail("forward-slash in opening tag not followed by >.");
          this.state = S_ATTRIB;
        }
      }
      sAttrib() {
        const c2 = this.skipSpaces();
        if (c2 === EOC) {
          return;
        }
        if (isNameStartChar(c2)) {
          this.unget();
          this.state = S_ATTRIB_NAME;
        } else if (c2 === GREATER) {
          this.openTag();
        } else if (c2 === FORWARD_SLASH) {
          this.state = S_OPEN_TAG_SLASH;
        } else {
          this.fail("disallowed character in attribute name.");
        }
      }
      sAttribName() {
        const c2 = this.captureNameChars();
        if (c2 === EQUAL) {
          this.state = S_ATTRIB_VALUE;
        } else if (isS(c2)) {
          this.state = S_ATTRIB_NAME_SAW_WHITE;
        } else if (c2 === GREATER) {
          this.fail("attribute without value.");
          this.pushAttrib(this.name, this.name);
          this.name = this.text = "";
          this.openTag();
        } else if (c2 !== EOC) {
          this.fail("disallowed character in attribute name.");
        }
      }
      sAttribNameSawWhite() {
        const c2 = this.skipSpaces();
        switch (c2) {
          case EOC:
            return;
          case EQUAL:
            this.state = S_ATTRIB_VALUE;
            break;
          default:
            this.fail("attribute without value.");
            this.text = "";
            this.name = "";
            if (c2 === GREATER) {
              this.openTag();
            } else if (isNameStartChar(c2)) {
              this.unget();
              this.state = S_ATTRIB_NAME;
            } else {
              this.fail("disallowed character in attribute name.");
              this.state = S_ATTRIB;
            }
        }
      }
      sAttribValue() {
        const c2 = this.getCodeNorm();
        if (isQuote(c2)) {
          this.q = c2;
          this.state = S_ATTRIB_VALUE_QUOTED;
        } else if (!isS(c2)) {
          this.fail("unquoted attribute value.");
          this.state = S_ATTRIB_VALUE_UNQUOTED;
          this.unget();
        }
      }
      sAttribValueQuoted() {
        const { q, chunk } = this;
        let { i: start } = this;
        while (true) {
          switch (this.getCode()) {
            case q:
              this.pushAttrib(this.name, this.text + chunk.slice(start, this.prevI));
              this.name = this.text = "";
              this.q = null;
              this.state = S_ATTRIB_VALUE_CLOSED;
              return;
            case AMP:
              this.text += chunk.slice(start, this.prevI);
              this.state = S_ENTITY;
              this.entityReturnState = S_ATTRIB_VALUE_QUOTED;
              return;
            case NL:
            case NL_LIKE:
            case TAB:
              this.text += `${chunk.slice(start, this.prevI)} `;
              start = this.i;
              break;
            case LESS:
              this.text += chunk.slice(start, this.prevI);
              this.fail("disallowed character.");
              return;
            case EOC:
              this.text += chunk.slice(start);
              return;
            default:
          }
        }
      }
      sAttribValueClosed() {
        const c2 = this.getCodeNorm();
        if (isS(c2)) {
          this.state = S_ATTRIB;
        } else if (c2 === GREATER) {
          this.openTag();
        } else if (c2 === FORWARD_SLASH) {
          this.state = S_OPEN_TAG_SLASH;
        } else if (isNameStartChar(c2)) {
          this.fail("no whitespace between attributes.");
          this.unget();
          this.state = S_ATTRIB_NAME;
        } else {
          this.fail("disallowed character in attribute name.");
        }
      }
      sAttribValueUnquoted() {
        const c2 = this.captureTo(ATTRIB_VALUE_UNQUOTED_TERMINATOR);
        switch (c2) {
          case AMP:
            this.state = S_ENTITY;
            this.entityReturnState = S_ATTRIB_VALUE_UNQUOTED;
            break;
          case LESS:
            this.fail("disallowed character.");
            break;
          case EOC:
            break;
          default:
            if (this.text.includes("]]>")) {
              this.fail('the string "]]>" is disallowed in char data.');
            }
            this.pushAttrib(this.name, this.text);
            this.name = this.text = "";
            if (c2 === GREATER) {
              this.openTag();
            } else {
              this.state = S_ATTRIB;
            }
        }
      }
      sCloseTag() {
        const c2 = this.captureNameChars();
        if (c2 === GREATER) {
          this.closeTag();
        } else if (isS(c2)) {
          this.state = S_CLOSE_TAG_SAW_WHITE;
        } else if (c2 !== EOC) {
          this.fail("disallowed character in closing tag.");
        }
      }
      sCloseTagSawWhite() {
        switch (this.skipSpaces()) {
          case GREATER:
            this.closeTag();
            break;
          case EOC:
            break;
          default:
            this.fail("disallowed character in closing tag.");
        }
      }
      // END OF STATE ENGINE METHODS
      handleTextInRoot() {
        let { i: start, forbiddenState } = this;
        const { chunk, textHandler: handler } = this;
        scanLoop:
          while (true) {
            switch (this.getCode()) {
              case LESS: {
                this.state = S_OPEN_WAKA;
                if (handler !== void 0) {
                  const { text } = this;
                  const slice = chunk.slice(start, this.prevI);
                  if (text.length !== 0) {
                    handler(text + slice);
                    this.text = "";
                  } else if (slice.length !== 0) {
                    handler(slice);
                  }
                }
                forbiddenState = FORBIDDEN_START;
                break scanLoop;
              }
              case AMP:
                this.state = S_ENTITY;
                this.entityReturnState = S_TEXT;
                if (handler !== void 0) {
                  this.text += chunk.slice(start, this.prevI);
                }
                forbiddenState = FORBIDDEN_START;
                break scanLoop;
              case CLOSE_BRACKET:
                switch (forbiddenState) {
                  case FORBIDDEN_START:
                    forbiddenState = FORBIDDEN_BRACKET;
                    break;
                  case FORBIDDEN_BRACKET:
                    forbiddenState = FORBIDDEN_BRACKET_BRACKET;
                    break;
                  case FORBIDDEN_BRACKET_BRACKET:
                    break;
                  default:
                    throw new Error("impossible state");
                }
                break;
              case GREATER:
                if (forbiddenState === FORBIDDEN_BRACKET_BRACKET) {
                  this.fail('the string "]]>" is disallowed in char data.');
                }
                forbiddenState = FORBIDDEN_START;
                break;
              case NL_LIKE:
                if (handler !== void 0) {
                  this.text += `${chunk.slice(start, this.prevI)}
`;
                }
                start = this.i;
                forbiddenState = FORBIDDEN_START;
                break;
              case EOC:
                if (handler !== void 0) {
                  this.text += chunk.slice(start);
                }
                break scanLoop;
              default:
                forbiddenState = FORBIDDEN_START;
            }
          }
        this.forbiddenState = forbiddenState;
      }
      handleTextOutsideRoot() {
        let { i: start } = this;
        const { chunk, textHandler: handler } = this;
        let nonSpace = false;
        outRootLoop:
          while (true) {
            const code = this.getCode();
            switch (code) {
              case LESS: {
                this.state = S_OPEN_WAKA;
                if (handler !== void 0) {
                  const { text } = this;
                  const slice = chunk.slice(start, this.prevI);
                  if (text.length !== 0) {
                    handler(text + slice);
                    this.text = "";
                  } else if (slice.length !== 0) {
                    handler(slice);
                  }
                }
                break outRootLoop;
              }
              case AMP:
                this.state = S_ENTITY;
                this.entityReturnState = S_TEXT;
                if (handler !== void 0) {
                  this.text += chunk.slice(start, this.prevI);
                }
                nonSpace = true;
                break outRootLoop;
              case NL_LIKE:
                if (handler !== void 0) {
                  this.text += `${chunk.slice(start, this.prevI)}
`;
                }
                start = this.i;
                break;
              case EOC:
                if (handler !== void 0) {
                  this.text += chunk.slice(start);
                }
                break outRootLoop;
              default:
                if (!isS(code)) {
                  nonSpace = true;
                }
            }
          }
        if (!nonSpace) {
          return;
        }
        if (!this.sawRoot && !this.reportedTextBeforeRoot) {
          this.fail("text data outside of root node.");
          this.reportedTextBeforeRoot = true;
        }
        if (this.closedRoot && !this.reportedTextAfterRoot) {
          this.fail("text data outside of root node.");
          this.reportedTextAfterRoot = true;
        }
      }
      pushAttribNS(name, value) {
        var _a;
        const { prefix, local } = this.qname(name);
        const attr = { name, prefix, local, value };
        this.attribList.push(attr);
        (_a = this.attributeHandler) === null || _a === void 0 ? void 0 : _a.call(this, attr);
        if (prefix === "xmlns") {
          const trimmed = value.trim();
          if (this.currentXMLVersion === "1.0" && trimmed === "") {
            this.fail("invalid attempt to undefine prefix in XML 1.0");
          }
          this.topNS[local] = trimmed;
          nsPairCheck(this, local, trimmed);
        } else if (name === "xmlns") {
          const trimmed = value.trim();
          this.topNS[""] = trimmed;
          nsPairCheck(this, "", trimmed);
        }
      }
      pushAttribPlain(name, value) {
        var _a;
        const attr = { name, value };
        this.attribList.push(attr);
        (_a = this.attributeHandler) === null || _a === void 0 ? void 0 : _a.call(this, attr);
      }
      /**
       * End parsing. This performs final well-formedness checks and resets the
       * parser to a clean state.
       *
       * @returns this
       */
      end() {
        var _a, _b;
        if (!this.sawRoot) {
          this.fail("document must contain a root element.");
        }
        const { tags } = this;
        while (tags.length > 0) {
          const tag2 = tags.pop();
          this.fail(`unclosed tag: ${tag2.name}`);
        }
        if (this.state !== S_BEGIN && this.state !== S_TEXT) {
          this.fail("unexpected end.");
        }
        const { text } = this;
        if (text.length !== 0) {
          (_a = this.textHandler) === null || _a === void 0 ? void 0 : _a.call(this, text);
          this.text = "";
        }
        this._closed = true;
        (_b = this.endHandler) === null || _b === void 0 ? void 0 : _b.call(this);
        this._init();
        return this;
      }
      /**
       * Resolve a namespace prefix.
       *
       * @param prefix The prefix to resolve.
       *
       * @returns The namespace URI or ``undefined`` if the prefix is not defined.
       */
      resolve(prefix) {
        var _a, _b;
        let uri = this.topNS[prefix];
        if (uri !== void 0) {
          return uri;
        }
        const { tags } = this;
        for (let index = tags.length - 1; index >= 0; index--) {
          uri = tags[index].ns[prefix];
          if (uri !== void 0) {
            return uri;
          }
        }
        uri = this.ns[prefix];
        if (uri !== void 0) {
          return uri;
        }
        return (_b = (_a = this.opt).resolvePrefix) === null || _b === void 0 ? void 0 : _b.call(_a, prefix);
      }
      /**
       * Parse a qname into its prefix and local name parts.
       *
       * @param name The name to parse
       *
       * @returns
       */
      qname(name) {
        const colon = name.indexOf(":");
        if (colon === -1) {
          return { prefix: "", local: name };
        }
        const local = name.slice(colon + 1);
        const prefix = name.slice(0, colon);
        if (prefix === "" || local === "" || local.includes(":")) {
          this.fail(`malformed name: ${name}.`);
        }
        return { prefix, local };
      }
      processAttribsNS() {
        var _a;
        const { attribList } = this;
        const tag2 = this.tag;
        {
          const { prefix, local } = this.qname(tag2.name);
          tag2.prefix = prefix;
          tag2.local = local;
          const uri = tag2.uri = (_a = this.resolve(prefix)) !== null && _a !== void 0 ? _a : "";
          if (prefix !== "") {
            if (prefix === "xmlns") {
              this.fail('tags may not have "xmlns" as prefix.');
            }
            if (uri === "") {
              this.fail(`unbound namespace prefix: ${JSON.stringify(prefix)}.`);
              tag2.uri = prefix;
            }
          }
        }
        if (attribList.length === 0) {
          return;
        }
        const { attributes } = tag2;
        const seen = /* @__PURE__ */ new Set();
        for (const attr of attribList) {
          const { name, prefix, local } = attr;
          let uri;
          let eqname;
          if (prefix === "") {
            uri = name === "xmlns" ? XMLNS_NAMESPACE : "";
            eqname = name;
          } else {
            uri = this.resolve(prefix);
            if (uri === void 0) {
              this.fail(`unbound namespace prefix: ${JSON.stringify(prefix)}.`);
              uri = prefix;
            }
            eqname = `{${uri}}${local}`;
          }
          if (seen.has(eqname)) {
            this.fail(`duplicate attribute: ${eqname}.`);
          }
          seen.add(eqname);
          attr.uri = uri;
          attributes[name] = attr;
        }
        this.attribList = [];
      }
      processAttribsPlain() {
        const { attribList } = this;
        const attributes = this.tag.attributes;
        for (const { name, value } of attribList) {
          if (attributes[name] !== void 0) {
            this.fail(`duplicate attribute: ${name}.`);
          }
          attributes[name] = value;
        }
        this.attribList = [];
      }
      /**
       * Handle a complete open tag. This parser code calls this once it has seen
       * the whole tag. This method checks for well-formeness and then emits
       * ``onopentag``.
       */
      openTag() {
        var _a;
        this.processAttribs();
        const { tags } = this;
        const tag2 = this.tag;
        tag2.isSelfClosing = false;
        (_a = this.openTagHandler) === null || _a === void 0 ? void 0 : _a.call(this, tag2);
        tags.push(tag2);
        this.state = S_TEXT;
        this.name = "";
      }
      /**
       * Handle a complete self-closing tag. This parser code calls this once it has
       * seen the whole tag. This method checks for well-formeness and then emits
       * ``onopentag`` and ``onclosetag``.
       */
      openSelfClosingTag() {
        var _a, _b, _c;
        this.processAttribs();
        const { tags } = this;
        const tag2 = this.tag;
        tag2.isSelfClosing = true;
        (_a = this.openTagHandler) === null || _a === void 0 ? void 0 : _a.call(this, tag2);
        (_b = this.closeTagHandler) === null || _b === void 0 ? void 0 : _b.call(this, tag2);
        const top = this.tag = (_c = tags[tags.length - 1]) !== null && _c !== void 0 ? _c : null;
        if (top === null) {
          this.closedRoot = true;
        }
        this.state = S_TEXT;
        this.name = "";
      }
      /**
       * Handle a complete close tag. This parser code calls this once it has seen
       * the whole tag. This method checks for well-formeness and then emits
       * ``onclosetag``.
       */
      closeTag() {
        const { tags, name } = this;
        this.state = S_TEXT;
        this.name = "";
        if (name === "") {
          this.fail("weird empty close tag.");
          this.text += "</>";
          return;
        }
        const handler = this.closeTagHandler;
        let l = tags.length;
        while (l-- > 0) {
          const tag2 = this.tag = tags.pop();
          this.topNS = tag2.ns;
          handler === null || handler === void 0 ? void 0 : handler(tag2);
          if (tag2.name === name) {
            break;
          }
          this.fail("unexpected close tag.");
        }
        if (l === 0) {
          this.closedRoot = true;
        } else if (l < 0) {
          this.fail(`unmatched closing tag: ${name}.`);
          this.text += `</${name}>`;
        }
      }
      /**
       * Resolves an entity. Makes any necessary well-formedness checks.
       *
       * @param entity The entity to resolve.
       *
       * @returns The parsed entity.
       */
      parseEntity(entity) {
        if (entity[0] !== "#") {
          const defined = this.ENTITIES[entity];
          if (defined !== void 0) {
            return defined;
          }
          this.fail(this.isName(entity) ? "undefined entity." : "disallowed character in entity name.");
          return `&${entity};`;
        }
        let num = NaN;
        if (entity[1] === "x" && /^#x[0-9a-f]+$/i.test(entity)) {
          num = parseInt(entity.slice(2), 16);
        } else if (/^#[0-9]+$/.test(entity)) {
          num = parseInt(entity.slice(1), 10);
        }
        if (!this.isChar(num)) {
          this.fail("malformed character entity.");
          return `&${entity};`;
        }
        return String.fromCodePoint(num);
      }
    };
    exports.SaxesParser = SaxesParser2;
  }
});

// esm/utils/browser-buffer-decode.js
function bufferToString(chunk) {
  if (typeof chunk === "string") {
    return chunk;
  }
  if (textDecoder) {
    return textDecoder.decode(chunk);
  }
  return chunk.toString();
}
var textDecoder;
var init_browser_buffer_decode = __esm({
  "esm/utils/browser-buffer-decode.js"() {
    textDecoder = typeof TextDecoder === "undefined" ? null : new TextDecoder("utf-8");
  }
});

// esm/utils/parse-sax.js
var import_saxes, parse_sax_default;
var init_parse_sax = __esm({
  "esm/utils/parse-sax.js"() {
    import_saxes = __toESM(require_saxes(), 1);
    init_browser_buffer_decode();
    parse_sax_default = async function* (iterable) {
      const saxesParser = new import_saxes.SaxesParser();
      let error;
      saxesParser.on("error", (err) => {
        error = err;
      });
      let events = [];
      saxesParser.on("opentag", (value) => events.push({ eventType: "opentag", value }));
      saxesParser.on("text", (value) => events.push({ eventType: "text", value }));
      saxesParser.on("closetag", (value) => events.push({ eventType: "closetag", value }));
      for await (const chunk of iterable) {
        saxesParser.write(bufferToString(chunk));
        if (error)
          throw error;
        yield events;
        events = [];
      }
    };
  }
});

// esm/xlsx/xform/base-xform.js
var BaseXform, base_xform_default;
var init_base_xform = __esm({
  "esm/xlsx/xform/base-xform.js"() {
    init_parse_sax();
    init_xml_stream();
    BaseXform = class _BaseXform {
      // constructor(/* model, name */) {}
      // ============================================================
      // Virtual Interface
      prepare() {
      }
      render() {
      }
      parseOpen(node) {
      }
      parseText(text) {
      }
      parseClose(name) {
      }
      reconcile(model, options) {
      }
      // ============================================================
      reset() {
        this.model = null;
        if (this.map) {
          Object.values(this.map).forEach((xform) => {
            if (xform instanceof _BaseXform) {
              xform.reset();
            } else if (xform.xform) {
              xform.xform.reset();
            }
          });
        }
      }
      mergeModel(obj) {
        this.model = Object.assign(this.model || {}, obj);
      }
      async parse(saxParser) {
        for await (const events of saxParser) {
          for (const { eventType, value } of events) {
            if (eventType === "opentag") {
              this.parseOpen(value);
            } else if (eventType === "text") {
              this.parseText(value);
            } else if (eventType === "closetag") {
              if (!this.parseClose(value.name)) {
                return this.model;
              }
            }
          }
        }
        return this.model;
      }
      async parseStream(stream) {
        return this.parse(parse_sax_default(stream));
      }
      get xml() {
        return this.toXml(this.model);
      }
      toXml(model) {
        const xmlStream = new xml_stream_default();
        this.render(xmlStream, model);
        return xmlStream.xml;
      }
      // ============================================================
      // Useful Utilities
      static toAttribute(value, dflt, always = false) {
        if (value === void 0) {
          if (always) {
            return dflt;
          }
        } else if (always || value !== dflt) {
          return value.toString();
        }
        return void 0;
      }
      static toStringAttribute(value, dflt, always = false) {
        return _BaseXform.toAttribute(value, dflt, always);
      }
      static toStringValue(attr, dflt) {
        return attr === void 0 ? dflt : attr;
      }
      static toBoolAttribute(value, dflt, always = false) {
        if (value === void 0) {
          if (always) {
            return dflt;
          }
        } else if (always || value !== dflt) {
          return value ? "1" : "0";
        }
        return void 0;
      }
      static toBoolValue(attr, dflt) {
        return attr === void 0 ? dflt : attr === "1";
      }
      static toIntAttribute(value, dflt, always = false) {
        return _BaseXform.toAttribute(value, dflt, always);
      }
      static toIntValue(attr, dflt) {
        return attr === void 0 ? dflt : parseInt(attr, 10);
      }
      static toFloatAttribute(value, dflt, always = false) {
        return _BaseXform.toAttribute(value, dflt, always);
      }
      static toFloatValue(attr, dflt) {
        return attr === void 0 ? dflt : parseFloat(attr);
      }
    };
    base_xform_default = BaseXform;
  }
});

// esm/xlsx/xform/static-xform.js
function build(xmlStream, model) {
  xmlStream.openNode(model.tag, model.$);
  if (model.c) {
    model.c.forEach((child) => {
      build(xmlStream, child);
    });
  }
  if (model.t) {
    xmlStream.writeText(model.t);
  }
  xmlStream.closeNode();
}
var StaticXform, static_xform_default;
var init_static_xform = __esm({
  "esm/xlsx/xform/static-xform.js"() {
    init_base_xform();
    init_xml_stream();
    StaticXform = class extends base_xform_default {
      constructor(model) {
        super();
        this._model = model;
      }
      render(xmlStream) {
        if (!this._xml) {
          const stream = new xml_stream_default();
          build(stream, this._model);
          this._xml = stream.xml;
        }
        xmlStream.writeXml(this._xml);
      }
      parseOpen() {
        return true;
      }
      parseText() {
      }
      parseClose(name) {
        switch (name) {
          case this._model.tag:
            return false;
          default:
            return true;
        }
      }
    };
    static_xform_default = StaticXform;
  }
});

// esm/xlsx/xform/style/color-xform.js
var ColorXform, color_xform_default;
var init_color_xform = __esm({
  "esm/xlsx/xform/style/color-xform.js"() {
    init_base_xform();
    ColorXform = class extends base_xform_default {
      constructor(name) {
        super();
        this.name = name || "color";
      }
      get tag() {
        return this.name;
      }
      render(xmlStream, model) {
        if (model) {
          xmlStream.openNode(this.name);
          if (model.argb) {
            xmlStream.addAttribute("rgb", model.argb);
          } else if (model.theme !== void 0) {
            xmlStream.addAttribute("theme", model.theme);
            if (model.tint !== void 0) {
              xmlStream.addAttribute("tint", model.tint);
            }
          } else if (model.indexed !== void 0) {
            xmlStream.addAttribute("indexed", model.indexed);
          } else {
            xmlStream.addAttribute("auto", "1");
          }
          xmlStream.closeNode();
          return true;
        }
        return false;
      }
      parseOpen(node) {
        if (node.name === this.name) {
          if (node.attributes.rgb) {
            this.model = { argb: node.attributes.rgb };
          } else if (node.attributes.theme) {
            this.model = { theme: parseInt(node.attributes.theme, 10) };
            if (node.attributes.tint) {
              this.model.tint = parseFloat(node.attributes.tint);
            }
          } else if (node.attributes.indexed) {
            this.model = { indexed: parseInt(node.attributes.indexed, 10) };
          } else {
            this.model = void 0;
          }
          return true;
        }
        return false;
      }
      parseText() {
      }
      parseClose() {
        return false;
      }
    };
    color_xform_default = ColorXform;
  }
});

// esm/xlsx/xform/simple/boolean-xform.js
var BooleanXform, boolean_xform_default;
var init_boolean_xform = __esm({
  "esm/xlsx/xform/simple/boolean-xform.js"() {
    init_base_xform();
    BooleanXform = class extends base_xform_default {
      constructor(options) {
        super();
        this.tag = options.tag;
        this.attr = options.attr;
      }
      render(xmlStream, model) {
        if (model) {
          xmlStream.openNode(this.tag);
          xmlStream.closeNode();
        }
      }
      parseOpen(node) {
        if (node.name === this.tag) {
          this.model = true;
        }
      }
      parseText() {
      }
      parseClose() {
        return false;
      }
    };
    boolean_xform_default = BooleanXform;
  }
});

// esm/xlsx/xform/simple/integer-xform.js
var IntegerXform, integer_xform_default;
var init_integer_xform = __esm({
  "esm/xlsx/xform/simple/integer-xform.js"() {
    init_base_xform();
    IntegerXform = class extends base_xform_default {
      constructor(options) {
        super();
        this.tag = options.tag;
        this.attr = options.attr;
        this.attrs = options.attrs;
        this.zero = options.zero;
      }
      render(xmlStream, model) {
        if (model || this.zero) {
          xmlStream.openNode(this.tag);
          if (this.attrs) {
            xmlStream.addAttributes(this.attrs);
          }
          if (this.attr) {
            xmlStream.addAttribute(this.attr, model);
          } else {
            xmlStream.writeText(model);
          }
          xmlStream.closeNode();
        }
      }
      parseOpen(node) {
        if (node.name === this.tag) {
          if (this.attr) {
            this.model = parseInt(node.attributes[this.attr], 10);
          } else {
            this.text = [];
          }
          return true;
        }
        return false;
      }
      parseText(text) {
        if (!this.attr) {
          this.text.push(text);
        }
      }
      parseClose() {
        if (!this.attr) {
          this.model = parseInt(this.text.join("") || 0, 10);
        }
        return false;
      }
    };
    integer_xform_default = IntegerXform;
  }
});

// esm/xlsx/xform/simple/string-xform.js
var StringXform, string_xform_default;
var init_string_xform = __esm({
  "esm/xlsx/xform/simple/string-xform.js"() {
    init_base_xform();
    StringXform = class extends base_xform_default {
      constructor(options) {
        super();
        this.tag = options.tag;
        this.attr = options.attr;
        this.attrs = options.attrs;
      }
      render(xmlStream, model) {
        if (model !== void 0) {
          xmlStream.openNode(this.tag);
          if (this.attrs) {
            xmlStream.addAttributes(this.attrs);
          }
          if (this.attr) {
            xmlStream.addAttribute(this.attr, model);
          } else {
            xmlStream.writeText(model);
          }
          xmlStream.closeNode();
        }
      }
      parseOpen(node) {
        if (node.name === this.tag) {
          if (this.attr) {
            this.model = node.attributes[this.attr];
          } else {
            this.text = [];
          }
        }
      }
      parseText(text) {
        if (!this.attr) {
          this.text.push(text);
        }
      }
      parseClose() {
        if (!this.attr) {
          this.model = this.text.join("");
        }
        return false;
      }
    };
    string_xform_default = StringXform;
  }
});

// esm/xlsx/xform/style/underline-xform.js
var UnderlineXform, underline_xform_default;
var init_underline_xform = __esm({
  "esm/xlsx/xform/style/underline-xform.js"() {
    init_base_xform();
    UnderlineXform = class _UnderlineXform extends base_xform_default {
      constructor(model) {
        super();
        this.model = model;
      }
      get tag() {
        return "u";
      }
      render(xmlStream, model) {
        model = model || this.model;
        if (model === true) {
          xmlStream.leafNode("u");
        } else {
          const attr = _UnderlineXform.Attributes[model];
          if (attr) {
            xmlStream.leafNode("u", attr);
          }
        }
      }
      parseOpen(node) {
        if (node.name === "u") {
          this.model = node.attributes.val || true;
        }
      }
      parseText() {
      }
      parseClose() {
        return false;
      }
    };
    UnderlineXform.Attributes = {
      single: {},
      double: { val: "double" },
      singleAccounting: { val: "singleAccounting" },
      doubleAccounting: { val: "doubleAccounting" }
    };
    underline_xform_default = UnderlineXform;
  }
});

// esm/xlsx/xform/style/font-xform.js
var FontXform, font_xform_default;
var init_font_xform = __esm({
  "esm/xlsx/xform/style/font-xform.js"() {
    init_color_xform();
    init_boolean_xform();
    init_integer_xform();
    init_string_xform();
    init_underline_xform();
    init_under_dash();
    init_base_xform();
    FontXform = class _FontXform extends base_xform_default {
      constructor(options) {
        super();
        this.options = options || _FontXform.OPTIONS;
        this.map = {
          b: { prop: "bold", xform: new boolean_xform_default({ tag: "b", attr: "val" }) },
          i: { prop: "italic", xform: new boolean_xform_default({ tag: "i", attr: "val" }) },
          u: { prop: "underline", xform: new underline_xform_default() },
          charset: { prop: "charset", xform: new integer_xform_default({ tag: "charset", attr: "val" }) },
          color: { prop: "color", xform: new color_xform_default() },
          condense: { prop: "condense", xform: new boolean_xform_default({ tag: "condense", attr: "val" }) },
          extend: { prop: "extend", xform: new boolean_xform_default({ tag: "extend", attr: "val" }) },
          family: { prop: "family", xform: new integer_xform_default({ tag: "family", attr: "val" }) },
          outline: { prop: "outline", xform: new boolean_xform_default({ tag: "outline", attr: "val" }) },
          vertAlign: { prop: "vertAlign", xform: new string_xform_default({ tag: "vertAlign", attr: "val" }) },
          scheme: { prop: "scheme", xform: new string_xform_default({ tag: "scheme", attr: "val" }) },
          shadow: { prop: "shadow", xform: new boolean_xform_default({ tag: "shadow", attr: "val" }) },
          strike: { prop: "strike", xform: new boolean_xform_default({ tag: "strike", attr: "val" }) },
          sz: { prop: "size", xform: new integer_xform_default({ tag: "sz", attr: "val" }) }
        };
        this.map[this.options.fontNameTag] = {
          prop: "name",
          xform: new string_xform_default({ tag: this.options.fontNameTag, attr: "val" })
        };
      }
      get tag() {
        return this.options.tagName;
      }
      render(xmlStream, model) {
        const { map: map2 } = this;
        xmlStream.openNode(this.options.tagName);
        each(this.map, (defn, tag2) => {
          map2[tag2].xform.render(xmlStream, model[defn.prop]);
        });
        xmlStream.closeNode();
      }
      parseOpen(node) {
        if (this.parser) {
          this.parser.parseOpen(node);
          return true;
        }
        if (this.map[node.name]) {
          this.parser = this.map[node.name].xform;
          return this.parser.parseOpen(node);
        }
        switch (node.name) {
          case this.options.tagName:
            this.model = {};
            return true;
          default:
            return false;
        }
      }
      parseText(text) {
        if (this.parser) {
          this.parser.parseText(text);
        }
      }
      parseClose(name) {
        if (this.parser && !this.parser.parseClose(name)) {
          const item = this.map[name];
          if (this.parser.model) {
            this.model[item.prop] = this.parser.model;
          }
          this.parser = void 0;
          return true;
        }
        switch (name) {
          case this.options.tagName:
            return false;
          default:
            return true;
        }
      }
    };
    FontXform.OPTIONS = {
      tagName: "font",
      fontNameTag: "name"
    };
    font_xform_default = FontXform;
  }
});

// esm/xlsx/xform/strings/text-xform.js
var TextXform, text_xform_default;
var init_text_xform = __esm({
  "esm/xlsx/xform/strings/text-xform.js"() {
    init_base_xform();
    TextXform = class extends base_xform_default {
      get tag() {
        return "t";
      }
      render(xmlStream, model) {
        xmlStream.openNode("t");
        if (/^\s|\n|\s$/.test(model)) {
          xmlStream.addAttribute("xml:space", "preserve");
        }
        xmlStream.writeText(model);
        xmlStream.closeNode();
      }
      get model() {
        return this._text.join("").replace(/_x([0-9A-F]{4})_/g, ($0, $1) => String.fromCharCode(parseInt($1, 16)));
      }
      parseOpen(node) {
        switch (node.name) {
          case "t":
            this._text = [];
            return true;
          default:
            return false;
        }
      }
      parseText(text) {
        this._text.push(text);
      }
      parseClose() {
        return false;
      }
    };
    text_xform_default = TextXform;
  }
});

// esm/xlsx/xform/strings/rich-text-xform.js
var RichTextXform, rich_text_xform_default;
var init_rich_text_xform = __esm({
  "esm/xlsx/xform/strings/rich-text-xform.js"() {
    init_text_xform();
    init_font_xform();
    init_base_xform();
    RichTextXform = class _RichTextXform extends base_xform_default {
      constructor(model) {
        super();
        this.model = model;
      }
      get tag() {
        return "r";
      }
      get textXform() {
        return this._textXform || (this._textXform = new text_xform_default());
      }
      get fontXform() {
        return this._fontXform || (this._fontXform = new font_xform_default(_RichTextXform.FONT_OPTIONS));
      }
      render(xmlStream, model) {
        model = model || this.model;
        xmlStream.openNode("r");
        if (model.font) {
          this.fontXform.render(xmlStream, model.font);
        }
        this.textXform.render(xmlStream, model.text);
        xmlStream.closeNode();
      }
      parseOpen(node) {
        if (this.parser) {
          this.parser.parseOpen(node);
          return true;
        }
        switch (node.name) {
          case "r":
            this.model = {};
            return true;
          case "t":
            this.parser = this.textXform;
            this.parser.parseOpen(node);
            return true;
          case "rPr":
            this.parser = this.fontXform;
            this.parser.parseOpen(node);
            return true;
          default:
            return false;
        }
      }
      parseText(text) {
        if (this.parser) {
          this.parser.parseText(text);
        }
      }
      parseClose(name) {
        switch (name) {
          case "r":
            return false;
          case "t":
            this.model.text = this.parser.model;
            this.parser = void 0;
            return true;
          case "rPr":
            this.model.font = this.parser.model;
            this.parser = void 0;
            return true;
          default:
            if (this.parser) {
              this.parser.parseClose(name);
            }
            return true;
        }
      }
    };
    RichTextXform.FONT_OPTIONS = {
      tagName: "rPr",
      fontNameTag: "rFont"
    };
    rich_text_xform_default = RichTextXform;
  }
});

// esm/xlsx/xform/drawing/base-cell-anchor-xform.js
var BaseCellAnchorXform, base_cell_anchor_xform_default;
var init_base_cell_anchor_xform = __esm({
  "esm/xlsx/xform/drawing/base-cell-anchor-xform.js"() {
    init_base_xform();
    BaseCellAnchorXform = class extends base_xform_default {
      parseOpen(node) {
        if (this.parser) {
          this.parser.parseOpen(node);
          return true;
        }
        switch (node.name) {
          case this.tag:
            this.reset();
            this.model = {
              range: {
                editAs: node.attributes.editAs || "oneCell"
              }
            };
            break;
          default:
            this.parser = this.map[node.name];
            if (this.parser) {
              this.parser.parseOpen(node);
            }
            break;
        }
        return true;
      }
      parseText(text) {
        if (this.parser) {
          this.parser.parseText(text);
        }
      }
      reconcilePicture(model, options) {
        if (model && model.rId) {
          const rel = options.rels[model.rId];
          const match = rel.Target.match(/.*\/media\/(.+[.][a-zA-Z]{3,4})/);
          if (match) {
            const name = match[1];
            const mediaId = options.mediaIndex[name];
            return options.media[mediaId];
          }
        }
        return void 0;
      }
    };
    base_cell_anchor_xform_default = BaseCellAnchorXform;
  }
});

// esm/xlsx/xform/drawing/cell-position-xform.js
var CellPositionXform, cell_position_xform_default;
var init_cell_position_xform = __esm({
  "esm/xlsx/xform/drawing/cell-position-xform.js"() {
    init_base_xform();
    init_integer_xform();
    CellPositionXform = class extends base_xform_default {
      constructor(options) {
        super();
        this.tag = options.tag;
        this.map = {
          "xdr:col": new integer_xform_default({ tag: "xdr:col", zero: true }),
          "xdr:colOff": new integer_xform_default({ tag: "xdr:colOff", zero: true }),
          "xdr:row": new integer_xform_default({ tag: "xdr:row", zero: true }),
          "xdr:rowOff": new integer_xform_default({ tag: "xdr:rowOff", zero: true })
        };
      }
      render(xmlStream, model) {
        xmlStream.openNode(this.tag);
        this.map["xdr:col"].render(xmlStream, model.nativeCol);
        this.map["xdr:colOff"].render(xmlStream, model.nativeColOff);
        this.map["xdr:row"].render(xmlStream, model.nativeRow);
        this.map["xdr:rowOff"].render(xmlStream, model.nativeRowOff);
        xmlStream.closeNode();
      }
      parseOpen(node) {
        if (this.parser) {
          this.parser.parseOpen(node);
          return true;
        }
        switch (node.name) {
          case this.tag:
            this.reset();
            break;
          default:
            this.parser = this.map[node.name];
            if (this.parser) {
              this.parser.parseOpen(node);
            }
            break;
        }
        return true;
      }
      parseText(text) {
        if (this.parser) {
          this.parser.parseText(text);
        }
      }
      parseClose(name) {
        if (this.parser) {
          if (!this.parser.parseClose(name)) {
            this.parser = void 0;
          }
          return true;
        }
        switch (name) {
          case this.tag:
            this.model = {
              nativeCol: this.map["xdr:col"].model,
              nativeColOff: this.map["xdr:colOff"].model,
              nativeRow: this.map["xdr:row"].model,
              nativeRowOff: this.map["xdr:rowOff"].model
            };
            return false;
          default:
            return true;
        }
      }
    };
    cell_position_xform_default = CellPositionXform;
  }
});

// esm/xlsx/xform/drawing/blip-xform.js
var BlipXform, blip_xform_default;
var init_blip_xform = __esm({
  "esm/xlsx/xform/drawing/blip-xform.js"() {
    init_base_xform();
    BlipXform = class extends base_xform_default {
      get tag() {
        return "a:blip";
      }
      render(xmlStream, model) {
        xmlStream.leafNode(this.tag, {
          "xmlns:r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
          "r:embed": model.rId,
          cstate: "print"
        });
      }
      parseOpen(node) {
        switch (node.name) {
          case this.tag:
            this.model = {
              rId: node.attributes["r:embed"]
            };
            return true;
          default:
            return true;
        }
      }
      parseText() {
      }
      parseClose(name) {
        switch (name) {
          case this.tag:
            return false;
          default:
            return true;
        }
      }
    };
    blip_xform_default = BlipXform;
  }
});

// esm/xlsx/xform/drawing/blip-fill-xform.js
var BlipFillXform, blip_fill_xform_default;
var init_blip_fill_xform = __esm({
  "esm/xlsx/xform/drawing/blip-fill-xform.js"() {
    init_base_xform();
    init_blip_xform();
    BlipFillXform = class extends base_xform_default {
      constructor() {
        super();
        this.map = {
          "a:blip": new blip_xform_default()
        };
      }
      get tag() {
        return "xdr:blipFill";
      }
      render(xmlStream, model) {
        xmlStream.openNode(this.tag);
        this.map["a:blip"].render(xmlStream, model);
        xmlStream.openNode("a:stretch");
        xmlStream.leafNode("a:fillRect");
        xmlStream.closeNode();
        xmlStream.closeNode();
      }
      parseOpen(node) {
        if (this.parser) {
          this.parser.parseOpen(node);
          return true;
        }
        switch (node.name) {
          case this.tag:
            this.reset();
            break;
          default:
            this.parser = this.map[node.name];
            if (this.parser) {
              this.parser.parseOpen(node);
            }
            break;
        }
        return true;
      }
      parseText() {
      }
      parseClose(name) {
        if (this.parser) {
          if (!this.parser.parseClose(name)) {
            this.parser = void 0;
          }
          return true;
        }
        switch (name) {
          case this.tag:
            this.model = this.map["a:blip"].model;
            return false;
          default:
            return true;
        }
      }
    };
    blip_fill_xform_default = BlipFillXform;
  }
});

// esm/xlsx/xform/drawing/hlink-click-xform.js
var HLinkClickXform, hlink_click_xform_default;
var init_hlink_click_xform = __esm({
  "esm/xlsx/xform/drawing/hlink-click-xform.js"() {
    init_base_xform();
    HLinkClickXform = class extends base_xform_default {
      get tag() {
        return "a:hlinkClick";
      }
      render(xmlStream, model) {
        if (!(model.hyperlinks && model.hyperlinks.rId)) {
          return;
        }
        xmlStream.leafNode(this.tag, {
          "xmlns:r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
          "r:id": model.hyperlinks.rId,
          tooltip: model.hyperlinks.tooltip
        });
      }
      parseOpen(node) {
        switch (node.name) {
          case this.tag:
            this.model = {
              hyperlinks: {
                rId: node.attributes["r:id"],
                tooltip: node.attributes.tooltip
              }
            };
            return true;
          default:
            return true;
        }
      }
      parseText() {
      }
      parseClose() {
        return false;
      }
    };
    hlink_click_xform_default = HLinkClickXform;
  }
});

// esm/xlsx/xform/drawing/ext-lst-xform.js
var ExtLstXform2, ext_lst_xform_default2;
var init_ext_lst_xform = __esm({
  "esm/xlsx/xform/drawing/ext-lst-xform.js"() {
    init_base_xform();
    ExtLstXform2 = class extends base_xform_default {
      get tag() {
        return "a:extLst";
      }
      render(xmlStream) {
        xmlStream.openNode(this.tag);
        xmlStream.openNode("a:ext", {
          uri: "{FF2B5EF4-FFF2-40B4-BE49-F238E27FC236}"
        });
        xmlStream.leafNode("a16:creationId", {
          "xmlns:a16": "http://schemas.microsoft.com/office/drawing/2014/main",
          id: "{00000000-0008-0000-0000-000002000000}"
        });
        xmlStream.closeNode();
        xmlStream.closeNode();
      }
      parseOpen(node) {
        switch (node.name) {
          case this.tag:
            return true;
          default:
            return true;
        }
      }
      parseText() {
      }
      parseClose(name) {
        switch (name) {
          case this.tag:
            return false;
          default:
            return true;
        }
      }
    };
    ext_lst_xform_default2 = ExtLstXform2;
  }
});

// esm/xlsx/xform/drawing/c-nv-pr-xform.js
var CNvPrXform, c_nv_pr_xform_default;
var init_c_nv_pr_xform = __esm({
  "esm/xlsx/xform/drawing/c-nv-pr-xform.js"() {
    init_base_xform();
    init_hlink_click_xform();
    init_ext_lst_xform();
    CNvPrXform = class extends base_xform_default {
      constructor() {
        super();
        this.map = {
          "a:hlinkClick": new hlink_click_xform_default(),
          "a:extLst": new ext_lst_xform_default2()
        };
      }
      get tag() {
        return "xdr:cNvPr";
      }
      render(xmlStream, model) {
        xmlStream.openNode(this.tag, {
          id: model.index,
          name: `Picture ${model.index}`
        });
        this.map["a:hlinkClick"].render(xmlStream, model);
        this.map["a:extLst"].render(xmlStream, model);
        xmlStream.closeNode();
      }
      parseOpen(node) {
        if (this.parser) {
          this.parser.parseOpen(node);
          return true;
        }
        switch (node.name) {
          case this.tag:
            this.reset();
            break;
          default:
            this.parser = this.map[node.name];
            if (this.parser) {
              this.parser.parseOpen(node);
            }
            break;
        }
        return true;
      }
      parseText() {
      }
      parseClose(name) {
        if (this.parser) {
          if (!this.parser.parseClose(name)) {
            this.parser = void 0;
          }
          return true;
        }
        switch (name) {
          case this.tag:
            this.model = this.map["a:hlinkClick"].model;
            return false;
          default:
            return true;
        }
      }
    };
    c_nv_pr_xform_default = CNvPrXform;
  }
});

// esm/xlsx/xform/drawing/c-nv-pic-pr-xform.js
var CNvPicPrXform, c_nv_pic_pr_xform_default;
var init_c_nv_pic_pr_xform = __esm({
  "esm/xlsx/xform/drawing/c-nv-pic-pr-xform.js"() {
    init_base_xform();
    CNvPicPrXform = class extends base_xform_default {
      get tag() {
        return "xdr:cNvPicPr";
      }
      render(xmlStream) {
        xmlStream.openNode(this.tag);
        xmlStream.leafNode("a:picLocks", {
          noChangeAspect: "1"
        });
        xmlStream.closeNode();
      }
      parseOpen(node) {
        switch (node.name) {
          case this.tag:
            return true;
          default:
            return true;
        }
      }
      parseText() {
      }
      parseClose(name) {
        switch (name) {
          case this.tag:
            return false;
          default:
            return true;
        }
      }
    };
    c_nv_pic_pr_xform_default = CNvPicPrXform;
  }
});

// esm/xlsx/xform/drawing/nv-pic-pr-xform.js
var NvPicPrXform, nv_pic_pr_xform_default;
var init_nv_pic_pr_xform = __esm({
  "esm/xlsx/xform/drawing/nv-pic-pr-xform.js"() {
    init_base_xform();
    init_c_nv_pr_xform();
    init_c_nv_pic_pr_xform();
    NvPicPrXform = class extends base_xform_default {
      constructor() {
        super();
        this.map = {
          "xdr:cNvPr": new c_nv_pr_xform_default(),
          "xdr:cNvPicPr": new c_nv_pic_pr_xform_default()
        };
      }
      get tag() {
        return "xdr:nvPicPr";
      }
      render(xmlStream, model) {
        xmlStream.openNode(this.tag);
        this.map["xdr:cNvPr"].render(xmlStream, model);
        this.map["xdr:cNvPicPr"].render(xmlStream, model);
        xmlStream.closeNode();
      }
      parseOpen(node) {
        if (this.parser) {
          this.parser.parseOpen(node);
          return true;
        }
        switch (node.name) {
          case this.tag:
            this.reset();
            break;
          default:
            this.parser = this.map[node.name];
            if (this.parser) {
              this.parser.parseOpen(node);
            }
            break;
        }
        return true;
      }
      parseText() {
      }
      parseClose(name) {
        if (this.parser) {
          if (!this.parser.parseClose(name)) {
            this.parser = void 0;
          }
          return true;
        }
        switch (name) {
          case this.tag:
            this.model = this.map["xdr:cNvPr"].model;
            return false;
          default:
            return true;
        }
      }
    };
    nv_pic_pr_xform_default = NvPicPrXform;
  }
});

// esm/xlsx/xform/drawing/sp-pr.js
var tag, c, sp_pr_default;
var init_sp_pr = __esm({
  "esm/xlsx/xform/drawing/sp-pr.js"() {
    tag = "xdr:spPr";
    c = [
      {
        tag: "a:xfrm",
        c: [
          { tag: "a:off", $: { x: "0", y: "0" } },
          { tag: "a:ext", $: { cx: "0", cy: "0" } }
        ]
      },
      {
        tag: "a:prstGeom",
        $: { prst: "rect" },
        c: [{ tag: "a:avLst" }]
      }
    ];
    sp_pr_default = {
      tag,
      c
    };
  }
});

// esm/xlsx/xform/drawing/pic-xform.js
var PicXform, pic_xform_default;
var init_pic_xform = __esm({
  "esm/xlsx/xform/drawing/pic-xform.js"() {
    init_base_xform();
    init_static_xform();
    init_blip_fill_xform();
    init_nv_pic_pr_xform();
    init_sp_pr();
    PicXform = class extends base_xform_default {
      constructor() {
        super();
        this.map = {
          "xdr:nvPicPr": new nv_pic_pr_xform_default(),
          "xdr:blipFill": new blip_fill_xform_default(),
          "xdr:spPr": new static_xform_default(sp_pr_default)
        };
      }
      get tag() {
        return "xdr:pic";
      }
      prepare(model, options) {
        model.index = options.index + 1;
      }
      render(xmlStream, model) {
        xmlStream.openNode(this.tag);
        this.map["xdr:nvPicPr"].render(xmlStream, model);
        this.map["xdr:blipFill"].render(xmlStream, model);
        this.map["xdr:spPr"].render(xmlStream, model);
        xmlStream.closeNode();
      }
      parseOpen(node) {
        if (this.parser) {
          this.parser.parseOpen(node);
          return true;
        }
        switch (node.name) {
          case this.tag:
            this.reset();
            break;
          default:
            this.parser = this.map[node.name];
            if (this.parser) {
              this.parser.parseOpen(node);
            }
            break;
        }
        return true;
      }
      parseText() {
      }
      parseClose(name) {
        if (this.parser) {
          if (!this.parser.parseClose(name)) {
            this.mergeModel(this.parser.model);
            this.parser = void 0;
          }
          return true;
        }
        switch (name) {
          case this.tag:
            return false;
          default:
            return true;
        }
      }
    };
    pic_xform_default = PicXform;
  }
});

// esm/xlsx/xform/drawing/two-cell-anchor-xform.js
var TwoCellAnchorXform, two_cell_anchor_xform_default;
var init_two_cell_anchor_xform = __esm({
  "esm/xlsx/xform/drawing/two-cell-anchor-xform.js"() {
    init_base_cell_anchor_xform();
    init_static_xform();
    init_cell_position_xform();
    init_pic_xform();
    TwoCellAnchorXform = class extends base_cell_anchor_xform_default {
      constructor() {
        super();
        this.map = {
          "xdr:from": new cell_position_xform_default({ tag: "xdr:from" }),
          "xdr:to": new cell_position_xform_default({ tag: "xdr:to" }),
          "xdr:pic": new pic_xform_default(),
          "xdr:clientData": new static_xform_default({ tag: "xdr:clientData" })
        };
      }
      get tag() {
        return "xdr:twoCellAnchor";
      }
      prepare(model, options) {
        this.map["xdr:pic"].prepare(model.picture, options);
      }
      render(xmlStream, model) {
        xmlStream.openNode(this.tag, { editAs: model.range.editAs || "oneCell" });
        this.map["xdr:from"].render(xmlStream, model.range.tl);
        this.map["xdr:to"].render(xmlStream, model.range.br);
        this.map["xdr:pic"].render(xmlStream, model.picture);
        this.map["xdr:clientData"].render(xmlStream, {});
        xmlStream.closeNode();
      }
      parseClose(name) {
        if (this.parser) {
          if (!this.parser.parseClose(name)) {
            this.parser = void 0;
          }
          return true;
        }
        switch (name) {
          case this.tag:
            this.model.range.tl = this.map["xdr:from"].model;
            this.model.range.br = this.map["xdr:to"].model;
            this.model.picture = this.map["xdr:pic"].model;
            return false;
          default:
            return true;
        }
      }
      reconcile(model, options) {
        model.medium = this.reconcilePicture(model.picture, options);
      }
    };
    two_cell_anchor_xform_default = TwoCellAnchorXform;
  }
});

// esm/xlsx/xform/drawing/ext-xform.js
var EMU_PER_PIXEL_AT_96_DPI, ExtXform3, ext_xform_default;
var init_ext_xform = __esm({
  "esm/xlsx/xform/drawing/ext-xform.js"() {
    init_base_xform();
    EMU_PER_PIXEL_AT_96_DPI = 9525;
    ExtXform3 = class extends base_xform_default {
      constructor(options) {
        super();
        this.tag = options.tag;
        this.map = {};
      }
      render(xmlStream, model) {
        xmlStream.openNode(this.tag);
        const width = Math.floor(model.width * EMU_PER_PIXEL_AT_96_DPI);
        const height = Math.floor(model.height * EMU_PER_PIXEL_AT_96_DPI);
        xmlStream.addAttribute("cx", width);
        xmlStream.addAttribute("cy", height);
        xmlStream.closeNode();
      }
      parseOpen(node) {
        if (node.name === this.tag) {
          this.model = {
            width: parseInt(node.attributes.cx || "0", 10) / EMU_PER_PIXEL_AT_96_DPI,
            height: parseInt(node.attributes.cy || "0", 10) / EMU_PER_PIXEL_AT_96_DPI
          };
          return true;
        }
        return false;
      }
      parseText() {
      }
      parseClose() {
        return false;
      }
    };
    ext_xform_default = ExtXform3;
  }
});

// esm/xlsx/xform/drawing/one-cell-anchor-xform.js
var OneCellAnchorXform, one_cell_anchor_xform_default;
var init_one_cell_anchor_xform = __esm({
  "esm/xlsx/xform/drawing/one-cell-anchor-xform.js"() {
    init_base_cell_anchor_xform();
    init_static_xform();
    init_cell_position_xform();
    init_ext_xform();
    init_pic_xform();
    OneCellAnchorXform = class extends base_cell_anchor_xform_default {
      constructor() {
        super();
        this.map = {
          "xdr:from": new cell_position_xform_default({ tag: "xdr:from" }),
          "xdr:ext": new ext_xform_default({ tag: "xdr:ext" }),
          "xdr:pic": new pic_xform_default(),
          "xdr:clientData": new static_xform_default({ tag: "xdr:clientData" })
        };
      }
      get tag() {
        return "xdr:oneCellAnchor";
      }
      prepare(model, options) {
        this.map["xdr:pic"].prepare(model.picture, options);
      }
      render(xmlStream, model) {
        xmlStream.openNode(this.tag, { editAs: model.range.editAs || "oneCell" });
        this.map["xdr:from"].render(xmlStream, model.range.tl);
        this.map["xdr:ext"].render(xmlStream, model.range.ext);
        this.map["xdr:pic"].render(xmlStream, model.picture);
        this.map["xdr:clientData"].render(xmlStream, {});
        xmlStream.closeNode();
      }
      parseClose(name) {
        if (this.parser) {
          if (!this.parser.parseClose(name)) {
            this.parser = void 0;
          }
          return true;
        }
        switch (name) {
          case this.tag:
            this.model.range.tl = this.map["xdr:from"].model;
            this.model.range.ext = this.map["xdr:ext"].model;
            this.model.picture = this.map["xdr:pic"].model;
            return false;
          default:
            return true;
        }
      }
      reconcile(model, options) {
        model.medium = this.reconcilePicture(model.picture, options);
      }
    };
    one_cell_anchor_xform_default = OneCellAnchorXform;
  }
});

// esm/xlsx/xform/drawing/drawing-xform.js
var drawing_xform_exports = {};
__export(drawing_xform_exports, {
  default: () => drawing_xform_default2
});
function getAnchorType(model) {
  const range2 = typeof model.range === "string" ? decode(model.range) : model.range;
  return range2.br ? "xdr:twoCellAnchor" : "xdr:oneCellAnchor";
}
var DrawingXform2, drawing_xform_default2;
var init_drawing_xform = __esm({
  "esm/xlsx/xform/drawing/drawing-xform.js"() {
    init_col_cache();
    init_xml_stream();
    init_base_xform();
    init_two_cell_anchor_xform();
    init_one_cell_anchor_xform();
    DrawingXform2 = class _DrawingXform extends base_xform_default {
      constructor() {
        super();
        this.map = {
          "xdr:twoCellAnchor": new two_cell_anchor_xform_default(),
          "xdr:oneCellAnchor": new one_cell_anchor_xform_default()
        };
      }
      prepare(model) {
        model.anchors.forEach((item, index) => {
          item.anchorType = getAnchorType(item);
          const anchor = this.map[item.anchorType];
          anchor.prepare(item, { index });
        });
      }
      get tag() {
        return "xdr:wsDr";
      }
      render(xmlStream, model) {
        xmlStream.openXml(xml_stream_default.StdDocAttributes);
        xmlStream.openNode(this.tag, _DrawingXform.DRAWING_ATTRIBUTES);
        model.anchors.forEach((item) => {
          const anchor = this.map[item.anchorType];
          anchor.render(xmlStream, item);
        });
        xmlStream.closeNode();
      }
      parseOpen(node) {
        if (this.parser) {
          this.parser.parseOpen(node);
          return true;
        }
        switch (node.name) {
          case this.tag:
            this.reset();
            this.model = {
              anchors: []
            };
            break;
          default:
            this.parser = this.map[node.name];
            if (this.parser) {
              this.parser.parseOpen(node);
            }
            break;
        }
        return true;
      }
      parseText(text) {
        if (this.parser) {
          this.parser.parseText(text);
        }
      }
      parseClose(name) {
        if (this.parser) {
          if (!this.parser.parseClose(name)) {
            this.model.anchors.push(this.parser.model);
            this.parser = void 0;
          }
          return true;
        }
        switch (name) {
          case this.tag:
            return false;
          default:
            return true;
        }
      }
      reconcile(model, options) {
        model.anchors.forEach((anchor) => {
          if (anchor.br) {
            this.map["xdr:twoCellAnchor"].reconcile(anchor, options);
          } else {
            this.map["xdr:oneCellAnchor"].reconcile(anchor, options);
          }
        });
      }
    };
    DrawingXform2.DRAWING_ATTRIBUTES = {
      "xmlns:xdr": "http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing",
      "xmlns:a": "http://schemas.openxmlformats.org/drawingml/2006/main"
    };
    drawing_xform_default2 = DrawingXform2;
  }
});

// esm/xlsx/xform/comment/comment-xform.js
var init_comment_xform = __esm({
  "esm/xlsx/xform/comment/comment-xform.js"() {
    init_rich_text_xform();
    init_base_xform();
  }
});

// esm/xlsx/xform/comment/comments-xform.js
var comments_xform_exports = {};
__export(comments_xform_exports, {
  default: () => comments_xform_default
});
var comments_xform_default;
var init_comments_xform = __esm({
  "esm/xlsx/xform/comment/comments-xform.js"() {
    init_xml_stream();
    init_base_xform();
    init_comment_xform();
    comments_xform_default = CommentsXform;
  }
});

// esm/xlsx/xform/comment/vml-textbox-xform.js
var VmlTextboxXform, vml_textbox_xform_default;
var init_vml_textbox_xform = __esm({
  "esm/xlsx/xform/comment/vml-textbox-xform.js"() {
    init_base_xform();
    VmlTextboxXform = class extends base_xform_default {
      get tag() {
        return "v:textbox";
      }
      conversionUnit(value, multiple, unit) {
        return `${parseFloat(value) * multiple.toFixed(2)}${unit}`;
      }
      reverseConversionUnit(inset) {
        return (inset || "").split(",").map((margin) => {
          return Number(parseFloat(this.conversionUnit(parseFloat(margin), 0.1, "")).toFixed(2));
        });
      }
      render(xmlStream, model) {
        const attributes = {
          style: "mso-direction-alt:auto"
        };
        if (model && model.note) {
          let { inset } = model.note && model.note.margins;
          if (Array.isArray(inset)) {
            inset = inset.map((margin) => {
              return this.conversionUnit(margin, 10, "mm");
            }).join(",");
          }
          if (inset) {
            attributes.inset = inset;
          }
        }
        xmlStream.openNode("v:textbox", attributes);
        xmlStream.leafNode("div", { style: "text-align:left" });
        xmlStream.closeNode();
      }
      parseOpen(node) {
        switch (node.name) {
          case this.tag:
            this.model = {
              inset: this.reverseConversionUnit(node.attributes.inset)
            };
            return true;
          default:
            return true;
        }
      }
      parseText() {
      }
      parseClose(name) {
        switch (name) {
          case this.tag:
            return false;
          default:
            return true;
        }
      }
    };
    vml_textbox_xform_default = VmlTextboxXform;
  }
});

// esm/xlsx/xform/comment/vml-anchor-xform.js
var VmlAnchorXform, vml_anchor_xform_default;
var init_vml_anchor_xform = __esm({
  "esm/xlsx/xform/comment/vml-anchor-xform.js"() {
    init_base_xform();
    VmlAnchorXform = class extends base_xform_default {
      get tag() {
        return "x:Anchor";
      }
      getAnchorRect(anchor) {
        const l = Math.floor(anchor.left);
        const lf = Math.floor((anchor.left - l) * 68);
        const t = Math.floor(anchor.top);
        const tf = Math.floor((anchor.top - t) * 18);
        const r = Math.floor(anchor.right);
        const rf = Math.floor((anchor.right - r) * 68);
        const b = Math.floor(anchor.bottom);
        const bf = Math.floor((anchor.bottom - b) * 18);
        return [l, lf, t, tf, r, rf, b, bf];
      }
      getDefaultRect(ref) {
        const l = ref.col;
        const lf = 6;
        const t = Math.max(ref.row - 2, 0);
        const tf = 14;
        const r = l + 2;
        const rf = 2;
        const b = t + 4;
        const bf = 16;
        return [l, lf, t, tf, r, rf, b, bf];
      }
      render(xmlStream, model) {
        const rect = model.anchor ? this.getAnchorRect(model.anchor) : this.getDefaultRect(model.refAddress);
        xmlStream.leafNode("x:Anchor", null, rect.join(", "));
      }
      parseOpen(node) {
        switch (node.name) {
          case this.tag:
            this.text = "";
            return true;
          default:
            return false;
        }
      }
      parseText(text) {
        this.text = text;
      }
      parseClose() {
        return false;
      }
    };
    vml_anchor_xform_default = VmlAnchorXform;
  }
});

// esm/xlsx/xform/comment/style/vml-protection-xform.js
var VmlProtectionXform, vml_protection_xform_default;
var init_vml_protection_xform = __esm({
  "esm/xlsx/xform/comment/style/vml-protection-xform.js"() {
    init_base_xform();
    VmlProtectionXform = class extends base_xform_default {
      constructor(model) {
        super();
        this._model = model;
      }
      get tag() {
        return this._model && this._model.tag;
      }
      render(xmlStream, model) {
        xmlStream.leafNode(this.tag, null, model);
      }
      parseOpen(node) {
        switch (node.name) {
          case this.tag:
            this.text = "";
            return true;
          default:
            return false;
        }
      }
      parseText(text) {
        this.text = text;
      }
      parseClose() {
        return false;
      }
    };
    vml_protection_xform_default = VmlProtectionXform;
  }
});

// esm/xlsx/xform/comment/style/vml-position-xform.js
var VmlPositionXform, vml_position_xform_default;
var init_vml_position_xform = __esm({
  "esm/xlsx/xform/comment/style/vml-position-xform.js"() {
    init_base_xform();
    VmlPositionXform = class extends base_xform_default {
      constructor(model) {
        super();
        this._model = model;
      }
      get tag() {
        return this._model && this._model.tag;
      }
      render(xmlStream, model, type) {
        if (model === type[2]) {
          xmlStream.leafNode(this.tag);
        } else if (this.tag === "x:SizeWithCells" && model === type[1]) {
          xmlStream.leafNode(this.tag);
        }
      }
      parseOpen(node) {
        switch (node.name) {
          case this.tag:
            this.model = {};
            this.model[this.tag] = true;
            return true;
          default:
            return false;
        }
      }
      parseText() {
      }
      parseClose() {
        return false;
      }
    };
    vml_position_xform_default = VmlPositionXform;
  }
});

// esm/xlsx/xform/comment/vml-client-data-xform.js
var POSITION_TYPE, VmlClientDataXform, vml_client_data_xform_default;
var init_vml_client_data_xform = __esm({
  "esm/xlsx/xform/comment/vml-client-data-xform.js"() {
    init_base_xform();
    init_vml_anchor_xform();
    init_vml_protection_xform();
    init_vml_position_xform();
    POSITION_TYPE = ["twoCells", "oneCells", "absolute"];
    VmlClientDataXform = class extends base_xform_default {
      constructor() {
        super();
        this.map = {
          "x:Anchor": new vml_anchor_xform_default(),
          "x:Locked": new vml_protection_xform_default({ tag: "x:Locked" }),
          "x:LockText": new vml_protection_xform_default({ tag: "x:LockText" }),
          "x:SizeWithCells": new vml_position_xform_default({ tag: "x:SizeWithCells" }),
          "x:MoveWithCells": new vml_position_xform_default({ tag: "x:MoveWithCells" })
        };
      }
      get tag() {
        return "x:ClientData";
      }
      render(xmlStream, model) {
        const { protection, editAs } = model.note;
        xmlStream.openNode(this.tag, { ObjectType: "Note" });
        this.map["x:MoveWithCells"].render(xmlStream, editAs, POSITION_TYPE);
        this.map["x:SizeWithCells"].render(xmlStream, editAs, POSITION_TYPE);
        this.map["x:Anchor"].render(xmlStream, model);
        this.map["x:Locked"].render(xmlStream, protection.locked);
        xmlStream.leafNode("x:AutoFill", null, "False");
        this.map["x:LockText"].render(xmlStream, protection.lockText);
        xmlStream.leafNode("x:Row", null, model.refAddress.row - 1);
        xmlStream.leafNode("x:Column", null, model.refAddress.col - 1);
        xmlStream.closeNode();
      }
      parseOpen(node) {
        switch (node.name) {
          case this.tag:
            this.reset();
            this.model = {
              anchor: [],
              protection: {},
              editAs: ""
            };
            break;
          default:
            this.parser = this.map[node.name];
            if (this.parser) {
              this.parser.parseOpen(node);
            }
            break;
        }
        return true;
      }
      parseText(text) {
        if (this.parser) {
          this.parser.parseText(text);
        }
      }
      parseClose(name) {
        if (this.parser) {
          if (!this.parser.parseClose(name)) {
            this.parser = void 0;
          }
          return true;
        }
        switch (name) {
          case this.tag:
            this.normalizeModel();
            return false;
          default:
            return true;
        }
      }
      normalizeModel() {
        const position = Object.assign({}, this.map["x:MoveWithCells"].model, this.map["x:SizeWithCells"].model);
        const len = Object.keys(position).length;
        this.model.editAs = POSITION_TYPE[len];
        this.model.anchor = this.map["x:Anchor"].text;
        this.model.protection.locked = this.map["x:Locked"].text;
        this.model.protection.lockText = this.map["x:LockText"].text;
      }
    };
    vml_client_data_xform_default = VmlClientDataXform;
  }
});

// esm/xlsx/xform/comment/vml-shape-xform.js
var VmlShapeXform, vml_shape_xform_default;
var init_vml_shape_xform = __esm({
  "esm/xlsx/xform/comment/vml-shape-xform.js"() {
    init_base_xform();
    init_vml_textbox_xform();
    init_vml_client_data_xform();
    VmlShapeXform = class _VmlShapeXform extends base_xform_default {
      constructor() {
        super();
        this.map = {
          "v:textbox": new vml_textbox_xform_default(),
          "x:ClientData": new vml_client_data_xform_default()
        };
      }
      get tag() {
        return "v:shape";
      }
      render(xmlStream, model, index) {
        xmlStream.openNode("v:shape", _VmlShapeXform.V_SHAPE_ATTRIBUTES(model, index));
        xmlStream.leafNode("v:fill", { color2: "infoBackground [80]" });
        xmlStream.leafNode("v:shadow", { color: "none [81]", obscured: "t" });
        xmlStream.leafNode("v:path", { "o:connecttype": "none" });
        this.map["v:textbox"].render(xmlStream, model);
        this.map["x:ClientData"].render(xmlStream, model);
        xmlStream.closeNode();
      }
      parseOpen(node) {
        if (this.parser) {
          this.parser.parseOpen(node);
          return true;
        }
        switch (node.name) {
          case this.tag:
            this.reset();
            this.model = {
              margins: {
                insetmode: node.attributes["o:insetmode"]
              },
              anchor: "",
              editAs: "",
              protection: {}
            };
            break;
          default:
            this.parser = this.map[node.name];
            if (this.parser) {
              this.parser.parseOpen(node);
            }
            break;
        }
        return true;
      }
      parseText(text) {
        if (this.parser) {
          this.parser.parseText(text);
        }
      }
      parseClose(name) {
        if (this.parser) {
          if (!this.parser.parseClose(name)) {
            this.parser = void 0;
          }
          return true;
        }
        switch (name) {
          case this.tag:
            this.model.margins.inset = this.map["v:textbox"].model && this.map["v:textbox"].model.inset;
            this.model.protection = this.map["x:ClientData"].model && this.map["x:ClientData"].model.protection;
            this.model.anchor = this.map["x:ClientData"].model && this.map["x:ClientData"].model.anchor;
            this.model.editAs = this.map["x:ClientData"].model && this.map["x:ClientData"].model.editAs;
            return false;
          default:
            return true;
        }
      }
    };
    VmlShapeXform.V_SHAPE_ATTRIBUTES = (model, index) => ({
      id: `_x0000_s${1025 + index}`,
      type: "#_x0000_t202",
      style: "position:absolute; margin-left:105.3pt;margin-top:10.5pt;width:97.8pt;height:59.1pt;z-index:1;visibility:hidden",
      fillcolor: "infoBackground [80]",
      strokecolor: "none [81]",
      "o:insetmode": model.note.margins && model.note.margins.insetmode
    });
    vml_shape_xform_default = VmlShapeXform;
  }
});

// esm/xlsx/xform/comment/vml-notes-xform.js
var vml_notes_xform_exports = {};
__export(vml_notes_xform_exports, {
  default: () => vml_notes_xform_default
});
var VmlNotesXform, vml_notes_xform_default;
var init_vml_notes_xform = __esm({
  "esm/xlsx/xform/comment/vml-notes-xform.js"() {
    init_xml_stream();
    init_base_xform();
    init_vml_shape_xform();
    VmlNotesXform = class _VmlNotesXform extends base_xform_default {
      constructor() {
        super();
        this.map = {
          "v:shape": new vml_shape_xform_default()
        };
      }
      get tag() {
        return "xml";
      }
      render(xmlStream, model) {
        xmlStream.openXml(xml_stream_default.StdDocAttributes);
        xmlStream.openNode(this.tag, _VmlNotesXform.DRAWING_ATTRIBUTES);
        xmlStream.openNode("o:shapelayout", { "v:ext": "edit" });
        xmlStream.leafNode("o:idmap", { "v:ext": "edit", data: 1 });
        xmlStream.closeNode();
        xmlStream.openNode("v:shapetype", {
          id: "_x0000_t202",
          coordsize: "21600,21600",
          "o:spt": 202,
          path: "m,l,21600r21600,l21600,xe"
        });
        xmlStream.leafNode("v:stroke", { joinstyle: "miter" });
        xmlStream.leafNode("v:path", { gradientshapeok: "t", "o:connecttype": "rect" });
        xmlStream.closeNode();
        model.comments.forEach((item, index) => {
          this.map["v:shape"].render(xmlStream, item, index);
        });
        xmlStream.closeNode();
      }
      parseOpen(node) {
        if (this.parser) {
          this.parser.parseOpen(node);
          return true;
        }
        switch (node.name) {
          case this.tag:
            this.reset();
            this.model = {
              comments: []
            };
            break;
          default:
            this.parser = this.map[node.name];
            if (this.parser) {
              this.parser.parseOpen(node);
            }
            break;
        }
        return true;
      }
      parseText(text) {
        if (this.parser) {
          this.parser.parseText(text);
        }
      }
      parseClose(name) {
        if (this.parser) {
          if (!this.parser.parseClose(name)) {
            this.model.comments.push(this.parser.model);
            this.parser = void 0;
          }
          return true;
        }
        switch (name) {
          case this.tag:
            return false;
          default:
            return true;
        }
      }
      reconcile(model, options) {
        model.anchors.forEach((anchor) => {
          if (anchor.br) {
            this.map["xdr:twoCellAnchor"].reconcile(anchor, options);
          } else {
            this.map["xdr:oneCellAnchor"].reconcile(anchor, options);
          }
        });
      }
    };
    VmlNotesXform.DRAWING_ATTRIBUTES = {
      "xmlns:v": "urn:schemas-microsoft-com:vml",
      "xmlns:o": "urn:schemas-microsoft-com:office:office",
      "xmlns:x": "urn:schemas-microsoft-com:office:excel"
    };
    vml_notes_xform_default = VmlNotesXform;
  }
});

// esm/xlsx/xform/pivot-table/pivot-cache-records-xform.js
var pivot_cache_records_xform_exports = {};
__export(pivot_cache_records_xform_exports, {
  default: () => pivot_cache_records_xform_default
});
var PivotCacheRecordsXform, pivot_cache_records_xform_default;
var init_pivot_cache_records_xform = __esm({
  "esm/xlsx/xform/pivot-table/pivot-cache-records-xform.js"() {
    init_xml_stream();
    init_base_xform();
    PivotCacheRecordsXform = class _PivotCacheRecordsXform extends base_xform_default {
      constructor() {
        super();
        this.map = {};
      }
      prepare(model) {
      }
      get tag() {
        return "pivotCacheRecords";
      }
      render(xmlStream, model) {
        const { sourceSheet, cacheFields } = model;
        const sourceBodyRows = sourceSheet.getSheetValues().slice(2);
        xmlStream.openXml(xml_stream_default.StdDocAttributes);
        xmlStream.openNode(this.tag, {
          ..._PivotCacheRecordsXform.PIVOT_CACHE_RECORDS_ATTRIBUTES,
          count: sourceBodyRows.length
        });
        xmlStream.writeXml(renderTable());
        xmlStream.closeNode();
        function renderTable() {
          const rowsInXML = sourceBodyRows.map((row) => {
            const realRow = row.slice(1);
            return [...renderRowLines(realRow)].join("");
          });
          return rowsInXML.join("");
        }
        function* renderRowLines(row) {
          yield "\n  <r>";
          for (const [index, cellValue] of row.entries()) {
            yield "\n    ";
            yield renderCell(cellValue, cacheFields[index].sharedItems);
          }
          yield "\n  </r>";
        }
        function renderCell(value, sharedItems) {
          if (sharedItems === null) {
            if (Number.isFinite(value)) {
              return `<n v="${value}" />`;
            }
            return `<s v="${value}" />`;
          }
          const sharedItemsIndex = sharedItems.indexOf(value);
          if (sharedItemsIndex < 0) {
            throw new Error(`${JSON.stringify(value)} not in sharedItems ${JSON.stringify(sharedItems)}`);
          }
          return `<x v="${sharedItemsIndex}" />`;
        }
      }
      parseOpen(node) {
      }
      parseText(text) {
      }
      parseClose(name) {
      }
      reconcile(model, options) {
      }
    };
    PivotCacheRecordsXform.PIVOT_CACHE_RECORDS_ATTRIBUTES = {
      xmlns: "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
      "xmlns:r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
      "xmlns:mc": "http://schemas.openxmlformats.org/markup-compatibility/2006",
      "mc:Ignorable": "xr",
      "xmlns:xr": "http://schemas.microsoft.com/office/spreadsheetml/2014/revision"
    };
    pivot_cache_records_xform_default = PivotCacheRecordsXform;
  }
});

// esm/xlsx/xform/pivot-table/cache-field.js
var CacheField, cache_field_default;
var init_cache_field = __esm({
  "esm/xlsx/xform/pivot-table/cache-field.js"() {
    CacheField = class {
      constructor({ name, sharedItems }) {
        this.name = name;
        this.sharedItems = sharedItems;
      }
      render() {
        if (this.sharedItems === null) {
          return `<cacheField name="${this.name}" numFmtId="0">
      <sharedItems containsSemiMixedTypes="0" containsString="0" containsNumber="1" containsInteger="1" />
    </cacheField>`;
        }
        return `<cacheField name="${this.name}" numFmtId="0">
      <sharedItems count="${this.sharedItems.length}">
        ${this.sharedItems.map((item) => `<s v="${item}" />`).join("")}
      </sharedItems>
    </cacheField>`;
      }
    };
    cache_field_default = CacheField;
  }
});

// esm/xlsx/xform/pivot-table/pivot-cache-definition-xform.js
var pivot_cache_definition_xform_exports = {};
__export(pivot_cache_definition_xform_exports, {
  default: () => pivot_cache_definition_xform_default
});
var PivotCacheDefinitionXform, pivot_cache_definition_xform_default;
var init_pivot_cache_definition_xform = __esm({
  "esm/xlsx/xform/pivot-table/pivot-cache-definition-xform.js"() {
    init_base_xform();
    init_cache_field();
    init_xml_stream();
    PivotCacheDefinitionXform = class _PivotCacheDefinitionXform extends base_xform_default {
      constructor() {
        super();
        this.map = {};
      }
      prepare(model) {
      }
      get tag() {
        return "pivotCacheDefinition";
      }
      render(xmlStream, model) {
        const { sourceSheet, cacheFields } = model;
        xmlStream.openXml(xml_stream_default.StdDocAttributes);
        xmlStream.openNode(this.tag, {
          ..._PivotCacheDefinitionXform.PIVOT_CACHE_DEFINITION_ATTRIBUTES,
          "r:id": "rId1",
          refreshOnLoad: "1",
          refreshedBy: "Author",
          refreshedDate: "45125.026046874998",
          createdVersion: "8",
          refreshedVersion: "8",
          minRefreshableVersion: "3",
          recordCount: cacheFields.length + 1
        });
        xmlStream.openNode("cacheSource", { type: "worksheet" });
        xmlStream.leafNode("worksheetSource", {
          ref: sourceSheet.dimensions.shortRange,
          sheet: sourceSheet.name
        });
        xmlStream.closeNode();
        xmlStream.openNode("cacheFields", { count: cacheFields.length });
        xmlStream.writeXml(cacheFields.map((cacheField) => new cache_field_default(cacheField).render()).join("\n    "));
        xmlStream.closeNode();
        xmlStream.closeNode();
      }
      parseOpen(node) {
      }
      parseText(text) {
      }
      parseClose(name) {
      }
      reconcile(model, options) {
      }
    };
    PivotCacheDefinitionXform.PIVOT_CACHE_DEFINITION_ATTRIBUTES = {
      xmlns: "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
      "xmlns:r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
      "xmlns:mc": "http://schemas.openxmlformats.org/markup-compatibility/2006",
      "mc:Ignorable": "xr",
      "xmlns:xr": "http://schemas.microsoft.com/office/spreadsheetml/2014/revision"
    };
    pivot_cache_definition_xform_default = PivotCacheDefinitionXform;
  }
});

// esm/xlsx/xform/pivot-table/pivot-table-xform.js
var pivot_table_xform_exports = {};
__export(pivot_table_xform_exports, {
  default: () => pivot_table_xform_default
});
function renderPivotFields(pivotTable) {
  return pivotTable.cacheFields.map((cacheField, fieldIndex) => {
    const fieldType = pivotTable.rows.indexOf(fieldIndex) >= 0 ? "row" : pivotTable.columns.indexOf(fieldIndex) >= 0 ? "column" : pivotTable.values.indexOf(fieldIndex) >= 0 ? "value" : null;
    return renderPivotField(fieldType, cacheField.sharedItems);
  }).join("");
}
function renderPivotField(fieldType, sharedItems) {
  const defaultAttributes = 'compact="0" outline="0" showAll="0" defaultSubtotal="0"';
  if (fieldType === "row" || fieldType === "column") {
    const axis = fieldType === "row" ? "axisRow" : "axisCol";
    return `
      <pivotField axis="${axis}" ${defaultAttributes}>
        <items count="${sharedItems.length + 1}">
          ${sharedItems.map((item, index) => `<item x="${index}" />`).join("\n              ")}
        </items>
      </pivotField>
    `;
  }
  return `
    <pivotField
      ${fieldType === "value" ? 'dataField="1"' : ""}
      ${defaultAttributes}
    />
  `;
}
var PivotTableXform, pivot_table_xform_default;
var init_pivot_table_xform = __esm({
  "esm/xlsx/xform/pivot-table/pivot-table-xform.js"() {
    init_xml_stream();
    init_base_xform();
    PivotTableXform = class _PivotTableXform extends base_xform_default {
      constructor() {
        super();
        this.map = {};
      }
      prepare(model) {
      }
      get tag() {
        return "pivotTableDefinition";
      }
      render(xmlStream, model) {
        const { rows, columns, values, metric, cacheFields, cacheId } = model;
        xmlStream.openXml(xml_stream_default.StdDocAttributes);
        xmlStream.openNode(this.tag, {
          ..._PivotTableXform.PIVOT_TABLE_ATTRIBUTES,
          "xr:uid": "{267EE50F-B116-784D-8DC2-BA77DE3F4F4A}",
          name: "PivotTable2",
          cacheId,
          applyNumberFormats: "0",
          applyBorderFormats: "0",
          applyFontFormats: "0",
          applyPatternFormats: "0",
          applyAlignmentFormats: "0",
          applyWidthHeightFormats: "1",
          dataCaption: "Values",
          updatedVersion: "8",
          minRefreshableVersion: "3",
          useAutoFormatting: "1",
          itemPrintTitles: "1",
          createdVersion: "8",
          indent: "0",
          compact: "0",
          compactData: "0",
          multipleFieldFilters: "0"
        });
        xmlStream.writeXml(`
      <location ref="A3:E15" firstHeaderRow="1" firstDataRow="2" firstDataCol="1" />
      <pivotFields count="${cacheFields.length}">
        ${renderPivotFields(model)}
      </pivotFields>
      <rowFields count="${rows.length}">
        ${rows.map((rowIndex) => `<field x="${rowIndex}" />`).join("\n    ")}
      </rowFields>
      <rowItems count="1">
        <i t="grand"><x /></i>
      </rowItems>
      <colFields count="${columns.length}">
        ${columns.map((columnIndex) => `<field x="${columnIndex}" />`).join("\n    ")}
      </colFields>
      <colItems count="1">
        <i t="grand"><x /></i>
      </colItems>
      <dataFields count="${values.length}">
        <dataField
          name="Sum of ${cacheFields[values[0]].name}"
          fld="${values[0]}"
          baseField="0"
          baseItem="0"
        />
      </dataFields>
      <pivotTableStyleInfo
        name="PivotStyleLight16"
        showRowHeaders="1"
        showColHeaders="1"
        showRowStripes="0"
        showColStripes="0"
        showLastColumn="1"
      />
      <extLst>
        <ext
          uri="{962EF5D1-5CA2-4c93-8EF4-DBF5C05439D2}"
          xmlns:x14="http://schemas.microsoft.com/office/spreadsheetml/2009/9/main"
        >
          <x14:pivotTableDefinition
            hideValuesRow="1"
            xmlns:xm="http://schemas.microsoft.com/office/excel/2006/main"
          />
        </ext>
        <ext
          uri="{747A6164-185A-40DC-8AA5-F01512510D54}"
          xmlns:xpdl="http://schemas.microsoft.com/office/spreadsheetml/2016/pivotdefaultlayout"
        >
          <xpdl:pivotTableDefinition16
            EnabledSubtotalsDefault="0"
            SubtotalsOnTopDefault="0"
          />
        </ext>
      </extLst>
    `);
        xmlStream.closeNode();
      }
      parseOpen(node) {
      }
      parseText(text) {
      }
      parseClose(name) {
      }
      reconcile(model, options) {
      }
    };
    PivotTableXform.PIVOT_TABLE_ATTRIBUTES = {
      xmlns: "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
      "xmlns:mc": "http://schemas.openxmlformats.org/markup-compatibility/2006",
      "mc:Ignorable": "xr",
      "xmlns:xr": "http://schemas.microsoft.com/office/spreadsheetml/2014/revision"
    };
    pivot_table_xform_default = PivotTableXform;
  }
});

// esm/doc/worksheet.js
init_under_dash();
init_col_cache();

// esm/doc/range.js
init_col_cache();
var Range = class _Range {
  constructor() {
    this.decode(arguments);
  }
  setTLBR(t, l, b, r, s) {
    if (arguments.length < 4) {
      const tl = decodeAddress(t);
      const br = decodeAddress(l);
      this.model = {
        top: Math.min(tl.row, br.row),
        left: Math.min(tl.col, br.col),
        bottom: Math.max(tl.row, br.row),
        right: Math.max(tl.col, br.col),
        sheetName: b
      };
      this.setTLBR(tl.row, tl.col, br.row, br.col, s);
    } else {
      this.model = {
        top: Math.min(t, b),
        left: Math.min(l, r),
        bottom: Math.max(t, b),
        right: Math.max(l, r),
        sheetName: s
      };
    }
  }
  decode(argv) {
    switch (argv.length) {
      case 5:
        this.setTLBR(argv[0], argv[1], argv[2], argv[3], argv[4]);
        break;
      case 4:
        this.setTLBR(argv[0], argv[1], argv[2], argv[3]);
        break;
      case 3:
        this.setTLBR(argv[0], argv[1], argv[2]);
        break;
      case 2:
        this.setTLBR(argv[0], argv[1]);
        break;
      case 1: {
        const value = argv[0];
        if (value instanceof _Range) {
          this.model = {
            top: value.model.top,
            left: value.model.left,
            bottom: value.model.bottom,
            right: value.model.right,
            sheetName: value.sheetName
          };
        } else if (value instanceof Array) {
          this.decode(value);
        } else if (value.top && value.left && value.bottom && value.right) {
          this.model = {
            top: value.top,
            left: value.left,
            bottom: value.bottom,
            right: value.right,
            sheetName: value.sheetName
          };
        } else {
          const tlbr = decodeEx(value);
          if (tlbr.top) {
            this.model = {
              top: tlbr.top,
              left: tlbr.left,
              bottom: tlbr.bottom,
              right: tlbr.right,
              sheetName: tlbr.sheetName
            };
          } else {
            this.model = {
              top: tlbr.row,
              left: tlbr.col,
              bottom: tlbr.row,
              right: tlbr.col,
              sheetName: tlbr.sheetName
            };
          }
        }
        break;
      }
      case 0:
        this.model = {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0
        };
        break;
      default:
        throw new Error(`Invalid number of arguments to _getDimensions() - ${argv.length}`);
    }
  }
  get top() {
    return this.model.top || 1;
  }
  set top(value) {
    this.model.top = value;
  }
  get left() {
    return this.model.left || 1;
  }
  set left(value) {
    this.model.left = value;
  }
  get bottom() {
    return this.model.bottom || 1;
  }
  set bottom(value) {
    this.model.bottom = value;
  }
  get right() {
    return this.model.right || 1;
  }
  set right(value) {
    this.model.right = value;
  }
  get sheetName() {
    return this.model.sheetName;
  }
  set sheetName(value) {
    this.model.sheetName = value;
  }
  get _serialisedSheetName() {
    const { sheetName } = this.model;
    if (sheetName) {
      if (/^[a-zA-Z0-9]*$/.test(sheetName)) {
        return `${sheetName}!`;
      }
      return `'${sheetName}'!`;
    }
    return "";
  }
  expand(top, left, bottom, right) {
    if (!this.model.top || top < this.top)
      this.top = top;
    if (!this.model.left || left < this.left)
      this.left = left;
    if (!this.model.bottom || bottom > this.bottom)
      this.bottom = bottom;
    if (!this.model.right || right > this.right)
      this.right = right;
  }
  expandRow(row) {
    if (row) {
      const { dimensions, number } = row;
      if (dimensions) {
        this.expand(number, dimensions.min, number, dimensions.max);
      }
    }
  }
  expandToAddress(addressStr) {
    const address = decodeEx(addressStr);
    this.expand(address.row, address.col, address.row, address.col);
  }
  get tl() {
    return n2l2(this.left) + this.top;
  }
  get $t$l() {
    return `$${n2l2(this.left)}$${this.top}`;
  }
  get br() {
    return n2l2(this.right) + this.bottom;
  }
  get $b$r() {
    return `$${n2l2(this.right)}$${this.bottom}`;
  }
  get range() {
    return `${this._serialisedSheetName + this.tl}:${this.br}`;
  }
  get $range() {
    return `${this._serialisedSheetName + this.$t$l}:${this.$b$r}`;
  }
  get shortRange() {
    return this.count > 1 ? this.range : this._serialisedSheetName + this.tl;
  }
  get $shortRange() {
    return this.count > 1 ? this.$range : this._serialisedSheetName + this.$t$l;
  }
  get count() {
    return (1 + this.bottom - this.top) * (1 + this.right - this.left);
  }
  toString() {
    return this.range;
  }
  intersects(other) {
    if (other.sheetName && this.sheetName && other.sheetName !== this.sheetName)
      return false;
    if (other.bottom < this.top)
      return false;
    if (other.top > this.bottom)
      return false;
    if (other.right < this.left)
      return false;
    if (other.left > this.right)
      return false;
    return true;
  }
  contains(addressStr) {
    const address = decodeEx(addressStr);
    return this.containsEx(address);
  }
  containsEx(address) {
    if (address.sheetName && this.sheetName && address.sheetName !== this.sheetName)
      return false;
    return address.row >= this.top && address.row <= this.bottom && address.col >= this.left && address.col <= this.right;
  }
  forEachAddress(cb) {
    for (let col = this.left; col <= this.right; col++) {
      for (let row = this.top; row <= this.bottom; row++) {
        cb(encodeAddress(row, col), row, col);
      }
    }
  }
};
var range_default = Range;

// esm/doc/row.js
init_under_dash();
init_col_cache();

// esm/doc/cell.js
init_col_cache();
init_under_dash();

// esm/doc/enums.js
var ValueType = {
  Null: 0,
  Merge: 1,
  Number: 2,
  String: 3,
  Date: 4,
  Hyperlink: 5,
  Formula: 6,
  SharedString: 7,
  RichText: 8,
  Boolean: 9,
  Error: 10
};
var FormulaType = {
  None: 0,
  Master: 1,
  Shared: 2
};
var RelationshipType = {
  None: 0,
  OfficeDocument: 1,
  Worksheet: 2,
  CalcChain: 3,
  SharedStrings: 4,
  Styles: 5,
  Theme: 6,
  Hyperlink: 7
};
var DocumentType = {
  Xlsx: 1
};
var ReadingOrder = {
  LeftToRight: 1,
  RightToLeft: 2
};
var ErrorValue = {
  NotApplicable: "#N/A",
  Ref: "#REF!",
  Name: "#NAME?",
  DivZero: "#DIV/0!",
  Null: "#NULL!",
  Value: "#VALUE!",
  Num: "#NUM!"
};
var enums_default = {
  ValueType,
  FormulaType,
  RelationshipType,
  DocumentType,
  ReadingOrder,
  ErrorValue
};

// esm/utils/shared-formula.js
init_col_cache();
var replacementCandidateRx = /(([a-z_\-0-9]*)!)?([a-z0-9_$]{2,})([(])?/gi;
var CRrx = /^([$])?([a-z]+)([$])?([1-9][0-9]*)$/i;
function slideFormula(formula, fromCell, toCell) {
  const offset = decode(fromCell);
  const to = decode(toCell);
  return formula.replace(replacementCandidateRx, (refMatch, sheet, sheetMaybe, addrPart, trailingParen) => {
    if (trailingParen) {
      return refMatch;
    }
    const match = CRrx.exec(addrPart);
    if (match) {
      const colDollar = match[1];
      const colStr = match[2].toUpperCase();
      const rowDollar = match[3];
      const rowStr = match[4];
      if (colStr.length > 3 || colStr.length === 3 && colStr > "XFD") {
        return refMatch;
      }
      let col = l2n(colStr);
      let row = parseInt(rowStr, 10);
      if (!colDollar) {
        col += to.col - offset.col;
      }
      if (!rowDollar) {
        row += to.row - offset.row;
      }
      const res = (sheet || "") + (colDollar || "") + n2l2(col) + (rowDollar || "") + row;
      return res;
    }
    return refMatch;
  });
}

// esm/doc/note.js
init_under_dash();
var Note = class _Note {
  constructor(note) {
    this.note = note;
  }
  get model() {
    let value = null;
    switch (typeof this.note) {
      case "string":
        value = {
          type: "note",
          note: {
            texts: [
              {
                text: this.note
              }
            ]
          }
        };
        break;
      default:
        value = {
          type: "note",
          note: this.note
        };
        break;
    }
    return deepMerge({}, _Note.DEFAULT_CONFIGS, value);
  }
  set model(value) {
    const { note } = value;
    const { texts } = note;
    if (texts.length === 1 && Object.keys(texts[0]).length === 1) {
      this.note = texts[0].text;
    } else {
      this.note = note;
    }
  }
  static fromModel(model) {
    const note = new _Note();
    note.model = model;
    return note;
  }
};
Note.DEFAULT_CONFIGS = {
  note: {
    margins: {
      insetmode: "auto",
      inset: [0.13, 0.13, 0.25, 0.25]
    },
    protection: {
      locked: "True",
      lockText: "True"
    },
    editAs: "absolute"
  }
};
var note_default = Note;

// esm/doc/cell.js
var Cell = class _Cell {
  constructor(row, column, address) {
    if (!row || !column) {
      throw new Error("A Cell needs a Row");
    }
    this._row = row;
    this._column = column;
    validateAddress(address);
    this._address = address;
    this._value = Value.create(_Cell.Types.Null, this);
    this.style = this._mergeStyle(row.style, column.style, {});
    this._mergeCount = 0;
  }
  get worksheet() {
    return this._row.worksheet;
  }
  get workbook() {
    return this._row.worksheet.workbook;
  }
  // help GC by removing cyclic (and other) references
  destroy() {
    delete this.style;
    delete this._value;
    delete this._row;
    delete this._column;
    delete this._address;
  }
  // =========================================================================
  // Styles stuff
  get numFmt() {
    return this.style.numFmt;
  }
  set numFmt(value) {
    this.style.numFmt = value;
  }
  get font() {
    return this.style.font;
  }
  set font(value) {
    this.style.font = value;
  }
  get alignment() {
    return this.style.alignment;
  }
  set alignment(value) {
    this.style.alignment = value;
  }
  get border() {
    return this.style.border;
  }
  set border(value) {
    this.style.border = value;
  }
  get fill() {
    return this.style.fill;
  }
  set fill(value) {
    this.style.fill = value;
  }
  get protection() {
    return this.style.protection;
  }
  set protection(value) {
    this.style.protection = value;
  }
  _mergeStyle(rowStyle, colStyle, style) {
    const numFmt = rowStyle && rowStyle.numFmt || colStyle && colStyle.numFmt;
    if (numFmt)
      style.numFmt = numFmt;
    const font = rowStyle && rowStyle.font || colStyle && colStyle.font;
    if (font)
      style.font = font;
    const alignment = rowStyle && rowStyle.alignment || colStyle && colStyle.alignment;
    if (alignment)
      style.alignment = alignment;
    const border = rowStyle && rowStyle.border || colStyle && colStyle.border;
    if (border)
      style.border = border;
    const fill = rowStyle && rowStyle.fill || colStyle && colStyle.fill;
    if (fill)
      style.fill = fill;
    const protection = rowStyle && rowStyle.protection || colStyle && colStyle.protection;
    if (protection)
      style.protection = protection;
    return style;
  }
  // =========================================================================
  // return the address for this cell
  get address() {
    return this._address;
  }
  get row() {
    return this._row.number;
  }
  get col() {
    return this._column.number;
  }
  get $col$row() {
    return `$${this._column.letter}$${this.row}`;
  }
  // =========================================================================
  // Value stuff
  get type() {
    return this._value.type;
  }
  get effectiveType() {
    return this._value.effectiveType;
  }
  // toCsvString() {
  //   return this._value.toCsvString();
  // }
  // =========================================================================
  // Merge stuff
  addMergeRef() {
    this._mergeCount++;
  }
  releaseMergeRef() {
    this._mergeCount--;
  }
  get isMerged() {
    return this._mergeCount > 0 || this.type === _Cell.Types.Merge;
  }
  merge(master, ignoreStyle) {
    this._value.release();
    this._value = Value.create(_Cell.Types.Merge, this, master);
    if (!ignoreStyle) {
      this.style = master.style;
    }
  }
  unmerge() {
    if (this.type === _Cell.Types.Merge) {
      this._value.release();
      this._value = Value.create(_Cell.Types.Null, this);
      this.style = this._mergeStyle(this._row.style, this._column.style, {});
    }
  }
  isMergedTo(master) {
    if (this._value.type !== _Cell.Types.Merge)
      return false;
    return this._value.isMergedTo(master);
  }
  get master() {
    if (this.type === _Cell.Types.Merge) {
      return this._value.master;
    }
    return this;
  }
  get isHyperlink() {
    return this._value.type === _Cell.Types.Hyperlink;
  }
  get hyperlink() {
    return this._value.hyperlink;
  }
  // return the value
  get value() {
    return this._value.value;
  }
  // set the value - can be number, string or raw
  set value(v) {
    if (this.type === _Cell.Types.Merge) {
      this._value.master.value = v;
      return;
    }
    this._value.release();
    this._value = Value.create(Value.getType(v), this, v);
  }
  get note() {
    return this._comment && this._comment.note;
  }
  set note(note) {
    this._comment = new note_default(note);
  }
  get text() {
    return this._value.toString();
  }
  get html() {
    return escapeHtml(this.text);
  }
  toString() {
    return this.text;
  }
  _upgradeToHyperlink(hyperlink) {
    if (this.type === _Cell.Types.String) {
      this._value = Value.create(_Cell.Types.Hyperlink, this, {
        text: this._value.value,
        hyperlink
      });
    }
  }
  // =========================================================================
  // Formula stuff
  get formula() {
    return this._value.formula;
  }
  get result() {
    return this._value.result;
  }
  get formulaType() {
    return this._value.formulaType;
  }
  // =========================================================================
  // Name stuff
  get fullAddress() {
    const { worksheet } = this._row;
    return {
      sheetName: worksheet.name,
      address: this.address,
      row: this.row,
      col: this.col
    };
  }
  get name() {
    return this.names[0];
  }
  set name(value) {
    this.names = [value];
  }
  get names() {
    return this.workbook.definedNames.getNamesEx(this.fullAddress);
  }
  set names(value) {
    const { definedNames } = this.workbook;
    definedNames.removeAllNames(this.fullAddress);
    value.forEach((name) => {
      definedNames.addEx(this.fullAddress, name);
    });
  }
  addName(name) {
    this.workbook.definedNames.addEx(this.fullAddress, name);
  }
  removeName(name) {
    this.workbook.definedNames.removeEx(this.fullAddress, name);
  }
  removeAllNames() {
    this.workbook.definedNames.removeAllNames(this.fullAddress);
  }
  // =========================================================================
  // Data Validation stuff
  get _dataValidations() {
    return this.worksheet.dataValidations;
  }
  get dataValidation() {
    return this._dataValidations.find(this.address);
  }
  set dataValidation(value) {
    this._dataValidations.add(this.address, value);
  }
  // =========================================================================
  // Model stuff
  get model() {
    const { model } = this._value;
    model.style = this.style;
    if (this._comment) {
      model.comment = this._comment.model;
    }
    return model;
  }
  set model(value) {
    this._value.release();
    this._value = Value.create(value.type, this);
    this._value.model = value;
    if (value.comment) {
      switch (value.comment.type) {
        case "note":
          this._comment = note_default.fromModel(value.comment);
          break;
      }
    }
    if (value.style) {
      this.style = value.style;
    } else {
      this.style = {};
    }
  }
};
Cell.Types = ValueType;
var NullValue = class {
  constructor(cell) {
    this.model = {
      address: cell.address,
      type: Cell.Types.Null
    };
  }
  get value() {
    return null;
  }
  set value(value) {
  }
  get type() {
    return Cell.Types.Null;
  }
  get effectiveType() {
    return Cell.Types.Null;
  }
  get address() {
    return this.model.address;
  }
  set address(value) {
    this.model.address = value;
  }
  // toCsvString() {
  //   return '';
  // }
  release() {
  }
  toString() {
    return "";
  }
};
var NumberValue = class {
  constructor(cell, value) {
    this.model = {
      address: cell.address,
      type: Cell.Types.Number,
      value
    };
  }
  get value() {
    return this.model.value;
  }
  set value(value) {
    this.model.value = value;
  }
  get type() {
    return Cell.Types.Number;
  }
  get effectiveType() {
    return Cell.Types.Number;
  }
  get address() {
    return this.model.address;
  }
  set address(value) {
    this.model.address = value;
  }
  // toCsvString() {
  //   return this.model.value.toString();
  // }
  release() {
  }
  toString() {
    return this.model.value.toString();
  }
};
var StringValue = class {
  constructor(cell, value) {
    this.model = {
      address: cell.address,
      type: Cell.Types.String,
      value
    };
  }
  get value() {
    return this.model.value;
  }
  set value(value) {
    this.model.value = value;
  }
  get type() {
    return Cell.Types.String;
  }
  get effectiveType() {
    return Cell.Types.String;
  }
  get address() {
    return this.model.address;
  }
  set address(value) {
    this.model.address = value;
  }
  // toCsvString() {
  //   return `"${this.model.value.replace(/"/g, '""')}"`;
  // }
  release() {
  }
  toString() {
    return this.model.value;
  }
};
var RichTextValue = class {
  constructor(cell, value) {
    this.model = {
      address: cell.address,
      type: Cell.Types.String,
      value
    };
  }
  get value() {
    return this.model.value;
  }
  set value(value) {
    this.model.value = value;
  }
  toString() {
    return this.model.value.richText.map((t) => t.text).join("");
  }
  get type() {
    return Cell.Types.RichText;
  }
  get effectiveType() {
    return Cell.Types.RichText;
  }
  get address() {
    return this.model.address;
  }
  set address(value) {
    this.model.address = value;
  }
  // toCsvString() {
  //   return `"${this.text.replace(/"/g, '""')}"`;
  // }
  release() {
  }
};
var DateValue = class {
  constructor(cell, value) {
    this.model = {
      address: cell.address,
      type: Cell.Types.Date,
      value
    };
  }
  get value() {
    return this.model.value;
  }
  set value(value) {
    this.model.value = value;
  }
  get type() {
    return Cell.Types.Date;
  }
  get effectiveType() {
    return Cell.Types.Date;
  }
  get address() {
    return this.model.address;
  }
  set address(value) {
    this.model.address = value;
  }
  toCsvString() {
    return this.model.value.toISOString();
  }
  release() {
  }
  toString() {
    return this.model.value.toString();
  }
};
var HyperlinkValue = class {
  constructor(cell, value) {
    this.model = {
      address: cell.address,
      type: Cell.Types.Hyperlink,
      text: value ? value.text : void 0,
      hyperlink: value ? value.hyperlink : void 0
    };
    if (value && value.tooltip) {
      this.model.tooltip = value.tooltip;
    }
  }
  get value() {
    const v = {
      text: this.model.text,
      hyperlink: this.model.hyperlink
    };
    if (this.model.tooltip) {
      v.tooltip = this.model.tooltip;
    }
    return v;
  }
  set value(value) {
    this.model = {
      text: value.text,
      hyperlink: value.hyperlink
    };
    if (value.tooltip) {
      this.model.tooltip = value.tooltip;
    }
  }
  get text() {
    return this.model.text;
  }
  set text(value) {
    this.model.text = value;
  }
  /*
    get tooltip() {
      return this.model.tooltip;
    }
  
    set tooltip(value) {
      this.model.tooltip = value;
    } */
  get hyperlink() {
    return this.model.hyperlink;
  }
  set hyperlink(value) {
    this.model.hyperlink = value;
  }
  get type() {
    return Cell.Types.Hyperlink;
  }
  get effectiveType() {
    return Cell.Types.Hyperlink;
  }
  get address() {
    return this.model.address;
  }
  set address(value) {
    this.model.address = value;
  }
  toCsvString() {
    return this.model.hyperlink;
  }
  release() {
  }
  toString() {
    return this.model.text;
  }
};
var MergeValue = class {
  constructor(cell, master) {
    this.model = {
      address: cell.address,
      type: Cell.Types.Merge,
      master: master ? master.address : void 0
    };
    this._master = master;
    if (master) {
      master.addMergeRef();
    }
  }
  get value() {
    return this._master.value;
  }
  set value(value) {
    if (value instanceof Cell) {
      if (this._master) {
        this._master.releaseMergeRef();
      }
      value.addMergeRef();
      this._master = value;
    } else {
      this._master.value = value;
    }
  }
  isMergedTo(master) {
    return master === this._master;
  }
  get master() {
    return this._master;
  }
  get type() {
    return Cell.Types.Merge;
  }
  get effectiveType() {
    return this._master.effectiveType;
  }
  get address() {
    return this.model.address;
  }
  set address(value) {
    this.model.address = value;
  }
  toCsvString() {
    return "";
  }
  release() {
    this._master.releaseMergeRef();
  }
  toString() {
    return this.value.toString();
  }
};
var FormulaValue = class {
  constructor(cell, value) {
    this.cell = cell;
    this.model = {
      address: cell.address,
      type: Cell.Types.Formula,
      shareType: value ? value.shareType : void 0,
      ref: value ? value.ref : void 0,
      formula: value ? value.formula : void 0,
      sharedFormula: value ? value.sharedFormula : void 0,
      result: value ? value.result : void 0
    };
  }
  _copyModel(model) {
    const copy = {};
    const cp = (name) => {
      const value = model[name];
      if (value) {
        copy[name] = value;
      }
    };
    cp("formula");
    cp("result");
    cp("ref");
    cp("shareType");
    cp("sharedFormula");
    return copy;
  }
  get value() {
    return this._copyModel(this.model);
  }
  set value(value) {
    this.model = this._copyModel(value);
  }
  validate(value) {
    switch (Value.getType(value)) {
      case Cell.Types.Null:
      case Cell.Types.String:
      case Cell.Types.Number:
      case Cell.Types.Date:
        break;
      case Cell.Types.Hyperlink:
      case Cell.Types.Formula:
      default:
        throw new Error("Cannot process that type of result value");
    }
  }
  get dependencies() {
    const ranges = this.formula.match(/([a-zA-Z0-9]+!)?[A-Z]{1,3}\d{1,4}:[A-Z]{1,3}\d{1,4}/g);
    const cells = this.formula.replace(/([a-zA-Z0-9]+!)?[A-Z]{1,3}\d{1,4}:[A-Z]{1,3}\d{1,4}/g, "").match(/([a-zA-Z0-9]+!)?[A-Z]{1,3}\d{1,4}/g);
    return {
      ranges,
      cells
    };
  }
  get formula() {
    return this.model.formula || this._getTranslatedFormula();
  }
  set formula(value) {
    this.model.formula = value;
  }
  get formulaType() {
    if (this.model.formula) {
      return FormulaType.Master;
    }
    if (this.model.sharedFormula) {
      return FormulaType.Shared;
    }
    return FormulaType.None;
  }
  get result() {
    return this.model.result;
  }
  set result(value) {
    this.model.result = value;
  }
  get type() {
    return Cell.Types.Formula;
  }
  get effectiveType() {
    const v = this.model.result;
    if (v === null || v === void 0) {
      return ValueType.Null;
    }
    if (v instanceof String || typeof v === "string") {
      return ValueType.String;
    }
    if (typeof v === "number") {
      return ValueType.Number;
    }
    if (v instanceof Date) {
      return ValueType.Date;
    }
    if (v.text && v.hyperlink) {
      return ValueType.Hyperlink;
    }
    if (v.formula) {
      return ValueType.Formula;
    }
    return ValueType.Null;
  }
  get address() {
    return this.model.address;
  }
  set address(value) {
    this.model.address = value;
  }
  _getTranslatedFormula() {
    if (!this._translatedFormula && this.model.sharedFormula) {
      const { worksheet } = this.cell;
      const master = worksheet.findCell(this.model.sharedFormula);
      this._translatedFormula = master && slideFormula(master.formula, master.address, this.model.address);
    }
    return this._translatedFormula;
  }
  toCsvString() {
    return `${this.model.result || ""}`;
  }
  release() {
  }
  toString() {
    return this.model.result ? this.model.result.toString() : "";
  }
};
var SharedStringValue = class {
  constructor(cell, value) {
    this.model = {
      address: cell.address,
      type: Cell.Types.SharedString,
      value
    };
  }
  get value() {
    return this.model.value;
  }
  set value(value) {
    this.model.value = value;
  }
  get type() {
    return Cell.Types.SharedString;
  }
  get effectiveType() {
    return Cell.Types.SharedString;
  }
  get address() {
    return this.model.address;
  }
  set address(value) {
    this.model.address = value;
  }
  toCsvString() {
    return this.model.value.toString();
  }
  release() {
  }
  toString() {
    return this.model.value.toString();
  }
};
var BooleanValue = class {
  constructor(cell, value) {
    this.model = {
      address: cell.address,
      type: Cell.Types.Boolean,
      value
    };
  }
  get value() {
    return this.model.value;
  }
  set value(value) {
    this.model.value = value;
  }
  get type() {
    return Cell.Types.Boolean;
  }
  get effectiveType() {
    return Cell.Types.Boolean;
  }
  get address() {
    return this.model.address;
  }
  set address(value) {
    this.model.address = value;
  }
  toCsvString() {
    return this.model.value ? 1 : 0;
  }
  release() {
  }
  toString() {
    return this.model.value.toString();
  }
};
var ErrorValue2 = class {
  constructor(cell, value) {
    this.model = {
      address: cell.address,
      type: Cell.Types.Error,
      value
    };
  }
  get value() {
    return this.model.value;
  }
  set value(value) {
    this.model.value = value;
  }
  get type() {
    return Cell.Types.Error;
  }
  get effectiveType() {
    return Cell.Types.Error;
  }
  get address() {
    return this.model.address;
  }
  set address(value) {
    this.model.address = value;
  }
  toCsvString() {
    return this.toString();
  }
  release() {
  }
  toString() {
    return this.model.value.error.toString();
  }
};
var JSONValue = class {
  constructor(cell, value) {
    this.model = {
      address: cell.address,
      type: Cell.Types.String,
      value: JSON.stringify(value),
      rawValue: value
    };
  }
  get value() {
    return this.model.rawValue;
  }
  set value(value) {
    this.model.rawValue = value;
    this.model.value = JSON.stringify(value);
  }
  get type() {
    return Cell.Types.String;
  }
  get effectiveType() {
    return Cell.Types.String;
  }
  get address() {
    return this.model.address;
  }
  set address(value) {
    this.model.address = value;
  }
  toCsvString() {
    return this.model.value;
  }
  release() {
  }
  toString() {
    return this.model.value;
  }
};
var Value = {
  getType(value) {
    if (value === null || value === void 0) {
      return Cell.Types.Null;
    }
    if (value instanceof String || typeof value === "string") {
      return Cell.Types.String;
    }
    if (typeof value === "number") {
      return Cell.Types.Number;
    }
    if (typeof value === "boolean") {
      return Cell.Types.Boolean;
    }
    if (value instanceof Date) {
      return Cell.Types.Date;
    }
    if (value.text && value.hyperlink) {
      return Cell.Types.Hyperlink;
    }
    if (value.formula || value.sharedFormula) {
      return Cell.Types.Formula;
    }
    if (value.richText) {
      return Cell.Types.RichText;
    }
    if (value.sharedString) {
      return Cell.Types.SharedString;
    }
    if (value.error) {
      return Cell.Types.Error;
    }
    return Cell.Types.JSON;
  },
  // map valueType to constructor
  types: [
    { t: Cell.Types.Null, f: NullValue },
    { t: Cell.Types.Number, f: NumberValue },
    { t: Cell.Types.String, f: StringValue },
    { t: Cell.Types.Date, f: DateValue },
    { t: Cell.Types.Hyperlink, f: HyperlinkValue },
    { t: Cell.Types.Formula, f: FormulaValue },
    { t: Cell.Types.Merge, f: MergeValue },
    { t: Cell.Types.JSON, f: JSONValue },
    { t: Cell.Types.SharedString, f: SharedStringValue },
    { t: Cell.Types.RichText, f: RichTextValue },
    { t: Cell.Types.Boolean, f: BooleanValue },
    { t: Cell.Types.Error, f: ErrorValue2 }
  ].reduce((p, t) => {
    p[t.t] = t.f;
    return p;
  }, []),
  create(type, cell, value) {
    const T = this.types[type];
    if (!T) {
      throw new Error(`Could not create Value of type ${type}`);
    }
    return new T(cell, value);
  }
};
var cell_default = Cell;

// esm/doc/row.js
var Row = class {
  constructor(worksheet, number) {
    this._worksheet = worksheet;
    this._number = number;
    this._cells = [];
    this.style = {};
    this.outlineLevel = 0;
  }
  // return the row number
  get number() {
    return this._number;
  }
  get worksheet() {
    return this._worksheet;
  }
  // Inform Streaming Writer that this row (and all rows before it) are complete
  // and ready to write. Has no effect on Worksheet document
  commit() {
    this._worksheet._commitRow(this);
  }
  // helps GC by breaking cyclic references
  destroy() {
    delete this._worksheet;
    delete this._cells;
    delete this.style;
  }
  findCell(colNumber) {
    return this._cells[colNumber - 1];
  }
  // given {address, row, col}, find or create new cell
  getCellEx(address) {
    let cell = this._cells[address.col - 1];
    if (!cell) {
      const column = this._worksheet.getColumn(address.col);
      cell = new cell_default(this, column, address.address);
      this._cells[address.col - 1] = cell;
    }
    return cell;
  }
  // get cell by key, letter or column number
  getCell(col) {
    if (typeof col === "string") {
      const column = this._worksheet.getColumnKey(col);
      if (column) {
        col = column.number;
      } else {
        col = l2n(col);
      }
    }
    return this._cells[col - 1] || this.getCellEx({
      address: encodeAddress(this._number, col),
      row: this._number,
      col
    });
  }
  // remove cell(s) and shift all higher cells down by count
  splice(start, count, ...inserts) {
    const nKeep = start + count;
    const nExpand = inserts.length - count;
    const nEnd = this._cells.length;
    let i;
    let cSrc;
    let cDst;
    if (nExpand < 0) {
      for (i = start + inserts.length; i <= nEnd; i++) {
        cDst = this._cells[i - 1];
        cSrc = this._cells[i - nExpand - 1];
        if (cSrc) {
          cDst = this.getCell(i);
          cDst.value = cSrc.value;
          cDst.style = cSrc.style;
          cDst._comment = cSrc._comment;
        } else if (cDst) {
          cDst.value = null;
          cDst.style = {};
          cDst._comment = void 0;
        }
      }
    } else if (nExpand > 0) {
      for (i = nEnd; i >= nKeep; i--) {
        cSrc = this._cells[i - 1];
        if (cSrc) {
          cDst = this.getCell(i + nExpand);
          cDst.value = cSrc.value;
          cDst.style = cSrc.style;
          cDst._comment = cSrc._comment;
        } else {
          this._cells[i + nExpand - 1] = void 0;
        }
      }
    }
    for (i = 0; i < inserts.length; i++) {
      cDst = this.getCell(start + i);
      cDst.value = inserts[i];
      cDst.style = {};
      cDst._comment = void 0;
    }
  }
  // Iterate over all non-null cells in this row
  eachCell(options, iteratee) {
    if (!iteratee) {
      iteratee = options;
      options = null;
    }
    if (options && options.includeEmpty) {
      const n = this._cells.length;
      for (let i = 1; i <= n; i++) {
        iteratee(this.getCell(i), i);
      }
    } else {
      this._cells.forEach((cell, index) => {
        if (cell && cell.type !== 0) {
          iteratee(cell, index + 1);
        }
      });
    }
  }
  // ===========================================================================
  // Page Breaks
  addPageBreak(lft, rght) {
    const ws = this._worksheet;
    const left = Math.max(0, lft - 1) || 0;
    const right = Math.max(0, rght - 1) || 16838;
    const pb = {
      id: this._number,
      max: right,
      man: 1
    };
    if (left)
      pb.min = left;
    ws.rowBreaks.push(pb);
  }
  // return a sparse array of cell values
  get values() {
    const values = [];
    this._cells.forEach((cell) => {
      if (cell && cell.type !== 0) {
        values[cell.col] = cell.value;
      }
    });
    return values;
  }
  // set the values by contiguous or sparse array, or by key'd object literal
  set values(value) {
    this._cells = [];
    if (!value) {
    } else if (value instanceof Array) {
      let offset = 0;
      if (value.hasOwnProperty("0")) {
        offset = 1;
      }
      value.forEach((item, index) => {
        if (item !== void 0) {
          this.getCellEx({
            address: encodeAddress(this._number, index + offset),
            row: this._number,
            col: index + offset
          }).value = item;
        }
      });
    } else {
      this._worksheet.eachColumnKey((column, key) => {
        if (value[key] !== void 0) {
          this.getCellEx({
            address: encodeAddress(this._number, column.number),
            row: this._number,
            col: column.number
          }).value = value[key];
        }
      });
    }
  }
  // returns true if the row includes at least one cell with a value
  get hasValues() {
    return some2(this._cells, (cell) => cell && cell.type !== 0);
  }
  get cellCount() {
    return this._cells.length;
  }
  get actualCellCount() {
    let count = 0;
    this.eachCell(() => {
      count++;
    });
    return count;
  }
  // get the min and max column number for the non-null cells in this row or null
  get dimensions() {
    let min = 0;
    let max = 0;
    this._cells.forEach((cell) => {
      if (cell && cell.type !== 0) {
        if (!min || min > cell.col) {
          min = cell.col;
        }
        if (max < cell.col) {
          max = cell.col;
        }
      }
    });
    return min > 0 ? {
      min,
      max
    } : null;
  }
  // =========================================================================
  // styles
  _applyStyle(name, value) {
    this.style[name] = value;
    this._cells.forEach((cell) => {
      if (cell) {
        cell[name] = value;
      }
    });
    return value;
  }
  get numFmt() {
    return this.style.numFmt;
  }
  set numFmt(value) {
    this._applyStyle("numFmt", value);
  }
  get font() {
    return this.style.font;
  }
  set font(value) {
    this._applyStyle("font", value);
  }
  get alignment() {
    return this.style.alignment;
  }
  set alignment(value) {
    this._applyStyle("alignment", value);
  }
  get protection() {
    return this.style.protection;
  }
  set protection(value) {
    this._applyStyle("protection", value);
  }
  get border() {
    return this.style.border;
  }
  set border(value) {
    this._applyStyle("border", value);
  }
  get fill() {
    return this.style.fill;
  }
  set fill(value) {
    this._applyStyle("fill", value);
  }
  get hidden() {
    return !!this._hidden;
  }
  set hidden(value) {
    this._hidden = value;
  }
  get outlineLevel() {
    return this._outlineLevel || 0;
  }
  set outlineLevel(value) {
    this._outlineLevel = value;
  }
  get collapsed() {
    return !!(this._outlineLevel && this._outlineLevel >= this._worksheet.properties.outlineLevelRow);
  }
  // =========================================================================
  get model() {
    const cells = [];
    let min = 0;
    let max = 0;
    this._cells.forEach((cell) => {
      if (cell) {
        const cellModel = cell.model;
        if (cellModel) {
          if (!min || min > cell.col) {
            min = cell.col;
          }
          if (max < cell.col) {
            max = cell.col;
          }
          cells.push(cellModel);
        }
      }
    });
    return this.height || cells.length ? {
      cells,
      number: this.number,
      min,
      max,
      height: this.height,
      style: this.style,
      hidden: this.hidden,
      outlineLevel: this.outlineLevel,
      collapsed: this.collapsed
    } : null;
  }
  set model(value) {
    if (value.number !== this._number) {
      throw new Error("Invalid row number in model");
    }
    this._cells = [];
    let previousAddress;
    value.cells.forEach((cellModel) => {
      switch (cellModel.type) {
        case cell_default.Types.Merge:
          break;
        default: {
          let address;
          if (cellModel.address) {
            address = decodeAddress(cellModel.address);
          } else if (previousAddress) {
            const { row } = previousAddress;
            const col = previousAddress.col + 1;
            address = {
              row,
              col,
              address: encodeAddress(row, col),
              $col$row: `$${n2l(col)}$${row}`
            };
          }
          previousAddress = address;
          const cell = this.getCellEx(address);
          cell.model = cellModel;
          break;
        }
      }
    });
    if (value.height) {
      this.height = value.height;
    } else {
      delete this.height;
    }
    this.hidden = value.hidden;
    this.outlineLevel = value.outlineLevel || 0;
    this.style = value.style && JSON.parse(JSON.stringify(value.style)) || {};
  }
};
var row_default = Row;

// esm/doc/column.js
init_under_dash();
init_col_cache();
var DEFAULT_COLUMN_WIDTH = 9;
var Column = class _Column {
  constructor(worksheet, number, defn) {
    this._worksheet = worksheet;
    this._number = number;
    if (defn !== false) {
      this.defn = defn;
    }
  }
  get number() {
    return this._number;
  }
  get worksheet() {
    return this._worksheet;
  }
  get letter() {
    return n2l2(this._number);
  }
  get isCustomWidth() {
    return this.width !== void 0 && this.width !== DEFAULT_COLUMN_WIDTH;
  }
  get defn() {
    return {
      header: this._header,
      key: this.key,
      width: this.width,
      style: this.style,
      hidden: this.hidden,
      outlineLevel: this.outlineLevel
    };
  }
  set defn(value) {
    if (value) {
      this.key = value.key;
      this.width = value.width !== void 0 ? value.width : DEFAULT_COLUMN_WIDTH;
      this.outlineLevel = value.outlineLevel;
      if (value.style) {
        this.style = value.style;
      } else {
        this.style = {};
      }
      this.header = value.header;
      this._hidden = !!value.hidden;
    } else {
      delete this._header;
      delete this._key;
      delete this.width;
      this.style = {};
      this.outlineLevel = 0;
    }
  }
  get headers() {
    return this._header && this._header instanceof Array ? this._header : [this._header];
  }
  get header() {
    return this._header;
  }
  set header(value) {
    if (value !== void 0) {
      this._header = value;
      this.headers.forEach((text, index) => {
        this._worksheet.getCell(index + 1, this.number).value = text;
      });
    } else {
      this._header = void 0;
    }
  }
  get key() {
    return this._key;
  }
  set key(value) {
    const column = this._key && this._worksheet.getColumnKey(this._key);
    if (column === this) {
      this._worksheet.deleteColumnKey(this._key);
    }
    this._key = value;
    if (value) {
      this._worksheet.setColumnKey(this._key, this);
    }
  }
  get hidden() {
    return !!this._hidden;
  }
  set hidden(value) {
    this._hidden = value;
  }
  get outlineLevel() {
    return this._outlineLevel || 0;
  }
  set outlineLevel(value) {
    this._outlineLevel = value;
  }
  get collapsed() {
    return !!(this._outlineLevel && this._outlineLevel >= this._worksheet.properties.outlineLevelCol);
  }
  toString() {
    return JSON.stringify({
      key: this.key,
      width: this.width,
      headers: this.headers.length ? this.headers : void 0
    });
  }
  equivalentTo(other) {
    return this.width === other.width && this.hidden === other.hidden && this.outlineLevel === other.outlineLevel && isEqual(this.style, other.style);
  }
  get isDefault() {
    if (this.isCustomWidth) {
      return false;
    }
    if (this.hidden) {
      return false;
    }
    if (this.outlineLevel) {
      return false;
    }
    const s = this.style;
    if (s && (s.font || s.numFmt || s.alignment || s.border || s.fill || s.protection)) {
      return false;
    }
    return true;
  }
  get headerCount() {
    return this.headers.length;
  }
  eachCell(options, iteratee) {
    const colNumber = this.number;
    if (!iteratee) {
      iteratee = options;
      options = null;
    }
    this._worksheet.eachRow(options, (row, rowNumber) => {
      iteratee(row.getCell(colNumber), rowNumber);
    });
  }
  get values() {
    const v = [];
    this.eachCell((cell, rowNumber) => {
      if (cell && cell.type !== 0) {
        v[rowNumber] = cell.value;
      }
    });
    return v;
  }
  set values(v) {
    if (!v) {
      return;
    }
    const colNumber = this.number;
    let offset = 0;
    if (v.hasOwnProperty("0")) {
      offset = 1;
    }
    v.forEach((value, index) => {
      this._worksheet.getCell(index + offset, colNumber).value = value;
    });
  }
  // =========================================================================
  // styles
  _applyStyle(name, value) {
    this.style[name] = value;
    this.eachCell((cell) => {
      cell[name] = value;
    });
    return value;
  }
  get numFmt() {
    return this.style.numFmt;
  }
  set numFmt(value) {
    this._applyStyle("numFmt", value);
  }
  get font() {
    return this.style.font;
  }
  set font(value) {
    this._applyStyle("font", value);
  }
  get alignment() {
    return this.style.alignment;
  }
  set alignment(value) {
    this._applyStyle("alignment", value);
  }
  get protection() {
    return this.style.protection;
  }
  set protection(value) {
    this._applyStyle("protection", value);
  }
  get border() {
    return this.style.border;
  }
  set border(value) {
    this._applyStyle("border", value);
  }
  get fill() {
    return this.style.fill;
  }
  set fill(value) {
    this._applyStyle("fill", value);
  }
  // =============================================================================
  // static functions
  static toModel(columns) {
    const cols = [];
    let col = null;
    if (columns) {
      columns.forEach((column, index) => {
        if (column.isDefault) {
          if (col) {
            col = null;
          }
        } else if (!col || !column.equivalentTo(col)) {
          col = {
            min: index + 1,
            max: index + 1,
            width: column.width !== void 0 ? column.width : DEFAULT_COLUMN_WIDTH,
            style: column.style,
            isCustomWidth: column.isCustomWidth,
            hidden: column.hidden,
            outlineLevel: column.outlineLevel,
            collapsed: column.collapsed
          };
          cols.push(col);
        } else {
          col.max = index + 1;
        }
      });
    }
    return cols.length ? cols : void 0;
  }
  static fromModel(worksheet, cols) {
    cols = cols || [];
    const columns = [];
    let count = 1;
    let index = 0;
    cols = cols.sort(function(pre, next) {
      return pre.min - next.min;
    });
    while (index < cols.length) {
      const col = cols[index++];
      while (count < col.min) {
        columns.push(new _Column(worksheet, count++));
      }
      while (count <= col.max) {
        columns.push(new _Column(worksheet, count++, col));
      }
    }
    return columns.length ? columns : null;
  }
};
var column_default = Column;

// esm/doc/image.js
init_col_cache();

// esm/doc/anchor.js
init_col_cache();
var Anchor = class _Anchor {
  constructor(worksheet, address, offset = 0) {
    this.worksheet = worksheet;
    if (!address) {
      this.nativeCol = 0;
      this.nativeColOff = 0;
      this.nativeRow = 0;
      this.nativeRowOff = 0;
    } else if (typeof address === "string") {
      const decoded = decodeAddress(address);
      this.nativeCol = decoded.col + offset;
      this.nativeColOff = 0;
      this.nativeRow = decoded.row + offset;
      this.nativeRowOff = 0;
    } else if (address.nativeCol !== void 0) {
      this.nativeCol = address.nativeCol || 0;
      this.nativeColOff = address.nativeColOff || 0;
      this.nativeRow = address.nativeRow || 0;
      this.nativeRowOff = address.nativeRowOff || 0;
    } else if (address.col !== void 0) {
      this.col = address.col + offset;
      this.row = address.row + offset;
    } else {
      this.nativeCol = 0;
      this.nativeColOff = 0;
      this.nativeRow = 0;
      this.nativeRowOff = 0;
    }
  }
  static asInstance(model) {
    return model instanceof _Anchor || model == null ? model : new _Anchor(model);
  }
  get col() {
    return this.nativeCol + Math.min(this.colWidth - 1, this.nativeColOff) / this.colWidth;
  }
  set col(v) {
    this.nativeCol = Math.floor(v);
    this.nativeColOff = Math.floor((v - this.nativeCol) * this.colWidth);
  }
  get row() {
    return this.nativeRow + Math.min(this.rowHeight - 1, this.nativeRowOff) / this.rowHeight;
  }
  set row(v) {
    this.nativeRow = Math.floor(v);
    this.nativeRowOff = Math.floor((v - this.nativeRow) * this.rowHeight);
  }
  get colWidth() {
    return this.worksheet && this.worksheet.getColumn(this.nativeCol + 1) && this.worksheet.getColumn(this.nativeCol + 1).isCustomWidth ? Math.floor(this.worksheet.getColumn(this.nativeCol + 1).width * 1e4) : 64e4;
  }
  get rowHeight() {
    return this.worksheet && this.worksheet.getRow(this.nativeRow + 1) && this.worksheet.getRow(this.nativeRow + 1).height ? Math.floor(this.worksheet.getRow(this.nativeRow + 1).height * 1e4) : 18e4;
  }
  get model() {
    return {
      nativeCol: this.nativeCol,
      nativeColOff: this.nativeColOff,
      nativeRow: this.nativeRow,
      nativeRowOff: this.nativeRowOff
    };
  }
  set model(value) {
    this.nativeCol = value.nativeCol;
    this.nativeColOff = value.nativeColOff;
    this.nativeRow = value.nativeRow;
    this.nativeRowOff = value.nativeRowOff;
  }
};
var anchor_default = Anchor;

// esm/doc/image.js
var Image = class {
  constructor(worksheet, model) {
    this.worksheet = worksheet;
    this.model = model;
  }
  get model() {
    switch (this.type) {
      case "background":
        return {
          type: this.type,
          imageId: this.imageId
        };
      case "image":
        return {
          type: this.type,
          imageId: this.imageId,
          hyperlinks: this.range.hyperlinks,
          range: {
            tl: this.range.tl.model,
            br: this.range.br && this.range.br.model,
            ext: this.range.ext,
            editAs: this.range.editAs
          }
        };
      default:
        throw new Error("Invalid Image Type");
    }
  }
  set model({ type, imageId, range: range2, hyperlinks }) {
    this.type = type;
    this.imageId = imageId;
    if (type === "image") {
      if (typeof range2 === "string") {
        const decoded = decode(range2);
        this.range = {
          tl: new anchor_default(this.worksheet, { col: decoded.left, row: decoded.top }, -1),
          br: new anchor_default(this.worksheet, { col: decoded.right, row: decoded.bottom }, 0),
          editAs: "oneCell"
        };
      } else {
        this.range = {
          tl: new anchor_default(this.worksheet, range2.tl, 0),
          br: range2.br && new anchor_default(this.worksheet, range2.br, 0),
          ext: range2.ext,
          editAs: range2.editAs,
          hyperlinks: hyperlinks || range2.hyperlinks
        };
      }
    }
  }
};
var image_default = Image;

// esm/doc/table.js
init_col_cache();
var Column2 = class {
  // wrapper around column model, allowing access and manipulation
  constructor(table, column, index) {
    this.table = table;
    this.column = column;
    this.index = index;
  }
  _set(name, value) {
    this.table.cacheState();
    this.column[name] = value;
  }
  /* eslint-disable lines-between-class-members */
  get name() {
    return this.column.name;
  }
  set name(value) {
    this._set("name", value);
  }
  get filterButton() {
    return this.column.filterButton;
  }
  set filterButton(value) {
    this.column.filterButton = value;
  }
  get style() {
    return this.column.style;
  }
  set style(value) {
    this.column.style = value;
  }
  get totalsRowLabel() {
    return this.column.totalsRowLabel;
  }
  set totalsRowLabel(value) {
    this._set("totalsRowLabel", value);
  }
  get totalsRowFunction() {
    return this.column.totalsRowFunction;
  }
  set totalsRowFunction(value) {
    this._set("totalsRowFunction", value);
  }
  get totalsRowResult() {
    return this.column.totalsRowResult;
  }
  set totalsRowResult(value) {
    this._set("totalsRowResult", value);
  }
  get totalsRowFormula() {
    return this.column.totalsRowFormula;
  }
  set totalsRowFormula(value) {
    this._set("totalsRowFormula", value);
  }
};
var Table = class {
  constructor(worksheet, table) {
    this.worksheet = worksheet;
    if (table) {
      this.table = table;
      this.validate();
      this.store();
    }
  }
  getFormula(column) {
    switch (column.totalsRowFunction) {
      case "none":
        return null;
      case "average":
        return `SUBTOTAL(101,${this.table.name}[${column.name}])`;
      case "countNums":
        return `SUBTOTAL(102,${this.table.name}[${column.name}])`;
      case "count":
        return `SUBTOTAL(103,${this.table.name}[${column.name}])`;
      case "max":
        return `SUBTOTAL(104,${this.table.name}[${column.name}])`;
      case "min":
        return `SUBTOTAL(105,${this.table.name}[${column.name}])`;
      case "stdDev":
        return `SUBTOTAL(106,${this.table.name}[${column.name}])`;
      case "var":
        return `SUBTOTAL(107,${this.table.name}[${column.name}])`;
      case "sum":
        return `SUBTOTAL(109,${this.table.name}[${column.name}])`;
      case "custom":
        return column.totalsRowFormula;
      default:
        throw new Error(`Invalid Totals Row Function: ${column.totalsRowFunction}`);
    }
  }
  get width() {
    return this.table.columns.length;
  }
  get height() {
    return this.table.rows.length;
  }
  get filterHeight() {
    return this.height + (this.table.headerRow ? 1 : 0);
  }
  get tableHeight() {
    return this.filterHeight + (this.table.totalsRow ? 1 : 0);
  }
  validate() {
    const { table } = this;
    const assign2 = (o, name, dflt) => {
      if (o[name] === void 0) {
        o[name] = dflt;
      }
    };
    assign2(table, "headerRow", true);
    assign2(table, "totalsRow", false);
    assign2(table, "style", {});
    assign2(table.style, "theme", "TableStyleMedium2");
    assign2(table.style, "showFirstColumn", false);
    assign2(table.style, "showLastColumn", false);
    assign2(table.style, "showRowStripes", false);
    assign2(table.style, "showColumnStripes", false);
    const assert = (test, message) => {
      if (!test) {
        throw new Error(message);
      }
    };
    assert(table.ref, "Table must have ref");
    assert(table.columns, "Table must have column definitions");
    assert(table.rows, "Table must have row definitions");
    table.tl = decodeAddress(table.ref);
    const { row, col } = table.tl;
    assert(row > 0, "Table must be on valid row");
    assert(col > 0, "Table must be on valid col");
    const { width, filterHeight, tableHeight } = this;
    table.autoFilterRef = encode(row, col, row + filterHeight - 1, col + width - 1);
    table.tableRef = encode(row, col, row + tableHeight - 1, col + width - 1);
    table.columns.forEach((column, i) => {
      assert(column.name, `Column ${i} must have a name`);
      if (i === 0) {
        assign2(column, "totalsRowLabel", "Total");
      } else {
        assign2(column, "totalsRowFunction", "none");
        column.totalsRowFormula = this.getFormula(column);
      }
    });
  }
  store() {
    const assignStyle = (cell, style) => {
      if (style) {
        Object.keys(style).forEach((key) => {
          cell.style[key] = style[key];
        });
      }
    };
    const { worksheet, table } = this;
    const { row, col } = table.tl;
    let count = 0;
    if (table.headerRow) {
      const r = worksheet.getRow(row + count++);
      table.columns.forEach((column, j) => {
        const { style, name } = column;
        const cell = r.getCell(col + j);
        cell.value = name;
        assignStyle(cell, style);
      });
    }
    table.rows.forEach((data) => {
      const r = worksheet.getRow(row + count++);
      data.forEach((value, j) => {
        const cell = r.getCell(col + j);
        cell.value = value;
        assignStyle(cell, table.columns[j].style);
      });
    });
    if (table.totalsRow) {
      const r = worksheet.getRow(row + count++);
      table.columns.forEach((column, j) => {
        const cell = r.getCell(col + j);
        if (j === 0) {
          cell.value = column.totalsRowLabel;
        } else {
          const formula = this.getFormula(column);
          if (formula) {
            cell.value = {
              formula: column.totalsRowFormula,
              result: column.totalsRowResult
            };
          } else {
            cell.value = null;
          }
        }
        assignStyle(cell, column.style);
      });
    }
  }
  load(worksheet) {
    const { table } = this;
    const { row, col } = table.tl;
    let count = 0;
    if (table.headerRow) {
      const r = worksheet.getRow(row + count++);
      table.columns.forEach((column, j) => {
        const cell = r.getCell(col + j);
        cell.value = column.name;
      });
    }
    table.rows.forEach((data) => {
      const r = worksheet.getRow(row + count++);
      data.forEach((value, j) => {
        const cell = r.getCell(col + j);
        cell.value = value;
      });
    });
    if (table.totalsRow) {
      const r = worksheet.getRow(row + count++);
      table.columns.forEach((column, j) => {
        const cell = r.getCell(col + j);
        if (j === 0) {
          cell.value = column.totalsRowLabel;
        } else {
          const formula = this.getFormula(column);
          if (formula) {
            cell.value = {
              formula: column.totalsRowFormula,
              result: column.totalsRowResult
            };
          }
        }
      });
    }
  }
  get model() {
    return this.table;
  }
  set model(value) {
    this.table = value;
  }
  // ================================================================
  // TODO: Mutating methods
  cacheState() {
    if (!this._cache) {
      this._cache = {
        ref: this.ref,
        width: this.width,
        tableHeight: this.tableHeight
      };
    }
  }
  commit() {
    if (!this._cache) {
      return;
    }
    this.validate();
    const ref = decodeAddress(this._cache.ref);
    if (this.ref !== this._cache.ref) {
      for (let i = 0; i < this._cache.tableHeight; i++) {
        const row = this.worksheet.getRow(ref.row + i);
        for (let j = 0; j < this._cache.width; j++) {
          const cell = row.getCell(ref.col + j);
          cell.value = null;
        }
      }
    } else {
      for (let i = this.tableHeight; i < this._cache.tableHeight; i++) {
        const row = this.worksheet.getRow(ref.row + i);
        for (let j = 0; j < this._cache.width; j++) {
          const cell = row.getCell(ref.col + j);
          cell.value = null;
        }
      }
      for (let i = 0; i < this.tableHeight; i++) {
        const row = this.worksheet.getRow(ref.row + i);
        for (let j = this.width; j < this._cache.width; j++) {
          const cell = row.getCell(ref.col + j);
          cell.value = null;
        }
      }
    }
    this.store();
  }
  addRow(values, rowNumber) {
    this.cacheState();
    if (rowNumber === void 0) {
      this.table.rows.push(values);
    } else {
      this.table.rows.splice(rowNumber, 0, values);
    }
  }
  removeRows(rowIndex, count = 1) {
    this.cacheState();
    this.table.rows.splice(rowIndex, count);
  }
  getColumn(colIndex) {
    const column = this.table.columns[colIndex];
    return new Column2(this, column, colIndex);
  }
  addColumn(column, values, colIndex) {
    this.cacheState();
    if (colIndex === void 0) {
      this.table.columns.push(column);
      this.table.rows.forEach((row, i) => {
        row.push(values[i]);
      });
    } else {
      this.table.columns.splice(colIndex, 0, column);
      this.table.rows.forEach((row, i) => {
        row.splice(colIndex, 0, values[i]);
      });
    }
  }
  removeColumns(colIndex, count = 1) {
    this.cacheState();
    this.table.columns.splice(colIndex, count);
    this.table.rows.forEach((row) => {
      row.splice(colIndex, count);
    });
  }
  _assign(target, prop, value) {
    this.cacheState();
    target[prop] = value;
  }
  /* eslint-disable lines-between-class-members */
  get ref() {
    return this.table.ref;
  }
  set ref(value) {
    this._assign(this.table, "ref", value);
  }
  get name() {
    return this.table.name;
  }
  set name(value) {
    this.table.name = value;
  }
  get displayName() {
    return this.table.displyName || this.table.name;
  }
  set displayNamename(value) {
    this.table.displayName = value;
  }
  get headerRow() {
    return this.table.headerRow;
  }
  set headerRow(value) {
    this._assign(this.table, "headerRow", value);
  }
  get totalsRow() {
    return this.table.totalsRow;
  }
  set totalsRow(value) {
    this._assign(this.table, "totalsRow", value);
  }
  get theme() {
    return this.table.style.name;
  }
  set theme(value) {
    this.table.style.name = value;
  }
  get showFirstColumn() {
    return this.table.style.showFirstColumn;
  }
  set showFirstColumn(value) {
    this.table.style.showFirstColumn = value;
  }
  get showLastColumn() {
    return this.table.style.showLastColumn;
  }
  set showLastColumn(value) {
    this.table.style.showLastColumn = value;
  }
  get showRowStripes() {
    return this.table.style.showRowStripes;
  }
  set showRowStripes(value) {
    this.table.style.showRowStripes = value;
  }
  get showColumnStripes() {
    return this.table.style.showColumnStripes;
  }
  set showColumnStripes(value) {
    this.table.style.showColumnStripes = value;
  }
};
var table_default = Table;

// esm/doc/data-validations.js
var DataValidations = class {
  constructor(model) {
    this.model = model || {};
  }
  add(address, validation3) {
    return this.model[address] = validation3;
  }
  find(address) {
    return this.model[address];
  }
  remove(address) {
    this.model[address] = void 0;
  }
};
var data_validations_default = DataValidations;

// esm/doc/pivot-table.js
init_utils();
function makePivotTable(worksheet, model) {
  validate(worksheet, model);
  const { sourceSheet } = model;
  let { rows, columns, values } = model;
  const cacheFields = makeCacheFields(sourceSheet, [...rows, ...columns]);
  const nameToIndex = cacheFields.reduce((result, cacheField, index) => {
    result[cacheField.name] = index;
    return result;
  }, {});
  rows = rows.map((row) => nameToIndex[row]);
  columns = columns.map((column) => nameToIndex[column]);
  values = values.map((value) => nameToIndex[value]);
  return {
    sourceSheet,
    rows,
    columns,
    values,
    metric: "sum",
    cacheFields,
    // defined in <pivotTableDefinition> of xl/pivotTables/pivotTable1.xml;
    // also used in xl/workbook.xml
    cacheId: "10"
  };
}
function validate(worksheet, model) {
  if (worksheet.workbook.pivotTables.length === 1) {
    throw new Error("A pivot table was already added. At this time, ExcelJS supports at most one pivot table per file.");
  }
  if (model.metric && model.metric !== "sum") {
    throw new Error('Only the "sum" metric is supported at this time.');
  }
  const headerNames = model.sourceSheet.getRow(1).values.slice(1);
  const isInHeaderNames = objectFromProps(headerNames, true);
  for (const name of [...model.rows, ...model.columns, ...model.values]) {
    if (!isInHeaderNames[name]) {
      throw new Error(`The header name "${name}" was not found in ${model.sourceSheet.name}.`);
    }
  }
  if (!model.rows.length) {
    throw new Error("No pivot table rows specified.");
  }
  if (!model.columns.length) {
    throw new Error("No pivot table columns specified.");
  }
  if (model.values.length !== 1) {
    throw new Error("Exactly 1 value needs to be specified at this time.");
  }
}
function makeCacheFields(worksheet, fieldNamesWithSharedItems) {
  const names = worksheet.getRow(1).values;
  const nameToHasSharedItems = objectFromProps(fieldNamesWithSharedItems, true);
  const aggregate = (columnIndex) => {
    const columnValues = worksheet.getColumn(columnIndex).values.splice(2);
    const columnValuesAsSet = new Set(columnValues);
    return toSortedArray(columnValuesAsSet);
  };
  const result = [];
  for (const columnIndex of range(1, names.length)) {
    const name = names[columnIndex];
    const sharedItems = nameToHasSharedItems[name] ? aggregate(columnIndex) : null;
    result.push({ name, sharedItems });
  }
  return result;
}

// esm/utils/copy-style.js
var oneDepthCopy = (obj, nestKeys) => ({
  ...obj,
  ...nestKeys.reduce((memo, key) => {
    if (obj[key])
      memo[key] = { ...obj[key] };
    return memo;
  }, {})
});
var setIfExists = (src, dst, key, nestKeys = []) => {
  if (src[key])
    dst[key] = oneDepthCopy(src[key], nestKeys);
};
var isEmptyObj = (obj) => Object.keys(obj).length === 0;
var copyStyle = (style) => {
  if (!style)
    return style;
  if (isEmptyObj(style))
    return {};
  const copied = { ...style };
  setIfExists(style, copied, "font", ["color"]);
  setIfExists(style, copied, "alignment");
  setIfExists(style, copied, "protection");
  if (style.border) {
    setIfExists(style, copied, "border");
    setIfExists(style.border, copied.border, "top", ["color"]);
    setIfExists(style.border, copied.border, "left", ["color"]);
    setIfExists(style.border, copied.border, "bottom", ["color"]);
    setIfExists(style.border, copied.border, "right", ["color"]);
    setIfExists(style.border, copied.border, "diagonal", ["color"]);
  }
  if (style.fill) {
    setIfExists(style, copied, "fill", ["fgColor", "bgColor", "center"]);
    if (style.fill.stops) {
      copied.fill.stops = style.fill.stops.map((s) => oneDepthCopy(s, ["color"]));
    }
  }
  return copied;
};

// esm/doc/worksheet.js
var Worksheet = class {
  constructor(options) {
    options = options || {};
    this._workbook = options.workbook;
    this.id = options.id;
    this.orderNo = options.orderNo;
    this.name = options.name;
    this.state = options.state || "visible";
    this._rows = [];
    this._columns = null;
    this._keys = {};
    this._merges = {};
    this.rowBreaks = [];
    this.properties = Object.assign({}, {
      defaultRowHeight: 15,
      dyDescent: 55,
      outlineLevelCol: 0,
      outlineLevelRow: 0
    }, options.properties);
    this.pageSetup = Object.assign({}, {
      margins: { left: 0.7, right: 0.7, top: 0.75, bottom: 0.75, header: 0.3, footer: 0.3 },
      orientation: "portrait",
      horizontalDpi: 4294967295,
      verticalDpi: 4294967295,
      fitToPage: !!(options.pageSetup && (options.pageSetup.fitToWidth || options.pageSetup.fitToHeight) && !options.pageSetup.scale),
      pageOrder: "downThenOver",
      blackAndWhite: false,
      draft: false,
      cellComments: "None",
      errors: "displayed",
      scale: 100,
      fitToWidth: 1,
      fitToHeight: 1,
      paperSize: void 0,
      showRowColHeaders: false,
      showGridLines: false,
      firstPageNumber: void 0,
      horizontalCentered: false,
      verticalCentered: false,
      rowBreaks: null,
      colBreaks: null
    }, options.pageSetup);
    this.headerFooter = Object.assign({}, {
      differentFirst: false,
      differentOddEven: false,
      oddHeader: null,
      oddFooter: null,
      evenHeader: null,
      evenFooter: null,
      firstHeader: null,
      firstFooter: null
    }, options.headerFooter);
    this.dataValidations = new data_validations_default();
    this.views = options.views || [];
    this.autoFilter = options.autoFilter || null;
    this._media = [];
    this.sheetProtection = null;
    this.tables = {};
    this.pivotTables = [];
    this.conditionalFormattings = [];
  }
  get name() {
    return this._name;
  }
  set name(name) {
    if (name === void 0) {
      name = `sheet${this.id}`;
    }
    if (this._name === name)
      return;
    if (typeof name !== "string") {
      throw new Error("The name has to be a string.");
    }
    if (name === "") {
      throw new Error("The name can't be empty.");
    }
    if (name === "History") {
      throw new Error('The name "History" is protected. Please use a different name.');
    }
    if (/[*?:/\\[\]]/.test(name)) {
      throw new Error(`Worksheet name ${name} cannot include any of the following characters: * ? : \\ / [ ]`);
    }
    if (/(^')|('$)/.test(name)) {
      throw new Error(`The first or last character of worksheet name cannot be a single quotation mark: ${name}`);
    }
    if (name && name.length > 31) {
      console.warn(`Worksheet name ${name} exceeds 31 chars. This will be truncated`);
      name = name.substring(0, 31);
    }
    if (this._workbook._worksheets.find((ws) => ws && ws.name.toLowerCase() === name.toLowerCase())) {
      throw new Error(`Worksheet name already exists: ${name}`);
    }
    this._name = name;
  }
  get workbook() {
    return this._workbook;
  }
  // when you're done with this worksheet, call this to remove from workbook
  destroy() {
    this._workbook.removeWorksheetEx(this);
  }
  // Get the bounding range of the cells in this worksheet
  get dimensions() {
    const dimensions = new range_default();
    this._rows.forEach((row) => {
      if (row) {
        const rowDims = row.dimensions;
        if (rowDims) {
          dimensions.expand(row.number, rowDims.min, row.number, rowDims.max);
        }
      }
    });
    return dimensions;
  }
  // =========================================================================
  // Columns
  // get the current columns array.
  get columns() {
    return this._columns;
  }
  // set the columns from an array of column definitions.
  // Note: any headers defined will overwrite existing values.
  set columns(value) {
    this._headerRowCount = value.reduce((pv, cv) => {
      const headerCount = cv.header && 1 || cv.headers && cv.headers.length || 0;
      return Math.max(pv, headerCount);
    }, 0);
    let count = 1;
    const columns = this._columns = [];
    value.forEach((defn) => {
      const column = new column_default(this, count++, false);
      columns.push(column);
      column.defn = defn;
    });
  }
  getColumnKey(key) {
    return this._keys[key];
  }
  setColumnKey(key, value) {
    this._keys[key] = value;
  }
  deleteColumnKey(key) {
    delete this._keys[key];
  }
  eachColumnKey(f) {
    each(this._keys, f);
  }
  // get a single column by col number. If it doesn't exist, create it and any gaps before it
  getColumn(c2) {
    if (typeof c2 === "string") {
      const col = this._keys[c2];
      if (col)
        return col;
      c2 = l2n(c2);
    }
    if (!this._columns) {
      this._columns = [];
    }
    if (c2 > this._columns.length) {
      let n = this._columns.length + 1;
      while (n <= c2) {
        this._columns.push(new column_default(this, n++));
      }
    }
    return this._columns[c2 - 1];
  }
  spliceColumns(start, count, ...inserts) {
    const rows = this._rows;
    const nRows = rows.length;
    if (inserts.length > 0) {
      for (let i = 0; i < nRows; i++) {
        const rowArguments = [start, count];
        inserts.forEach((insert) => {
          rowArguments.push(insert[i] || null);
        });
        const row = this.getRow(i + 1);
        row.splice.apply(row, rowArguments);
      }
    } else {
      this._rows.forEach((r) => {
        if (r) {
          r.splice(start, count);
        }
      });
    }
    const nExpand = inserts.length - count;
    const nKeep = start + count;
    const nEnd = this._columns.length;
    if (nExpand < 0) {
      for (let i = start + inserts.length; i <= nEnd; i++) {
        this.getColumn(i).defn = this.getColumn(i - nExpand).defn;
      }
    } else if (nExpand > 0) {
      for (let i = nEnd; i >= nKeep; i--) {
        this.getColumn(i + nExpand).defn = this.getColumn(i).defn;
      }
    }
    for (let i = start; i < start + inserts.length; i++) {
      this.getColumn(i).defn = null;
    }
    this.workbook.definedNames.spliceColumns(this.name, start, count, inserts.length);
  }
  get lastColumn() {
    return this.getColumn(this.columnCount);
  }
  get columnCount() {
    let maxCount = 0;
    this.eachRow((row) => {
      maxCount = Math.max(maxCount, row.cellCount);
    });
    return maxCount;
  }
  get actualColumnCount() {
    const counts = [];
    let count = 0;
    this.eachRow((row) => {
      row.eachCell(({ col }) => {
        if (!counts[col]) {
          counts[col] = true;
          count++;
        }
      });
    });
    return count;
  }
  // =========================================================================
  // Rows
  _commitRow() {
  }
  get _lastRowNumber() {
    const rows = this._rows;
    let n = rows.length;
    while (n > 0 && rows[n - 1] === void 0) {
      n--;
    }
    return n;
  }
  get _nextRow() {
    return this._lastRowNumber + 1;
  }
  get lastRow() {
    if (this._rows.length) {
      return this._rows[this._rows.length - 1];
    }
    return void 0;
  }
  // find a row (if exists) by row number
  findRow(r) {
    return this._rows[r - 1];
  }
  // find multiple rows (if exists) by row number
  findRows(start, length) {
    return this._rows.slice(start - 1, start - 1 + length);
  }
  get rowCount() {
    return this._lastRowNumber;
  }
  get actualRowCount() {
    let count = 0;
    this.eachRow(() => {
      count++;
    });
    return count;
  }
  // get a row by row number.
  getRow(r) {
    let row = this._rows[r - 1];
    if (!row) {
      row = this._rows[r - 1] = new row_default(this, r);
    }
    return row;
  }
  // get multiple rows by row number.
  getRows(start, length) {
    if (length < 1)
      return void 0;
    const rows = [];
    for (let i = start; i < start + length; i++) {
      rows.push(this.getRow(i));
    }
    return rows;
  }
  addRow(value, style = "n") {
    const rowNo = this._nextRow;
    const row = this.getRow(rowNo);
    row.values = value;
    this._setStyleOption(rowNo, style[0] === "i" ? style : "n");
    return row;
  }
  addRows(value, style = "n") {
    const rows = [];
    value.forEach((row) => {
      rows.push(this.addRow(row, style));
    });
    return rows;
  }
  insertRow(pos, value, style = "n") {
    this.spliceRows(pos, 0, value);
    this._setStyleOption(pos, style);
    return this.getRow(pos);
  }
  insertRows(pos, values, style = "n") {
    this.spliceRows(pos, 0, ...values);
    if (style !== "n") {
      for (let i = 0; i < values.length; i++) {
        if (style[0] === "o" && this.findRow(values.length + pos + i) !== void 0) {
          this._copyStyle(values.length + pos + i, pos + i, style[1] === "+");
        } else if (style[0] === "i" && this.findRow(pos - 1) !== void 0) {
          this._copyStyle(pos - 1, pos + i, style[1] === "+");
        }
      }
    }
    return this.getRows(pos, values.length);
  }
  // set row at position to same style as of either pervious row (option 'i') or next row (option 'o')
  _setStyleOption(pos, style = "n") {
    if (style[0] === "o" && this.findRow(pos + 1) !== void 0) {
      this._copyStyle(pos + 1, pos, style[1] === "+");
    } else if (style[0] === "i" && this.findRow(pos - 1) !== void 0) {
      this._copyStyle(pos - 1, pos, style[1] === "+");
    }
  }
  _copyStyle(src, dest, styleEmpty = false) {
    const rSrc = this.getRow(src);
    const rDst = this.getRow(dest);
    rDst.style = copyStyle(rSrc.style);
    rSrc.eachCell({ includeEmpty: styleEmpty }, (cell, colNumber) => {
      rDst.getCell(colNumber).style = copyStyle(cell.style);
    });
    rDst.height = rSrc.height;
  }
  duplicateRow(rowNum, count, insert = false) {
    const rSrc = this._rows[rowNum - 1];
    const inserts = new Array(count).fill(rSrc.values);
    this.spliceRows(rowNum + 1, insert ? 0 : count, ...inserts);
    for (let i = 0; i < count; i++) {
      const rDst = this._rows[rowNum + i];
      rDst.style = rSrc.style;
      rDst.height = rSrc.height;
      rSrc.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        rDst.getCell(colNumber).style = cell.style;
      });
    }
  }
  spliceRows(start, count, ...inserts) {
    const nKeep = start + count;
    const nInserts = inserts.length;
    const nExpand = nInserts - count;
    const nEnd = this._rows.length;
    let i;
    let rSrc;
    if (nExpand < 0) {
      if (start === nEnd) {
        this._rows[nEnd - 1] = void 0;
      }
      for (i = nKeep; i <= nEnd; i++) {
        rSrc = this._rows[i - 1];
        if (rSrc) {
          const rDst = this.getRow(i + nExpand);
          rDst.values = rSrc.values;
          rDst.style = rSrc.style;
          rDst.height = rSrc.height;
          rSrc.eachCell({ includeEmpty: true }, (cell, colNumber) => {
            rDst.getCell(colNumber).style = cell.style;
          });
          this._rows[i - 1] = void 0;
        } else {
          this._rows[i + nExpand - 1] = void 0;
        }
      }
    } else if (nExpand > 0) {
      for (i = nEnd; i >= nKeep; i--) {
        rSrc = this._rows[i - 1];
        if (rSrc) {
          const rDst = this.getRow(i + nExpand);
          rDst.values = rSrc.values;
          rDst.style = rSrc.style;
          rDst.height = rSrc.height;
          rSrc.eachCell({ includeEmpty: true }, (cell, colNumber) => {
            rDst.getCell(colNumber).style = cell.style;
            if (cell._value.constructor.name === "MergeValue") {
              const cellToBeMerged = this.getRow(cell._row._number + nInserts).getCell(colNumber);
              const prevMaster = cell._value._master;
              const newMaster = this.getRow(prevMaster._row._number + nInserts).getCell(prevMaster._column._number);
              cellToBeMerged.merge(newMaster);
            }
          });
        } else {
          this._rows[i + nExpand - 1] = void 0;
        }
      }
    }
    for (i = 0; i < nInserts; i++) {
      const rDst = this.getRow(start + i);
      rDst.style = {};
      rDst.values = inserts[i];
    }
    this.workbook.definedNames.spliceRows(this.name, start, count, nInserts);
  }
  // iterate over every row in the worksheet, including maybe empty rows
  eachRow(options, iteratee) {
    if (!iteratee) {
      iteratee = options;
      options = void 0;
    }
    if (options && options.includeEmpty) {
      const n = this._rows.length;
      for (let i = 1; i <= n; i++) {
        iteratee(this.getRow(i), i);
      }
    } else {
      this._rows.forEach((row) => {
        if (row && row.hasValues) {
          iteratee(row, row.number);
        }
      });
    }
  }
  // return all rows as sparse array
  getSheetValues() {
    const rows = [];
    this._rows.forEach((row) => {
      if (row) {
        rows[row.number] = row.values;
      }
    });
    return rows;
  }
  // =========================================================================
  // Cells
  // returns the cell at [r,c] or address given by r. If not found, return undefined
  findCell(r, c2) {
    const address = getAddress(r, c2);
    const row = this._rows[address.row - 1];
    return row ? row.findCell(address.col) : void 0;
  }
  // return the cell at [r,c] or address given by r. If not found, create a new one.
  getCell(r, c2) {
    const address = getAddress(r, c2);
    const row = this.getRow(address.row);
    return row.getCellEx(address);
  }
  // =========================================================================
  // Merge
  // convert the range defined by ['tl:br'], [tl,br] or [t,l,b,r] into a single 'merged' cell
  mergeCells(...cells) {
    const dimensions = new range_default(cells);
    this._mergeCellsInternal(dimensions);
  }
  mergeCellsWithoutStyle(...cells) {
    const dimensions = new range_default(cells);
    this._mergeCellsInternal(dimensions, true);
  }
  _mergeCellsInternal(dimensions, ignoreStyle) {
    each(this._merges, (merge) => {
      if (merge.intersects(dimensions)) {
        throw new Error("Cannot merge already merged cells");
      }
    });
    const master = this.getCell(dimensions.top, dimensions.left);
    for (let i = dimensions.top; i <= dimensions.bottom; i++) {
      for (let j = dimensions.left; j <= dimensions.right; j++) {
        if (i > dimensions.top || j > dimensions.left) {
          this.getCell(i, j).merge(master, ignoreStyle);
        }
      }
    }
    this._merges[master.address] = dimensions;
  }
  _unMergeMaster(master) {
    const merge = this._merges[master.address];
    if (merge) {
      for (let i = merge.top; i <= merge.bottom; i++) {
        for (let j = merge.left; j <= merge.right; j++) {
          this.getCell(i, j).unmerge();
        }
      }
      delete this._merges[master.address];
    }
  }
  get hasMerges() {
    return some2(this._merges, Boolean);
  }
  // scan the range defined by ['tl:br'], [tl,br] or [t,l,b,r] and if any cell is part of a merge,
  // un-merge the group. Note this function can affect multiple merges and merge-blocks are
  // atomic - either they're all merged or all un-merged.
  unMergeCells(...cells) {
    const dimensions = new range_default(cells);
    for (let i = dimensions.top; i <= dimensions.bottom; i++) {
      for (let j = dimensions.left; j <= dimensions.right; j++) {
        const cell = this.findCell(i, j);
        if (cell) {
          if (cell.type === ValueType.Merge) {
            this._unMergeMaster(cell.master);
          } else if (this._merges[cell.address]) {
            this._unMergeMaster(cell);
          }
        }
      }
    }
  }
  // ===========================================================================
  // Shared/Array Formula
  fillFormula(range2, formula, results, shareType = "shared") {
    const decoded = decode(range2);
    const { top, left, bottom, right } = decoded;
    const width = right - left + 1;
    const masterAddress = encodeAddress(top, left);
    const isShared = shareType === "shared";
    let getResult;
    if (typeof results === "function") {
      getResult = results;
    } else if (Array.isArray(results)) {
      if (Array.isArray(results[0])) {
        getResult = (row, col) => results[row - top][col - left];
      } else {
        getResult = (row, col) => results[(row - top) * width + (col - left)];
      }
    } else {
      getResult = () => void 0;
    }
    let first = true;
    for (let r = top; r <= bottom; r++) {
      for (let c2 = left; c2 <= right; c2++) {
        if (first) {
          this.getCell(r, c2).value = {
            shareType,
            formula,
            ref: range2,
            result: getResult(r, c2)
          };
          first = false;
        } else {
          this.getCell(r, c2).value = isShared ? {
            sharedFormula: masterAddress,
            result: getResult(r, c2)
          } : getResult(r, c2);
        }
      }
    }
  }
  // =========================================================================
  // Images
  addImage(imageId, range2) {
    const model = {
      type: "image",
      imageId,
      range: range2
    };
    this._media.push(new image_default(this, model));
  }
  getImages() {
    return this._media.filter((m) => m.type === "image");
  }
  addBackgroundImage(imageId) {
    const model = {
      type: "background",
      imageId
    };
    this._media.push(new image_default(this, model));
  }
  getBackgroundImageId() {
    const image = this._media.find((m) => m.type === "background");
    return image && image.imageId;
  }
  // =========================================================================
  // Worksheet Protection
  protect(password, options) {
    return new Promise((resolve) => {
      this.sheetProtection = {
        sheet: true
      };
      if (options && "spinCount" in options) {
        options.spinCount = Number.isFinite(options.spinCount) ? Math.round(Math.max(0, options.spinCount)) : 1e5;
      }
      if (options) {
        this.sheetProtection = Object.assign(this.sheetProtection, options);
        if (!password && "spinCount" in options) {
          delete this.sheetProtection.spinCount;
        }
      }
      resolve();
    });
  }
  unprotect() {
    this.sheetProtection = null;
  }
  // =========================================================================
  // Tables
  addTable(model) {
    const table = new table_default(this, model);
    this.tables[model.name] = table;
    return table;
  }
  getTable(name) {
    return this.tables[name];
  }
  removeTable(name) {
    delete this.tables[name];
  }
  getTables() {
    return Object.values(this.tables);
  }
  // =========================================================================
  // Pivot Tables
  addPivotTable(model) {
    console.warn(`Warning: Pivot Table support is experimental. 
Please leave feedback at https://github.com/exceljs/exceljs/discussions/2575`);
    const pivotTable = makePivotTable(this, model);
    this.pivotTables.push(pivotTable);
    this.workbook.pivotTables.push(pivotTable);
    return pivotTable;
  }
  // ===========================================================================
  // Conditional Formatting
  addConditionalFormatting(cf) {
    this.conditionalFormattings.push(cf);
  }
  removeConditionalFormatting(filter) {
    if (typeof filter === "number") {
      this.conditionalFormattings.splice(filter, 1);
    } else if (filter instanceof Function) {
      this.conditionalFormattings = this.conditionalFormattings.filter(filter);
    } else {
      this.conditionalFormattings = [];
    }
  }
  // ===========================================================================
  // Deprecated
  get tabColor() {
    console.trace("worksheet.tabColor property is now deprecated. Please use worksheet.properties.tabColor");
    return this.properties.tabColor;
  }
  set tabColor(value) {
    console.trace("worksheet.tabColor property is now deprecated. Please use worksheet.properties.tabColor");
    this.properties.tabColor = value;
  }
  // ===========================================================================
  // Model
  get model() {
    const model = {
      id: this.id,
      name: this.name,
      dataValidations: this.dataValidations.model,
      properties: this.properties,
      state: this.state,
      pageSetup: this.pageSetup,
      headerFooter: this.headerFooter,
      rowBreaks: this.rowBreaks,
      views: this.views,
      autoFilter: this.autoFilter,
      media: this._media.map((medium) => medium.model),
      sheetProtection: this.sheetProtection,
      tables: Object.values(this.tables).map((table) => table.model),
      pivotTables: this.pivotTables,
      conditionalFormattings: this.conditionalFormattings
    };
    model.cols = column_default.toModel(this.columns);
    const rows = model.rows = [];
    const dimensions = model.dimensions = new range_default();
    this._rows.forEach((row) => {
      const rowModel = row && row.model;
      if (rowModel) {
        dimensions.expand(rowModel.number, rowModel.min, rowModel.number, rowModel.max);
        rows.push(rowModel);
      }
    });
    model.merges = [];
    each(this._merges, (merge) => {
      model.merges.push(merge.range);
    });
    return model;
  }
  _parseRows(model) {
    this._rows = [];
    model.rows.forEach((rowModel) => {
      const row = new row_default(this, rowModel.number);
      this._rows[row.number - 1] = row;
      row.model = rowModel;
    });
  }
  _parseMergeCells(model) {
    each(model.mergeCells, (merge) => {
      this.mergeCellsWithoutStyle(merge);
    });
  }
  set model(value) {
    this.name = value.name;
    this._columns = column_default.fromModel(this, value.cols);
    this._parseRows(value);
    this._parseMergeCells(value);
    this.dataValidations = new data_validations_default(value.dataValidations);
    this.properties = value.properties;
    this.pageSetup = value.pageSetup;
    this.headerFooter = value.headerFooter;
    this.views = value.views;
    this.autoFilter = value.autoFilter;
    this._media = value.media.map((medium) => new image_default(this, medium));
    this.sheetProtection = value.sheetProtection;
    this.tables = value.tables.reduce((tables, table) => {
      const t = new table_default();
      t.model = table;
      tables[table.name] = t;
      return tables;
    }, {});
    this.pivotTables = value.pivotTables;
    this.conditionalFormattings = value.conditionalFormattings;
  }
};
var worksheet_default = Worksheet;

// esm/doc/defined-names.js
init_under_dash();
init_col_cache();

// esm/utils/cell-matrix.js
init_under_dash();
init_col_cache();
var CellMatrix = class {
  constructor(template) {
    this.template = template;
    this.sheets = {};
  }
  addCell(addressStr) {
    this.addCellEx(decodeEx(addressStr));
  }
  getCell(addressStr) {
    return this.findCellEx(decodeEx(addressStr), true);
  }
  findCell(addressStr) {
    return this.findCellEx(decodeEx(addressStr), false);
  }
  findCellAt(sheetName, rowNumber, colNumber) {
    const sheet = this.sheets[sheetName];
    const row = sheet && sheet[rowNumber];
    return row && row[colNumber];
  }
  addCellEx(address) {
    if (address.top) {
      for (let row = address.top; row <= address.bottom; row++) {
        for (let col = address.left; col <= address.right; col++) {
          this.getCellAt(address.sheetName, row, col);
        }
      }
    } else {
      this.findCellEx(address, true);
    }
  }
  getCellEx(address) {
    return this.findCellEx(address, true);
  }
  findCellEx(address, create) {
    const sheet = this.findSheet(address, create);
    const row = this.findSheetRow(sheet, address, create);
    return this.findRowCell(row, address, create);
  }
  getCellAt(sheetName, rowNumber, colNumber) {
    const sheet = this.sheets[sheetName] || (this.sheets[sheetName] = []);
    const row = sheet[rowNumber] || (sheet[rowNumber] = []);
    const cell = row[colNumber] || (row[colNumber] = {
      sheetName,
      address: n2l2(colNumber) + rowNumber,
      row: rowNumber,
      col: colNumber
    });
    return cell;
  }
  removeCellEx(address) {
    const sheet = this.findSheet(address);
    if (!sheet) {
      return;
    }
    const row = this.findSheetRow(sheet, address);
    if (!row) {
      return;
    }
    delete row[address.col];
  }
  forEachInSheet(sheetName, callback) {
    const sheet = this.sheets[sheetName];
    if (sheet) {
      sheet.forEach((row, rowNumber) => {
        if (row) {
          row.forEach((cell, colNumber) => {
            if (cell) {
              callback(cell, rowNumber, colNumber);
            }
          });
        }
      });
    }
  }
  forEach(callback) {
    each(this.sheets, (sheet, sheetName) => {
      this.forEachInSheet(sheetName, callback);
    });
  }
  map(callback) {
    const results = [];
    this.forEach((cell) => {
      results.push(callback(cell));
    });
    return results;
  }
  findSheet(address, create) {
    const name = address.sheetName;
    if (this.sheets[name]) {
      return this.sheets[name];
    }
    if (create) {
      return this.sheets[name] = [];
    }
    return void 0;
  }
  findSheetRow(sheet, address, create) {
    const { row } = address;
    if (sheet && sheet[row]) {
      return sheet[row];
    }
    if (create) {
      return sheet[row] = [];
    }
    return void 0;
  }
  findRowCell(row, address, create) {
    const { col } = address;
    if (row && row[col]) {
      return row[col];
    }
    if (create) {
      return row[col] = this.template ? Object.assign(address, JSON.parse(JSON.stringify(this.template))) : address;
    }
    return void 0;
  }
  spliceRows(sheetName, start, numDelete, numInsert) {
    const sheet = this.sheets[sheetName];
    if (sheet) {
      const inserts = [];
      for (let i = 0; i < numInsert; i++) {
        inserts.push([]);
      }
      sheet.splice(start, numDelete, ...inserts);
    }
  }
  spliceColumns(sheetName, start, numDelete, numInsert) {
    const sheet = this.sheets[sheetName];
    if (sheet) {
      const inserts = [];
      for (let i = 0; i < numInsert; i++) {
        inserts.push(null);
      }
      each(sheet, (row) => {
        row.splice(start, numDelete, ...inserts);
      });
    }
  }
};
var cell_matrix_default = CellMatrix;

// esm/doc/defined-names.js
var rangeRegexp = /[$](\w+)[$](\d+)(:[$](\w+)[$](\d+))?/;
var DefinedNames = class {
  constructor() {
    this.matrixMap = {};
  }
  getMatrix(name) {
    const matrix = this.matrixMap[name] || (this.matrixMap[name] = new cell_matrix_default());
    return matrix;
  }
  // add a name to a cell. locStr in the form SheetName!$col$row or SheetName!$c1$r1:$c2:$r2
  add(locStr, name) {
    const location = decodeEx(locStr);
    this.addEx(location, name);
  }
  addEx(location, name) {
    const matrix = this.getMatrix(name);
    if (location.top) {
      for (let col = location.left; col <= location.right; col++) {
        for (let row = location.top; row <= location.bottom; row++) {
          const address = {
            sheetName: location.sheetName,
            address: n2l2(col) + row,
            row,
            col
          };
          matrix.addCellEx(address);
        }
      }
    } else {
      matrix.addCellEx(location);
    }
  }
  remove(locStr, name) {
    const location = decodeEx(locStr);
    this.removeEx(location, name);
  }
  removeEx(location, name) {
    const matrix = this.getMatrix(name);
    matrix.removeCellEx(location);
  }
  removeAllNames(location) {
    each(this.matrixMap, (matrix) => {
      matrix.removeCellEx(location);
    });
  }
  forEach(callback) {
    each(this.matrixMap, (matrix, name) => {
      matrix.forEach((cell) => {
        callback(name, cell);
      });
    });
  }
  // get all the names of a cell
  getNames(addressStr) {
    return this.getNamesEx(decodeEx(addressStr));
  }
  getNamesEx(address) {
    return map(this.matrixMap, (matrix, name) => matrix.findCellEx(address) && name).filter(Boolean);
  }
  _explore(matrix, cell) {
    cell.mark = false;
    const { sheetName } = cell;
    const range2 = new range_default(cell.row, cell.col, cell.row, cell.col, sheetName);
    let x;
    let y;
    function vGrow(yy, edge) {
      const c2 = matrix.findCellAt(sheetName, yy, cell.col);
      if (!c2 || !c2.mark) {
        return false;
      }
      range2[edge] = yy;
      c2.mark = false;
      return true;
    }
    for (y = cell.row - 1; vGrow(y, "top"); y--)
      ;
    for (y = cell.row + 1; vGrow(y, "bottom"); y++)
      ;
    function hGrow(xx, edge) {
      const cells = [];
      for (y = range2.top; y <= range2.bottom; y++) {
        const c2 = matrix.findCellAt(sheetName, y, xx);
        if (c2 && c2.mark) {
          cells.push(c2);
        } else {
          return false;
        }
      }
      range2[edge] = xx;
      for (let i = 0; i < cells.length; i++) {
        cells[i].mark = false;
      }
      return true;
    }
    for (x = cell.col - 1; hGrow(x, "left"); x--)
      ;
    for (x = cell.col + 1; hGrow(x, "right"); x++)
      ;
    return range2;
  }
  getRanges(name, matrix) {
    matrix = matrix || this.matrixMap[name];
    if (!matrix) {
      return { name, ranges: [] };
    }
    matrix.forEach((cell) => {
      cell.mark = true;
    });
    const ranges = matrix.map((cell) => cell.mark && this._explore(matrix, cell)).filter(Boolean).map((range2) => range2.$shortRange);
    return {
      name,
      ranges
    };
  }
  normaliseMatrix(matrix, sheetName) {
    matrix.forEachInSheet(sheetName, (cell, row, col) => {
      if (cell) {
        if (cell.row !== row || cell.col !== col) {
          cell.row = row;
          cell.col = col;
          cell.address = n2l2(col) + row;
        }
      }
    });
  }
  spliceRows(sheetName, start, numDelete, numInsert) {
    each(this.matrixMap, (matrix) => {
      matrix.spliceRows(sheetName, start, numDelete, numInsert);
      this.normaliseMatrix(matrix, sheetName);
    });
  }
  spliceColumns(sheetName, start, numDelete, numInsert) {
    each(this.matrixMap, (matrix) => {
      matrix.spliceColumns(sheetName, start, numDelete, numInsert);
      this.normaliseMatrix(matrix, sheetName);
    });
  }
  get model() {
    return map(this.matrixMap, (matrix, name) => this.getRanges(name, matrix)).filter((definedName) => definedName.ranges.length);
  }
  set model(value) {
    const matrixMap = this.matrixMap = {};
    value.forEach((definedName) => {
      const matrix = matrixMap[definedName.name] = new cell_matrix_default();
      definedName.ranges.forEach((rangeStr) => {
        if (rangeRegexp.test(rangeStr.split("!").pop() || "")) {
          matrix.addCell(rangeStr);
        }
      });
    });
  }
};
var defined_names_default = DefinedNames;

// esm/utils/stream-buf.js
import { Duplex } from "node:stream";

// esm/utils/string-buf.js
var StringBuf = class {
  constructor(options) {
    this._buf = Buffer.alloc(options && options.size || 16384);
    this._encoding = options && options.encoding || "utf8";
    this._inPos = 0;
    this._buffer = void 0;
  }
  get length() {
    return this._inPos;
  }
  get capacity() {
    return this._buf.length;
  }
  get buffer() {
    return this._buf;
  }
  toBuffer() {
    if (!this._buffer) {
      this._buffer = Buffer.alloc(this.length);
      this._buf.copy(this._buffer, 0, 0, this.length);
    }
    return this._buffer;
  }
  reset(position) {
    position = position || 0;
    this._buffer = void 0;
    this._inPos = position;
  }
  _grow(min) {
    let size = this._buf.length * 2;
    while (size < min) {
      size *= 2;
    }
    const buf = Buffer.alloc(size);
    this._buf.copy(buf, 0);
    this._buf = buf;
  }
  addText(text) {
    this._buffer = void 0;
    let inPos = this._inPos + this._buf.write(text, this._inPos, this._encoding);
    while (inPos >= this._buf.length - 4) {
      this._grow(this._inPos + text.length);
      inPos = this._inPos + this._buf.write(text, this._inPos, this._encoding);
    }
    this._inPos = inPos;
  }
  addStringBuf(inBuf) {
    if (inBuf.length) {
      this._buffer = void 0;
      if (this.length + inBuf.length > this.capacity) {
        this._grow(this.length + inBuf.length);
      }
      inBuf._buf.copy(this._buf, this._inPos, 0, inBuf.length);
      this._inPos += inBuf.length;
    }
  }
};
var string_buf_default = StringBuf;

// esm/utils/stream-buf.js
var StringChunk = class {
  constructor(data, encoding) {
    this._data = data;
    this._encoding = encoding;
  }
  get length() {
    return this.toBuffer().length;
  }
  // copy to target buffer
  copy(target, targetOffset, offset, length) {
    return this.toBuffer().copy(target, targetOffset, offset, length);
  }
  toBuffer() {
    if (!this._buffer) {
      this._buffer = Buffer.from(this._data, this._encoding);
    }
    return this._buffer;
  }
};
var StringBufChunk = class {
  constructor(data) {
    this._data = data;
  }
  get length() {
    return this._data.length;
  }
  // copy to target buffer
  copy(target, targetOffset, offset, length) {
    return this._data._buf.copy(target, targetOffset, offset, length);
  }
  toBuffer() {
    return this._data.toBuffer();
  }
};
var BufferChunk = class {
  constructor(data) {
    this._data = data;
  }
  get length() {
    return this._data.length;
  }
  // copy to target buffer
  copy(target, targetOffset, offset, length) {
    this._data.copy(target, targetOffset, offset, length);
  }
  toBuffer() {
    return this._data;
  }
};
var ReadWriteBuf = class {
  constructor(size) {
    this.size = size;
    this.buffer = Buffer.alloc(size);
    this.iRead = 0;
    this.iWrite = 0;
  }
  toBuffer() {
    if (this.iRead === 0 && this.iWrite === this.size) {
      return this.buffer;
    }
    const buf = Buffer.alloc(this.iWrite - this.iRead);
    this.buffer.copy(buf, 0, this.iRead, this.iWrite);
    return buf;
  }
  get length() {
    return this.iWrite - this.iRead;
  }
  get eod() {
    return this.iRead === this.iWrite;
  }
  get full() {
    return this.iWrite === this.size;
  }
  read(size) {
    let buf;
    if (size === 0) {
      return null;
    }
    if (size === void 0 || size >= this.length) {
      buf = this.toBuffer();
      this.iRead = this.iWrite;
      return buf;
    }
    buf = Buffer.alloc(size);
    this.buffer.copy(buf, 0, this.iRead, size);
    this.iRead += size;
    return buf;
  }
  write(chunk, offset, length) {
    const size = Math.min(length, this.size - this.iWrite);
    chunk.copy(this.buffer, this.iWrite, offset, offset + size);
    this.iWrite += size;
    return size;
  }
};
var StreamBuf = class extends Duplex {
  constructor(options = {}) {
    super(options);
    this.bufSize = options.bufSize || 1024 * 1024;
    this.buffers = [];
    this.batch = options.batch || false;
    this.corked = false;
    this.inPos = 0;
    this.outPos = 0;
    this.pipes = [];
    this.paused = false;
    this.encoding = null;
  }
  toBuffer() {
    switch (this.buffers.length) {
      case 0:
        return null;
      case 1:
        return this.buffers[0].toBuffer();
      default:
        return Buffer.concat(this.buffers.map((rwBuf) => rwBuf.toBuffer()));
    }
  }
  // writable
  // event drain - if write returns false (which it won't), indicates when safe to write again.
  // finish - end() has been called
  // pipe(src) - pipe() has been called on readable
  // unpipe(src) - unpipe() has been called on readable
  // error - duh
  _getWritableBuffer() {
    if (this.buffers.length) {
      const last = this.buffers[this.buffers.length - 1];
      if (!last.full) {
        return last;
      }
    }
    const buf = new ReadWriteBuf(this.bufSize);
    this.buffers.push(buf);
    return buf;
  }
  async _pipe(chunk) {
    const write = function(pipe) {
      return new Promise((resolve) => {
        pipe.write(chunk.toBuffer(), () => {
          resolve();
        });
      });
    };
    await Promise.all(this.pipes.map(write));
  }
  _writeToBuffers(chunk) {
    let inPos = 0;
    const inLen = chunk.length;
    while (inPos < inLen) {
      const buffer = this._getWritableBuffer();
      inPos += buffer.write(chunk, inPos, inLen - inPos);
    }
  }
  async write(data, encoding, callback) {
    if (encoding instanceof Function) {
      callback = encoding;
      encoding = "utf8";
    }
    callback = callback || {};
    let chunk;
    if (data instanceof string_buf_default) {
      chunk = new StringBufChunk(data);
    } else if (data instanceof Buffer) {
      chunk = new BufferChunk(data);
    } else if (typeof data === "string" || data instanceof String || data instanceof ArrayBuffer) {
      chunk = new StringChunk(data, encoding);
    } else {
      throw new Error("Chunk must be one of type String, Buffer or StringBuf.");
    }
    if (this.pipes.length) {
      if (this.batch) {
        this._writeToBuffers(chunk);
        while (!this.corked && this.buffers.length > 1) {
          this._pipe(this.buffers.shift());
        }
      } else if (!this.corked) {
        await this._pipe(chunk);
        callback();
      } else {
        this._writeToBuffers(chunk);
        process.nextTick(callback);
      }
    } else {
      if (!this.paused) {
        this.emit("data", chunk.toBuffer());
      }
      this._writeToBuffers(chunk);
      this.emit("readable");
    }
    return true;
  }
  cork() {
    this.corked = true;
  }
  _flush() {
    if (this.pipes.length) {
      while (this.buffers.length) {
        this._pipe(this.buffers.shift());
      }
    }
  }
  uncork() {
    this.corked = false;
    this._flush();
  }
  end(chunk, encoding, callback) {
    const writeComplete = (error) => {
      if (error) {
        callback(error);
      } else {
        this._flush();
        this.pipes.forEach((pipe) => {
          pipe.end();
        });
        this.emit("finish");
      }
    };
    if (chunk) {
      this.write(chunk, encoding, writeComplete);
    } else {
      writeComplete();
    }
  }
  // readable
  // event readable - some data is now available
  // event data - switch to flowing mode - feeds chunks to handler
  // event end - no more data
  // event close - optional, indicates upstream close
  // event error - duh
  read(size) {
    let buffers;
    if (size) {
      buffers = [];
      while (size && this.buffers.length && !this.buffers[0].eod) {
        const first = this.buffers[0];
        const buffer = first.read(size);
        size -= buffer.length;
        buffers.push(buffer);
        if (first.eod && first.full) {
          this.buffers.shift();
        }
      }
      return Buffer.concat(buffers);
    }
    buffers = this.buffers.map((buf) => buf.toBuffer()).filter(Boolean);
    this.buffers = [];
    return Buffer.concat(buffers);
  }
  setEncoding(encoding) {
    this.encoding = encoding;
  }
  pause() {
    this.paused = true;
  }
  resume() {
    this.paused = false;
  }
  isPaused() {
    return !!this.paused;
  }
  pipe(destination) {
    this.pipes.push(destination);
    if (!this.paused && this.buffers.length) {
      this.end();
    }
  }
  unpipe(destination) {
    this.pipes = this.pipes.filter((pipe) => pipe !== destination);
  }
  unshift() {
    throw new Error("Not Implemented");
  }
  wrap() {
    throw new Error("Not Implemented");
  }
};
var stream_buf_default = StreamBuf;

// esm/xlsx/xlsx.js
init_xml_stream();

// esm/xlsx/xform/style/styles-xform.js
init_xml_stream();
init_base_xform();
init_static_xform();

// esm/xlsx/xform/list-xform.js
init_base_xform();
var ListXform = class extends base_xform_default {
  constructor(options) {
    super();
    this.tag = options.tag;
    this.always = !!options.always;
    this.count = options.count;
    this.empty = options.empty;
    this.$count = options.$count || "count";
    this.$ = options.$;
    this.childXform = options.childXform;
    this.maxItems = options.maxItems;
  }
  prepare(model, options) {
    const { childXform } = this;
    if (model) {
      model.forEach((childModel, index) => {
        options.index = index;
        childXform.prepare(childModel, options);
      });
    }
  }
  render(xmlStream, model) {
    if (this.always || model && model.length) {
      xmlStream.openNode(this.tag, this.$);
      if (this.count) {
        xmlStream.addAttribute(this.$count, model && model.length || 0);
      }
      const { childXform } = this;
      (model || []).forEach((childModel, index) => {
        childXform.render(xmlStream, childModel, index);
      });
      xmlStream.closeNode();
    } else if (this.empty) {
      xmlStream.leafNode(this.tag);
    }
  }
  parseOpen(node) {
    if (this.parser) {
      this.parser.parseOpen(node);
      return true;
    }
    switch (node.name) {
      case this.tag:
        this.model = [];
        return true;
      default:
        if (this.childXform.parseOpen(node)) {
          this.parser = this.childXform;
          return true;
        }
        return false;
    }
  }
  parseText(text) {
    if (this.parser) {
      this.parser.parseText(text);
    }
  }
  parseClose(name) {
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        this.model.push(this.parser.model);
        this.parser = void 0;
        if (this.maxItems && this.model.length > this.maxItems) {
          throw new Error(`Max ${this.childXform.tag} count (${this.maxItems}) exceeded`);
        }
      }
      return true;
    }
    return false;
  }
  reconcile(model, options) {
    if (model) {
      const { childXform } = this;
      model.forEach((childModel) => {
        childXform.reconcile(childModel, options);
      });
    }
  }
};
var list_xform_default = ListXform;

// esm/xlsx/xform/style/styles-xform.js
init_font_xform();

// esm/xlsx/xform/style/fill-xform.js
init_base_xform();
init_color_xform();
var StopXform = class extends base_xform_default {
  constructor() {
    super();
    this.map = {
      color: new color_xform_default()
    };
  }
  get tag() {
    return "stop";
  }
  render(xmlStream, model) {
    xmlStream.openNode("stop");
    xmlStream.addAttribute("position", model.position);
    this.map.color.render(xmlStream, model.color);
    xmlStream.closeNode();
  }
  parseOpen(node) {
    if (this.parser) {
      this.parser.parseOpen(node);
      return true;
    }
    switch (node.name) {
      case "stop":
        this.model = {
          position: parseFloat(node.attributes.position)
        };
        return true;
      case "color":
        this.parser = this.map.color;
        this.parser.parseOpen(node);
        return true;
      default:
        return false;
    }
  }
  parseText() {
  }
  parseClose(name) {
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        this.model.color = this.parser.model;
        this.parser = void 0;
      }
      return true;
    }
    return false;
  }
};
var PatternFillXform = class extends base_xform_default {
  constructor() {
    super();
    this.map = {
      fgColor: new color_xform_default("fgColor"),
      bgColor: new color_xform_default("bgColor")
    };
  }
  get name() {
    return "pattern";
  }
  get tag() {
    return "patternFill";
  }
  render(xmlStream, model) {
    xmlStream.openNode("patternFill");
    xmlStream.addAttribute("patternType", model.pattern);
    if (model.fgColor) {
      this.map.fgColor.render(xmlStream, model.fgColor);
    }
    if (model.bgColor) {
      this.map.bgColor.render(xmlStream, model.bgColor);
    }
    xmlStream.closeNode();
  }
  parseOpen(node) {
    if (this.parser) {
      this.parser.parseOpen(node);
      return true;
    }
    switch (node.name) {
      case "patternFill":
        this.model = {
          type: "pattern",
          pattern: node.attributes.patternType
        };
        return true;
      default:
        this.parser = this.map[node.name];
        if (this.parser) {
          this.parser.parseOpen(node);
          return true;
        }
        return false;
    }
  }
  parseText(text) {
    if (this.parser) {
      this.parser.parseText(text);
    }
  }
  parseClose(name) {
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        if (this.parser.model) {
          this.model[name] = this.parser.model;
        }
        this.parser = void 0;
      }
      return true;
    }
    return false;
  }
};
var GradientFillXform = class extends base_xform_default {
  constructor() {
    super();
    this.map = {
      stop: new StopXform()
    };
  }
  get name() {
    return "gradient";
  }
  get tag() {
    return "gradientFill";
  }
  render(xmlStream, model) {
    xmlStream.openNode("gradientFill");
    switch (model.gradient) {
      case "angle":
        xmlStream.addAttribute("degree", model.degree);
        break;
      case "path":
        xmlStream.addAttribute("type", "path");
        if (model.center.left) {
          xmlStream.addAttribute("left", model.center.left);
          if (model.center.right === void 0) {
            xmlStream.addAttribute("right", model.center.left);
          }
        }
        if (model.center.right) {
          xmlStream.addAttribute("right", model.center.right);
        }
        if (model.center.top) {
          xmlStream.addAttribute("top", model.center.top);
          if (model.center.bottom === void 0) {
            xmlStream.addAttribute("bottom", model.center.top);
          }
        }
        if (model.center.bottom) {
          xmlStream.addAttribute("bottom", model.center.bottom);
        }
        break;
      default:
        break;
    }
    const stopXform = this.map.stop;
    model.stops.forEach((stopModel) => {
      stopXform.render(xmlStream, stopModel);
    });
    xmlStream.closeNode();
  }
  parseOpen(node) {
    if (this.parser) {
      this.parser.parseOpen(node);
      return true;
    }
    switch (node.name) {
      case "gradientFill": {
        const model = this.model = {
          stops: []
        };
        if (node.attributes.degree) {
          model.gradient = "angle";
          model.degree = parseInt(node.attributes.degree, 10);
        } else if (node.attributes.type === "path") {
          model.gradient = "path";
          model.center = {
            left: node.attributes.left ? parseFloat(node.attributes.left) : 0,
            top: node.attributes.top ? parseFloat(node.attributes.top) : 0
          };
          if (node.attributes.right !== node.attributes.left) {
            model.center.right = node.attributes.right ? parseFloat(node.attributes.right) : 0;
          }
          if (node.attributes.bottom !== node.attributes.top) {
            model.center.bottom = node.attributes.bottom ? parseFloat(node.attributes.bottom) : 0;
          }
        }
        return true;
      }
      case "stop":
        this.parser = this.map.stop;
        this.parser.parseOpen(node);
        return true;
      default:
        return false;
    }
  }
  parseText(text) {
    if (this.parser) {
      this.parser.parseText(text);
    }
  }
  parseClose(name) {
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        this.model.stops.push(this.parser.model);
        this.parser = void 0;
      }
      return true;
    }
    return false;
  }
};
var FillXform = class _FillXform extends base_xform_default {
  constructor() {
    super();
    this.map = {
      patternFill: new PatternFillXform(),
      gradientFill: new GradientFillXform()
    };
  }
  get tag() {
    return "fill";
  }
  render(xmlStream, model) {
    xmlStream.addRollback();
    xmlStream.openNode("fill");
    switch (model.type) {
      case "pattern":
        this.map.patternFill.render(xmlStream, model);
        break;
      case "gradient":
        this.map.gradientFill.render(xmlStream, model);
        break;
      default:
        xmlStream.rollback();
        return;
    }
    xmlStream.closeNode();
    xmlStream.commit();
  }
  parseOpen(node) {
    if (this.parser) {
      this.parser.parseOpen(node);
      return true;
    }
    switch (node.name) {
      case "fill":
        this.model = {};
        return true;
      default:
        this.parser = this.map[node.name];
        if (this.parser) {
          this.parser.parseOpen(node);
          return true;
        }
        return false;
    }
  }
  parseText(text) {
    if (this.parser) {
      this.parser.parseText(text);
    }
  }
  parseClose(name) {
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        this.model = this.parser.model;
        this.model.type = this.parser.name;
        this.parser = void 0;
      }
      return true;
    }
    return false;
  }
  validStyle(value) {
    return _FillXform.validPatternValues[value];
  }
};
FillXform.validPatternValues = [
  "none",
  "solid",
  "darkVertical",
  "darkGray",
  "mediumGray",
  "lightGray",
  "gray125",
  "gray0625",
  "darkHorizontal",
  "darkVertical",
  "darkDown",
  "darkUp",
  "darkGrid",
  "darkTrellis",
  "lightHorizontal",
  "lightVertical",
  "lightDown",
  "lightUp",
  "lightGrid",
  "lightTrellis",
  "lightGrid"
].reduce((p, v) => {
  p[v] = true;
  return p;
}, {});
FillXform.StopXform = StopXform;
FillXform.PatternFillXform = PatternFillXform;
FillXform.GradientFillXform = GradientFillXform;
var fill_xform_default = FillXform;

// esm/xlsx/xform/style/border-xform.js
init_base_xform();
init_utils();
init_color_xform();
var EdgeXform = class _EdgeXform extends base_xform_default {
  constructor(name) {
    super();
    this.name = name;
    this.map = {
      color: new color_xform_default()
    };
  }
  get tag() {
    return this.name;
  }
  render(xmlStream, model, defaultColor) {
    const color = model && model.color || defaultColor || this.defaultColor;
    xmlStream.openNode(this.name);
    if (model && model.style) {
      xmlStream.addAttribute("style", model.style);
      if (color) {
        this.map.color.render(xmlStream, color);
      }
    }
    xmlStream.closeNode();
  }
  parseOpen(node) {
    if (this.parser) {
      this.parser.parseOpen(node);
      return true;
    }
    switch (node.name) {
      case this.name: {
        const { style } = node.attributes;
        if (style) {
          this.model = {
            style
          };
        } else {
          this.model = void 0;
        }
        return true;
      }
      case "color":
        this.parser = this.map.color;
        this.parser.parseOpen(node);
        return true;
      default:
        return false;
    }
  }
  parseText(text) {
    if (this.parser) {
      this.parser.parseText(text);
    }
  }
  parseClose(name) {
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        this.parser = void 0;
      }
      return true;
    }
    if (name === this.name) {
      if (this.map.color.model) {
        if (!this.model) {
          this.model = {};
        }
        this.model.color = this.map.color.model;
      }
    }
    return false;
  }
  validStyle(value) {
    return _EdgeXform.validStyleValues[value];
  }
};
EdgeXform.validStyleValues = [
  "thin",
  "dashed",
  "dotted",
  "dashDot",
  "hair",
  "dashDotDot",
  "slantDashDot",
  "mediumDashed",
  "mediumDashDotDot",
  "mediumDashDot",
  "medium",
  "double",
  "thick"
].reduce((p, v) => {
  p[v] = true;
  return p;
}, {});
var BorderXform = class extends base_xform_default {
  constructor() {
    super();
    this.map = {
      top: new EdgeXform("top"),
      left: new EdgeXform("left"),
      bottom: new EdgeXform("bottom"),
      right: new EdgeXform("right"),
      diagonal: new EdgeXform("diagonal")
    };
  }
  render(xmlStream, model) {
    const { color } = model;
    xmlStream.openNode("border");
    if (model.diagonal && model.diagonal.style) {
      if (model.diagonal.up) {
        xmlStream.addAttribute("diagonalUp", "1");
      }
      if (model.diagonal.down) {
        xmlStream.addAttribute("diagonalDown", "1");
      }
    }
    function add(edgeModel, edgeXform) {
      if (edgeModel && !edgeModel.color && model.color) {
        edgeModel = {
          ...edgeModel,
          color: model.color
        };
      }
      edgeXform.render(xmlStream, edgeModel, color);
    }
    add(model.left, this.map.left);
    add(model.right, this.map.right);
    add(model.top, this.map.top);
    add(model.bottom, this.map.bottom);
    add(model.diagonal, this.map.diagonal);
    xmlStream.closeNode();
  }
  parseOpen(node) {
    if (this.parser) {
      this.parser.parseOpen(node);
      return true;
    }
    switch (node.name) {
      case "border":
        this.reset();
        this.diagonalUp = parseBoolean(node.attributes.diagonalUp);
        this.diagonalDown = parseBoolean(node.attributes.diagonalDown);
        return true;
      default:
        this.parser = this.map[node.name];
        if (this.parser) {
          this.parser.parseOpen(node);
          return true;
        }
        return false;
    }
  }
  parseText(text) {
    if (this.parser) {
      this.parser.parseText(text);
    }
  }
  parseClose(name) {
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        this.parser = void 0;
      }
      return true;
    }
    if (name === "border") {
      const model = this.model = {};
      const add = function(key, edgeModel, extensions) {
        if (edgeModel) {
          if (extensions) {
            Object.assign(edgeModel, extensions);
          }
          model[key] = edgeModel;
        }
      };
      add("left", this.map.left.model);
      add("right", this.map.right.model);
      add("top", this.map.top.model);
      add("bottom", this.map.bottom.model);
      add("diagonal", this.map.diagonal.model, { up: this.diagonalUp, down: this.diagonalDown });
    }
    return false;
  }
};
var border_xform_default = BorderXform;

// esm/xlsx/xform/style/numfmt-xform.js
init_under_dash();

// esm/xlsx/defaultnumformats.js
var defaultnumformats_default = {
  0: { f: "General" },
  1: { f: "0" },
  2: { f: "0.00" },
  3: { f: "#,##0" },
  4: { f: "#,##0.00" },
  9: { f: "0%" },
  10: { f: "0.00%" },
  11: { f: "0.00E+00" },
  12: { f: "# ?/?" },
  13: { f: "# ??/??" },
  14: { f: "mm-dd-yy" },
  15: { f: "d-mmm-yy" },
  16: { f: "d-mmm" },
  17: { f: "mmm-yy" },
  18: { f: "h:mm AM/PM" },
  19: { f: "h:mm:ss AM/PM" },
  20: { f: "h:mm" },
  21: { f: "h:mm:ss" },
  22: { f: 'm/d/yy "h":mm' }
  // 27: {
  //     'zh-tw': '[$-404]e/m/d',
  //     'zh-cn': 'yyyy"年"m"月"',
  //     'ja-jp': '[$-411]ge.m.d',
  //     'ko-kr': 'yyyy"年" mm"月" dd"日"',
  // },
  // 28: {
  //     'zh-tw': '[$-404]e"年"m"月"d"日"',
  //     'zh-cn': 'm"月"d"日"',
  //     'ja-jp': '[$-411]ggge"年"m"月"d"日"',
  //     'ko-kr': 'mm-dd',
  // },
  // 29: {
  //     'zh-tw': '[$-404]e"年"m"月"d"日"',
  //     'zh-cn': 'm"月"d"日"',
  //     'ja-jp': '[$-411]ggge"年"m"月"d"日"',
  //     'ko-kr': 'mm-dd',
  // },
  // 30: { 'zh-tw': 'm/d/yy ', 'zh-cn': 'm-d-yy', 'ja-jp': 'm/d/yy', 'ko-kr': 'mm-dd-yy' },
  // 31: {
  //     'zh-tw': 'yyyy"年"m"月"d"日"',
  //     'zh-cn': 'yyyy"年"m"月"d"日"',
  //     'ja-jp': 'yyyy"年"m"月"d"日"',
  //     'ko-kr': 'yyyy"년" mm"월" dd"일"',
  // },
  // 32: {
  //     'zh-tw': 'hh"時"mm"分"',
  //     'zh-cn': 'h"时"mm"分"',
  //     'ja-jp': 'h"時"mm"分"',
  //     'ko-kr': 'h"시" mm"분"',
  // },
  // 33: {
  //     'zh-tw': 'hh"時"mm"分"ss"秒"',
  //     'zh-cn': 'h"时"mm"分"ss"秒"',
  //     'ja-jp': 'h"時"mm"分"ss"秒"',
  //     'ko-kr': 'h"시" mm"분" ss"초"',
  // },
  // 34: {
  //     'zh-tw': '上午/下午 hh"時"mm"分"',
  //     'zh-cn': '上午/下午 h"时"mm"分"',
  //     'ja-jp': 'yyyy"年"m"月"',
  //     'ko-kr': 'yyyy-mm-dd',
  // },
  // 35: {
  //     'zh-tw': '上午/下午 hh"時"mm"分"ss"秒"',
  //     'zh-cn': '上午/下午 h"时"mm"分"ss"秒"',
  //     'ja-jp': 'm"月"d"日"',
  //     'ko-kr': 'yyyy-mm-dd',
  // },
  // 36: {
  //     'zh-tw': '[$-404]e/m/d',
  //     'zh-cn': 'yyyy"年"m"月"',
  //     'ja-jp': '[$-411]ge.m.d',
  //     'ko-kr': 'yyyy"年" mm"月" dd"日"',
  // },
  // 37: { f: '#,##0 ;(#,##0)' },
  // 38: { f: '#,##0 ;[Red](#,##0)' },
  // 39: { f: '#,##0.00 ;(#,##0.00)' },
  // 40: { f: '#,##0.00 ;[Red](#,##0.00)' },
  // 45: { f: 'mm:ss' },
  // 46: { f: '[h]:mm:ss' },
  // 47: { f: 'mmss.0' },
  // 48: { f: '##0.0E+0' },
  // 49: { f: '@' },
  // 50: {
  //     'zh-tw': '[$-404]e/m/d',
  //     'zh-cn': 'yyyy"年"m"月"',
  //     'ja-jp': '[$-411]ge.m.d',
  //     'ko-kr': 'yyyy"年" mm"月" dd"日"',
  // },
  // 51: {
  //     'zh-tw': '[$-404]e"年"m"月"d"日"',
  //     'zh-cn': 'm"月"d"日"',
  //     'ja-jp': '[$-411]ggge"年"m"月"d"日"',
  //     'ko-kr': 'mm-dd',
  // },
  // 52: {
  //     'zh-tw': '上午/下午 hh"時"mm"分"',
  //     'zh-cn': 'yyyy"年"m"月"',
  //     'ja-jp': 'yyyy"年"m"月"',
  //     'ko-kr': 'yyyy-mm-dd',
  // },
  // 53: {
  //     'zh-tw': '上午/下午 hh"時"mm"分"ss"秒"',
  //     'zh-cn': 'm"月"d"日"',
  //     'ja-jp': 'm"月"d"日"',
  //     'ko-kr': 'yyyy-mm-dd',
  // },
  // 54: {
  //     'zh-tw': '[$-404]e"年"m"月"d"日"',
  //     'zh-cn': 'm"月"d"日"',
  //     'ja-jp': '[$-411]ggge"年"m"月"d"日"',
  //     'ko-kr': 'mm-dd',
  // },
  // 55: {
  //     'zh-tw': '上午/下午 hh"時"mm"分"',
  //     'zh-cn': '上午/下午 h"时"mm"分"',
  //     'ja-jp': 'yyyy"年"m"月"',
  //     'ko-kr': 'yyyy-mm-dd',
  // },
  // 56: {
  //     'zh-tw': '上午/下午 hh"時"mm"分"ss"秒"',
  //     'zh-cn': '上午/下午 h"时"mm"分"ss"秒"',
  //     'ja-jp': 'm"月"d"日"',
  //     'ko-kr': 'yyyy-mm-dd',
  // },
  // 57: {
  //     'zh-tw': '[$-404]e/m/d',
  //     'zh-cn': 'yyyy"年"m"月"',
  //     'ja-jp': '[$-411]ge.m.d',
  //     'ko-kr': 'yyyy"年" mm"月" dd"日"',
  // },
  // 58: {
  //     'zh-tw': '[$-404]e"年"m"月"d"日"',
  //     'zh-cn': 'm"月"d"日"',
  //     'ja-jp': '[$-411]ggge"年"m"月"d"日"',
  //     'ko-kr': 'mm-dd',
  // },
  // 59: { 'th-th': 't0' },
  // 60: { 'th-th': 't0.00' },
  // 61: { 'th-th': 't#,##0' },
  // 62: { 'th-th': 't#,##0.00' },
  // 67: { 'th-th': 't0%' },
  // 68: { 'th-th': 't0.00%' },
  // 69: { 'th-th': 't# ?/?' },
  // 70: { 'th-th': 't# ??/??' },
  // 81: { 'th-th': 'd/m/bb' },
};

// esm/xlsx/xform/style/numfmt-xform.js
init_base_xform();
function hashDefaultFormats() {
  const hash = {};
  each(defaultnumformats_default, (dnf, id) => {
    if (dnf.f) {
      hash[dnf.f] = parseInt(id, 10);
    }
  });
  return hash;
}
var defaultFmtHash = hashDefaultFormats();
var NumFmtXform = class extends base_xform_default {
  constructor(id, formatCode) {
    super();
    this.id = id;
    this.formatCode = formatCode;
  }
  get tag() {
    return "numFmt";
  }
  render(xmlStream, model) {
    xmlStream.leafNode("numFmt", { numFmtId: model.id, formatCode: model.formatCode });
  }
  parseOpen(node) {
    switch (node.name) {
      case "numFmt":
        this.model = {
          id: parseInt(node.attributes.numFmtId, 10),
          formatCode: node.attributes.formatCode.replace(/[\\](.)/g, "$1")
        };
        return true;
      default:
        return false;
    }
  }
  parseText() {
  }
  parseClose() {
    return false;
  }
};
NumFmtXform.getDefaultFmtId = function getDefaultFmtId(formatCode) {
  return defaultFmtHash[formatCode];
};
NumFmtXform.getDefaultFmtCode = function getDefaultFmtCode(numFmtId) {
  return defaultnumformats_default[numFmtId] && defaultnumformats_default[numFmtId].f;
};
var numfmt_xform_default = NumFmtXform;

// esm/xlsx/xform/style/style-xform.js
init_base_xform();

// esm/xlsx/xform/style/alignment-xform.js
init_utils();
init_base_xform();
var validation = {
  horizontalValues: [
    "left",
    "center",
    "right",
    "fill",
    "centerContinuous",
    "distributed",
    "justify"
  ].reduce((p, v) => {
    p[v] = true;
    return p;
  }, {}),
  horizontal(value) {
    return this.horizontalValues[value] ? value : void 0;
  },
  verticalValues: ["top", "middle", "bottom", "distributed", "justify"].reduce((p, v) => {
    p[v] = true;
    return p;
  }, {}),
  vertical(value) {
    if (value === "middle")
      return "center";
    return this.verticalValues[value] ? value : void 0;
  },
  wrapText(value) {
    return value ? true : void 0;
  },
  shrinkToFit(value) {
    return value ? true : void 0;
  },
  textRotation(value) {
    switch (value) {
      case "vertical":
        return value;
      default:
        value = validInt(value);
        return value >= -90 && value <= 90 ? value : void 0;
    }
  },
  indent(value) {
    value = validInt(value);
    return Math.max(0, value);
  },
  readingOrder(value) {
    switch (value) {
      case "ltr":
        return ReadingOrder.LeftToRight;
      case "rtl":
        return ReadingOrder.RightToLeft;
      default:
        return void 0;
    }
  }
};
var textRotationXform = {
  toXml(textRotation) {
    textRotation = validation.textRotation(textRotation);
    if (textRotation) {
      if (textRotation === "vertical") {
        return 255;
      }
      const tr = Math.round(textRotation);
      if (tr >= 0 && tr <= 90) {
        return tr;
      }
      if (tr < 0 && tr >= -90) {
        return 90 - tr;
      }
    }
    return void 0;
  },
  toModel(textRotation) {
    const tr = validInt(textRotation);
    if (tr !== void 0) {
      if (tr === 255) {
        return "vertical";
      }
      if (tr >= 0 && tr <= 90) {
        return tr;
      }
      if (tr > 90 && tr <= 180) {
        return 90 - tr;
      }
    }
    return void 0;
  }
};
var AlignmentXform = class extends base_xform_default {
  get tag() {
    return "alignment";
  }
  render(xmlStream, model) {
    xmlStream.addRollback();
    xmlStream.openNode("alignment");
    let isValid = false;
    function add(name, value) {
      if (value) {
        xmlStream.addAttribute(name, value);
        isValid = true;
      }
    }
    add("horizontal", validation.horizontal(model.horizontal));
    add("vertical", validation.vertical(model.vertical));
    add("wrapText", validation.wrapText(model.wrapText) ? "1" : false);
    add("shrinkToFit", validation.shrinkToFit(model.shrinkToFit) ? "1" : false);
    add("indent", validation.indent(model.indent));
    add("textRotation", textRotationXform.toXml(model.textRotation));
    add("readingOrder", validation.readingOrder(model.readingOrder));
    xmlStream.closeNode();
    if (isValid) {
      xmlStream.commit();
    } else {
      xmlStream.rollback();
    }
  }
  parseOpen(node) {
    const model = {};
    let valid = false;
    function add(truthy, name, value) {
      if (truthy) {
        model[name] = value;
        valid = true;
      }
    }
    add(node.attributes.horizontal, "horizontal", node.attributes.horizontal);
    add(node.attributes.vertical, "vertical", node.attributes.vertical === "center" ? "middle" : node.attributes.vertical);
    add(node.attributes.wrapText, "wrapText", parseBoolean(node.attributes.wrapText));
    add(node.attributes.shrinkToFit, "shrinkToFit", parseBoolean(node.attributes.shrinkToFit));
    add(node.attributes.indent, "indent", parseInt(node.attributes.indent, 10));
    add(node.attributes.textRotation, "textRotation", textRotationXform.toModel(node.attributes.textRotation));
    add(node.attributes.readingOrder, "readingOrder", node.attributes.readingOrder === "2" ? "rtl" : "ltr");
    this.model = valid ? model : null;
  }
  parseText() {
  }
  parseClose() {
    return false;
  }
};
var alignment_xform_default = AlignmentXform;

// esm/xlsx/xform/style/protection-xform.js
init_base_xform();
var validation2 = {
  boolean(value, dflt) {
    if (value === void 0) {
      return dflt;
    }
    return value;
  }
};
var ProtectionXform = class extends base_xform_default {
  get tag() {
    return "protection";
  }
  render(xmlStream, model) {
    xmlStream.addRollback();
    xmlStream.openNode("protection");
    let isValid = false;
    function add(name, value) {
      if (value !== void 0) {
        xmlStream.addAttribute(name, value);
        isValid = true;
      }
    }
    add("locked", validation2.boolean(model.locked, true) ? void 0 : "0");
    add("hidden", validation2.boolean(model.hidden, false) ? "1" : void 0);
    xmlStream.closeNode();
    if (isValid) {
      xmlStream.commit();
    } else {
      xmlStream.rollback();
    }
  }
  parseOpen(node) {
    const model = {
      locked: !(node.attributes.locked === "0"),
      hidden: node.attributes.hidden === "1"
    };
    const isSignificant = !model.locked || model.hidden;
    this.model = isSignificant ? model : null;
  }
  parseText() {
  }
  parseClose() {
    return false;
  }
};
var protection_xform_default = ProtectionXform;

// esm/xlsx/xform/style/style-xform.js
var StyleXform = class extends base_xform_default {
  constructor(options) {
    super();
    this.xfId = !!(options && options.xfId);
    this.map = {
      alignment: new alignment_xform_default(),
      protection: new protection_xform_default()
    };
  }
  get tag() {
    return "xf";
  }
  render(xmlStream, model) {
    xmlStream.openNode("xf", {
      numFmtId: model.numFmtId || 0,
      fontId: model.fontId || 0,
      fillId: model.fillId || 0,
      borderId: model.borderId || 0
    });
    if (this.xfId) {
      xmlStream.addAttribute("xfId", model.xfId || 0);
    }
    if (model.numFmtId) {
      xmlStream.addAttribute("applyNumberFormat", "1");
    }
    if (model.fontId) {
      xmlStream.addAttribute("applyFont", "1");
    }
    if (model.fillId) {
      xmlStream.addAttribute("applyFill", "1");
    }
    if (model.borderId) {
      xmlStream.addAttribute("applyBorder", "1");
    }
    if (model.alignment) {
      xmlStream.addAttribute("applyAlignment", "1");
    }
    if (model.protection) {
      xmlStream.addAttribute("applyProtection", "1");
    }
    if (model.alignment) {
      this.map.alignment.render(xmlStream, model.alignment);
    }
    if (model.protection) {
      this.map.protection.render(xmlStream, model.protection);
    }
    xmlStream.closeNode();
  }
  parseOpen(node) {
    if (this.parser) {
      this.parser.parseOpen(node);
      return true;
    }
    switch (node.name) {
      case "xf":
        this.model = {
          numFmtId: parseInt(node.attributes.numFmtId, 10),
          fontId: parseInt(node.attributes.fontId, 10),
          fillId: parseInt(node.attributes.fillId, 10),
          borderId: parseInt(node.attributes.borderId, 10)
        };
        if (this.xfId) {
          this.model.xfId = parseInt(node.attributes.xfId, 10);
        }
        return true;
      case "alignment":
        this.parser = this.map.alignment;
        this.parser.parseOpen(node);
        return true;
      case "protection":
        this.parser = this.map.protection;
        this.parser.parseOpen(node);
        return true;
      default:
        return false;
    }
  }
  parseText(text) {
    if (this.parser) {
      this.parser.parseText(text);
    }
  }
  parseClose(name) {
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        if (this.map.protection === this.parser) {
          this.model.protection = this.parser.model;
        } else {
          this.model.alignment = this.parser.model;
        }
        this.parser = void 0;
      }
      return true;
    }
    return name !== "xf";
  }
};
var style_xform_default = StyleXform;

// esm/xlsx/xform/style/dxf-xform.js
init_base_xform();
init_font_xform();
var DxfXform = class extends base_xform_default {
  constructor() {
    super();
    this.map = {
      alignment: new alignment_xform_default(),
      border: new border_xform_default(),
      fill: new fill_xform_default(),
      font: new font_xform_default(),
      numFmt: new numfmt_xform_default(),
      protection: new protection_xform_default()
    };
  }
  get tag() {
    return "dxf";
  }
  // how do we generate dxfid?
  render(xmlStream, model) {
    xmlStream.openNode(this.tag);
    if (model.font) {
      this.map.font.render(xmlStream, model.font);
    }
    if (model.numFmt && model.numFmtId) {
      const numFmtModel = { id: model.numFmtId, formatCode: model.numFmt };
      this.map.numFmt.render(xmlStream, numFmtModel);
    }
    if (model.fill) {
      this.map.fill.render(xmlStream, model.fill);
    }
    if (model.alignment) {
      this.map.alignment.render(xmlStream, model.alignment);
    }
    if (model.border) {
      this.map.border.render(xmlStream, model.border);
    }
    if (model.protection) {
      this.map.protection.render(xmlStream, model.protection);
    }
    xmlStream.closeNode();
  }
  parseOpen(node) {
    if (this.parser) {
      this.parser.parseOpen(node);
      return true;
    }
    switch (node.name) {
      case this.tag:
        this.reset();
        return true;
      default:
        this.parser = this.map[node.name];
        if (this.parser) {
          this.parser.parseOpen(node);
        }
        return true;
    }
  }
  parseText(text) {
    if (this.parser) {
      this.parser.parseText(text);
    }
  }
  parseClose(name) {
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        this.parser = void 0;
      }
      return true;
    }
    if (name === this.tag) {
      this.model = {
        alignment: this.map.alignment.model,
        border: this.map.border.model,
        fill: this.map.fill.model,
        font: this.map.font.model,
        numFmt: this.map.numFmt.model,
        protection: this.map.protection.model
      };
      return false;
    }
    return true;
  }
};
var dxf_xform_default = DxfXform;

// esm/xlsx/xform/style/styles-xform.js
var NUMFMT_BASE = 164;
var StylesXform = class _StylesXform extends base_xform_default {
  constructor(initialise) {
    super();
    this.map = {
      numFmts: new list_xform_default({ tag: "numFmts", count: true, childXform: new numfmt_xform_default() }),
      fonts: new list_xform_default({
        tag: "fonts",
        count: true,
        childXform: new font_xform_default(),
        $: { "x14ac:knownFonts": 1 }
      }),
      fills: new list_xform_default({ tag: "fills", count: true, childXform: new fill_xform_default() }),
      borders: new list_xform_default({ tag: "borders", count: true, childXform: new border_xform_default() }),
      cellStyleXfs: new list_xform_default({ tag: "cellStyleXfs", count: true, childXform: new style_xform_default() }),
      cellXfs: new list_xform_default({
        tag: "cellXfs",
        count: true,
        childXform: new style_xform_default({ xfId: true })
      }),
      dxfs: new list_xform_default({ tag: "dxfs", always: true, count: true, childXform: new dxf_xform_default() }),
      // for style manager
      numFmt: new numfmt_xform_default(),
      font: new font_xform_default(),
      fill: new fill_xform_default(),
      border: new border_xform_default(),
      style: new style_xform_default({ xfId: true }),
      cellStyles: _StylesXform.STATIC_XFORMS.cellStyles,
      tableStyles: _StylesXform.STATIC_XFORMS.tableStyles,
      extLst: _StylesXform.STATIC_XFORMS.extLst
    };
    if (initialise) {
      this.init();
    }
  }
  initIndex() {
    this.index = {
      style: {},
      numFmt: {},
      numFmtNextId: 164,
      font: {},
      border: {},
      fill: {}
    };
  }
  init() {
    this.model = {
      styles: [],
      numFmts: [],
      fonts: [],
      borders: [],
      fills: [],
      dxfs: []
    };
    this.initIndex();
    this._addBorder({});
    this._addStyle({ numFmtId: 0, fontId: 0, fillId: 0, borderId: 0, xfId: 0 });
    this._addFill({ type: "pattern", pattern: "none" });
    this._addFill({ type: "pattern", pattern: "gray125" });
    this.weakMap = /* @__PURE__ */ new WeakMap();
  }
  render(xmlStream, model) {
    model = model || this.model;
    xmlStream.openXml(xml_stream_default.StdDocAttributes);
    xmlStream.openNode("styleSheet", _StylesXform.STYLESHEET_ATTRIBUTES);
    if (this.index) {
      if (model.numFmts && model.numFmts.length) {
        xmlStream.openNode("numFmts", { count: model.numFmts.length });
        model.numFmts.forEach((numFmtXml) => {
          xmlStream.writeXml(numFmtXml);
        });
        xmlStream.closeNode();
      }
      if (!model.fonts.length) {
        this._addFont({ size: 11, color: { theme: 1 }, name: "Calibri", family: 2, scheme: "minor" });
      }
      xmlStream.openNode("fonts", { count: model.fonts.length, "x14ac:knownFonts": 1 });
      model.fonts.forEach((fontXml) => {
        xmlStream.writeXml(fontXml);
      });
      xmlStream.closeNode();
      xmlStream.openNode("fills", { count: model.fills.length });
      model.fills.forEach((fillXml) => {
        xmlStream.writeXml(fillXml);
      });
      xmlStream.closeNode();
      xmlStream.openNode("borders", { count: model.borders.length });
      model.borders.forEach((borderXml) => {
        xmlStream.writeXml(borderXml);
      });
      xmlStream.closeNode();
      this.map.cellStyleXfs.render(xmlStream, [{ numFmtId: 0, fontId: 0, fillId: 0, borderId: 0, xfId: 0 }]);
      xmlStream.openNode("cellXfs", { count: model.styles.length });
      model.styles.forEach((styleXml) => {
        xmlStream.writeXml(styleXml);
      });
      xmlStream.closeNode();
    } else {
      this.map.numFmts.render(xmlStream, model.numFmts);
      this.map.fonts.render(xmlStream, model.fonts);
      this.map.fills.render(xmlStream, model.fills);
      this.map.borders.render(xmlStream, model.borders);
      this.map.cellStyleXfs.render(xmlStream, [{ numFmtId: 0, fontId: 0, fillId: 0, borderId: 0, xfId: 0 }]);
      this.map.cellXfs.render(xmlStream, model.styles);
    }
    _StylesXform.STATIC_XFORMS.cellStyles.render(xmlStream);
    this.map.dxfs.render(xmlStream, model.dxfs);
    _StylesXform.STATIC_XFORMS.tableStyles.render(xmlStream);
    _StylesXform.STATIC_XFORMS.extLst.render(xmlStream);
    xmlStream.closeNode();
  }
  parseOpen(node) {
    if (this.parser) {
      this.parser.parseOpen(node);
      return true;
    }
    switch (node.name) {
      case "styleSheet":
        this.initIndex();
        return true;
      default:
        this.parser = this.map[node.name];
        if (this.parser) {
          this.parser.parseOpen(node);
        }
        return true;
    }
  }
  parseText(text) {
    if (this.parser) {
      this.parser.parseText(text);
    }
  }
  parseClose(name) {
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        this.parser = void 0;
      }
      return true;
    }
    switch (name) {
      case "styleSheet": {
        this.model = {};
        const add = (propName, xform) => {
          if (xform.model && xform.model.length) {
            this.model[propName] = xform.model;
          }
        };
        add("numFmts", this.map.numFmts);
        add("fonts", this.map.fonts);
        add("fills", this.map.fills);
        add("borders", this.map.borders);
        add("styles", this.map.cellXfs);
        add("dxfs", this.map.dxfs);
        this.index = {
          model: [],
          numFmt: []
        };
        if (this.model.numFmts) {
          const numFmtIndex = this.index.numFmt;
          this.model.numFmts.forEach((numFmt) => {
            numFmtIndex[numFmt.id] = numFmt.formatCode;
          });
        }
        return false;
      }
      default:
        return true;
    }
  }
  // add a cell's style model to the collection
  // each style property is processed and cross-referenced, etc.
  // the styleId is returned. Note: cellType is used when numFmt not defined
  addStyleModel(model, cellType) {
    if (!model) {
      return 0;
    }
    if (!this.model.fonts.length) {
      this._addFont({ size: 11, color: { theme: 1 }, name: "Calibri", family: 2, scheme: "minor" });
    }
    if (this.weakMap && this.weakMap.has(model)) {
      return this.weakMap.get(model);
    }
    const style = {};
    cellType = cellType || ValueType.Number;
    if (model.numFmt) {
      style.numFmtId = this._addNumFmtStr(model.numFmt);
    } else {
      switch (cellType) {
        case ValueType.Number:
          style.numFmtId = this._addNumFmtStr("General");
          break;
        case ValueType.Date:
          style.numFmtId = this._addNumFmtStr("mm-dd-yy");
          break;
        default:
          break;
      }
    }
    if (model.font) {
      style.fontId = this._addFont(model.font);
    }
    if (model.border) {
      style.borderId = this._addBorder(model.border);
    }
    if (model.fill) {
      style.fillId = this._addFill(model.fill);
    }
    if (model.alignment) {
      style.alignment = model.alignment;
    }
    if (model.protection) {
      style.protection = model.protection;
    }
    const styleId = this._addStyle(style);
    if (this.weakMap) {
      this.weakMap.set(model, styleId);
    }
    return styleId;
  }
  // given a styleId (i.e. s="n"), get the cell's style model
  // objects are shared where possible.
  getStyleModel(id) {
    const style = this.model.styles[id];
    if (!style)
      return null;
    let model = this.index.model[id];
    if (model)
      return model;
    model = this.index.model[id] = {};
    if (style.numFmtId) {
      const numFmt = this.index.numFmt[style.numFmtId] || numfmt_xform_default.getDefaultFmtCode(style.numFmtId);
      if (numFmt) {
        model.numFmt = numFmt;
      }
    }
    function addStyle(name, group, styleId) {
      if (styleId || styleId === 0) {
        const part = group[styleId];
        if (part) {
          model[name] = part;
        }
      }
    }
    addStyle("font", this.model.fonts, style.fontId);
    addStyle("border", this.model.borders, style.borderId);
    addStyle("fill", this.model.fills, style.fillId);
    if (style.alignment) {
      model.alignment = style.alignment;
    }
    if (style.protection) {
      model.protection = style.protection;
    }
    return model;
  }
  addDxfStyle(style) {
    if (style.numFmt) {
      style.numFmtId = this._addNumFmtStr(style.numFmt);
    }
    this.model.dxfs.push(style);
    return this.model.dxfs.length - 1;
  }
  getDxfStyle(id) {
    return this.model.dxfs[id];
  }
  // =========================================================================
  // Private Interface
  _addStyle(style) {
    const xml = this.map.style.toXml(style);
    let index = this.index.style[xml];
    if (index === void 0) {
      index = this.index.style[xml] = this.model.styles.length;
      this.model.styles.push(xml);
    }
    return index;
  }
  // =========================================================================
  // Number Formats
  _addNumFmtStr(formatCode) {
    let index = numfmt_xform_default.getDefaultFmtId(formatCode);
    if (index !== void 0)
      return index;
    index = this.index.numFmt[formatCode];
    if (index !== void 0)
      return index;
    index = this.index.numFmt[formatCode] = NUMFMT_BASE + this.model.numFmts.length;
    const xml = this.map.numFmt.toXml({ id: index, formatCode });
    this.model.numFmts.push(xml);
    return index;
  }
  // =========================================================================
  // Fonts
  _addFont(font) {
    const xml = this.map.font.toXml(font);
    let index = this.index.font[xml];
    if (index === void 0) {
      index = this.index.font[xml] = this.model.fonts.length;
      this.model.fonts.push(xml);
    }
    return index;
  }
  // =========================================================================
  // Borders
  _addBorder(border) {
    const xml = this.map.border.toXml(border);
    let index = this.index.border[xml];
    if (index === void 0) {
      index = this.index.border[xml] = this.model.borders.length;
      this.model.borders.push(xml);
    }
    return index;
  }
  // =========================================================================
  // Fills
  _addFill(fill) {
    const xml = this.map.fill.toXml(fill);
    let index = this.index.fill[xml];
    if (index === void 0) {
      index = this.index.fill[xml] = this.model.fills.length;
      this.model.fills.push(xml);
    }
    return index;
  }
  static STYLESHEET_ATTRIBUTES = {
    xmlns: "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
    "xmlns:mc": "http://schemas.openxmlformats.org/markup-compatibility/2006",
    "mc:Ignorable": "x14ac x16r2",
    "xmlns:x14ac": "http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac",
    "xmlns:x16r2": "http://schemas.microsoft.com/office/spreadsheetml/2015/02/main"
  };
  static STATIC_XFORMS = {
    cellStyles: new static_xform_default({
      tag: "cellStyles",
      $: { count: 1 },
      c: [{ tag: "cellStyle", $: { name: "Normal", xfId: 0, builtinId: 0 } }]
    }),
    dxfs: new static_xform_default({ tag: "dxfs", $: { count: 0 } }),
    tableStyles: new static_xform_default({
      tag: "tableStyles",
      $: { count: 0, defaultTableStyle: "TableStyleMedium2", defaultPivotStyle: "PivotStyleLight16" }
    }),
    extLst: new static_xform_default({
      tag: "extLst",
      c: [
        {
          tag: "ext",
          $: {
            uri: "{EB79DEF2-80B8-43e5-95BD-54CBDDF9020C}",
            "xmlns:x14": "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main"
          },
          c: [{ tag: "x14:slicerStyles", $: { defaultSlicerStyle: "SlicerStyleLight1" } }]
        },
        {
          tag: "ext",
          $: {
            uri: "{9260A510-F301-46a8-8635-F512D64BE5F5}",
            "xmlns:x15": "http://schemas.microsoft.com/office/spreadsheetml/2010/11/main"
          },
          c: [{ tag: "x15:timelineStyles", $: { defaultTimelineStyle: "TimeSlicerStyleLight1" } }]
        }
      ]
    })
  };
};

// esm/xlsx/xform/core/core-xform.js
init_xml_stream();
init_base_xform();

// esm/xlsx/xform/simple/date-xform.js
init_base_xform();
var DateXform = class extends base_xform_default {
  constructor(options) {
    super();
    this.tag = options.tag;
    this.attr = options.attr;
    this.attrs = options.attrs;
    this._format = options.format || function(dt) {
      try {
        if (Number.isNaN(dt.getTime()))
          return "";
        return dt.toISOString();
      } catch (e) {
        return "";
      }
    };
    this._parse = options.parse || function(str) {
      return new Date(str);
    };
  }
  render(xmlStream, model) {
    if (model) {
      xmlStream.openNode(this.tag);
      if (this.attrs) {
        xmlStream.addAttributes(this.attrs);
      }
      if (this.attr) {
        xmlStream.addAttribute(this.attr, this._format(model));
      } else {
        xmlStream.writeText(this._format(model));
      }
      xmlStream.closeNode();
    }
  }
  parseOpen(node) {
    if (node.name === this.tag) {
      if (this.attr) {
        this.model = this._parse(node.attributes[this.attr]);
      } else {
        this.text = [];
      }
    }
  }
  parseText(text) {
    if (!this.attr) {
      this.text.push(text);
    }
  }
  parseClose() {
    if (!this.attr) {
      this.model = this._parse(this.text.join(""));
    }
    return false;
  }
};
var date_xform_default = DateXform;

// esm/xlsx/xform/core/core-xform.js
init_string_xform();
init_integer_xform();
var CoreXform = class _CoreXform extends base_xform_default {
  constructor() {
    super();
    this.map = {
      "dc:creator": new string_xform_default({ tag: "dc:creator" }),
      "dc:title": new string_xform_default({ tag: "dc:title" }),
      "dc:subject": new string_xform_default({ tag: "dc:subject" }),
      "dc:description": new string_xform_default({ tag: "dc:description" }),
      "dc:identifier": new string_xform_default({ tag: "dc:identifier" }),
      "dc:language": new string_xform_default({ tag: "dc:language" }),
      "cp:keywords": new string_xform_default({ tag: "cp:keywords" }),
      "cp:category": new string_xform_default({ tag: "cp:category" }),
      "cp:lastModifiedBy": new string_xform_default({ tag: "cp:lastModifiedBy" }),
      "cp:lastPrinted": new date_xform_default({ tag: "cp:lastPrinted", format: _CoreXform.DateFormat }),
      "cp:revision": new integer_xform_default({ tag: "cp:revision" }),
      "cp:version": new string_xform_default({ tag: "cp:version" }),
      "cp:contentStatus": new string_xform_default({ tag: "cp:contentStatus" }),
      "cp:contentType": new string_xform_default({ tag: "cp:contentType" }),
      "dcterms:created": new date_xform_default({
        tag: "dcterms:created",
        attrs: _CoreXform.DateAttrs,
        format: _CoreXform.DateFormat
      }),
      "dcterms:modified": new date_xform_default({
        tag: "dcterms:modified",
        attrs: _CoreXform.DateAttrs,
        format: _CoreXform.DateFormat
      })
    };
  }
  render(xmlStream, model) {
    xmlStream.openXml(xml_stream_default.StdDocAttributes);
    xmlStream.openNode("cp:coreProperties", _CoreXform.CORE_PROPERTY_ATTRIBUTES);
    this.map["dc:creator"].render(xmlStream, model.creator);
    this.map["dc:title"].render(xmlStream, model.title);
    this.map["dc:subject"].render(xmlStream, model.subject);
    this.map["dc:description"].render(xmlStream, model.description);
    this.map["dc:identifier"].render(xmlStream, model.identifier);
    this.map["dc:language"].render(xmlStream, model.language);
    this.map["cp:keywords"].render(xmlStream, model.keywords);
    this.map["cp:category"].render(xmlStream, model.category);
    this.map["cp:lastModifiedBy"].render(xmlStream, model.lastModifiedBy);
    this.map["cp:lastPrinted"].render(xmlStream, model.lastPrinted);
    this.map["cp:revision"].render(xmlStream, model.revision);
    this.map["cp:version"].render(xmlStream, model.version);
    this.map["cp:contentStatus"].render(xmlStream, model.contentStatus);
    this.map["cp:contentType"].render(xmlStream, model.contentType);
    this.map["dcterms:created"].render(xmlStream, model.created);
    this.map["dcterms:modified"].render(xmlStream, model.modified);
    xmlStream.closeNode();
  }
  parseOpen(node) {
    if (this.parser) {
      this.parser.parseOpen(node);
      return true;
    }
    switch (node.name) {
      case "cp:coreProperties":
      case "coreProperties":
        return true;
      default:
        this.parser = this.map[node.name];
        if (this.parser) {
          this.parser.parseOpen(node);
          return true;
        }
        throw new Error(`Unexpected xml node in parseOpen: ${JSON.stringify(node)}`);
    }
  }
  parseText(text) {
    if (this.parser) {
      this.parser.parseText(text);
    }
  }
  parseClose(name) {
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        this.parser = void 0;
      }
      return true;
    }
    switch (name) {
      case "cp:coreProperties":
      case "coreProperties":
        this.model = {
          creator: this.map["dc:creator"].model,
          title: this.map["dc:title"].model,
          subject: this.map["dc:subject"].model,
          description: this.map["dc:description"].model,
          identifier: this.map["dc:identifier"].model,
          language: this.map["dc:language"].model,
          keywords: this.map["cp:keywords"].model,
          category: this.map["cp:category"].model,
          lastModifiedBy: this.map["cp:lastModifiedBy"].model,
          lastPrinted: this.map["cp:lastPrinted"].model,
          revision: this.map["cp:revision"].model,
          contentStatus: this.map["cp:contentStatus"].model,
          contentType: this.map["cp:contentType"].model,
          created: this.map["dcterms:created"].model,
          modified: this.map["dcterms:modified"].model
        };
        return false;
      default:
        throw new Error(`Unexpected xml node in parseClose: ${name}`);
    }
  }
};
CoreXform.DateFormat = function(dt) {
  return dt.toISOString().replace(/[.]\d{3}/, "");
};
CoreXform.DateAttrs = { "xsi:type": "dcterms:W3CDTF" };
CoreXform.CORE_PROPERTY_ATTRIBUTES = {
  "xmlns:cp": "http://schemas.openxmlformats.org/package/2006/metadata/core-properties",
  "xmlns:dc": "http://purl.org/dc/elements/1.1/",
  "xmlns:dcterms": "http://purl.org/dc/terms/",
  "xmlns:dcmitype": "http://purl.org/dc/dcmitype/",
  "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance"
};
var core_xform_default = CoreXform;

// esm/xlsx/xform/strings/shared-strings-xform.js
init_xml_stream();
init_base_xform();

// esm/xlsx/xform/strings/shared-string-xform.js
init_text_xform();
init_rich_text_xform();

// esm/xlsx/xform/strings/phonetic-text-xform.js
init_text_xform();
init_rich_text_xform();
init_base_xform();
var PhoneticTextXform = class extends base_xform_default {
  constructor() {
    super();
    this.map = {
      r: new rich_text_xform_default(),
      t: new text_xform_default()
    };
  }
  get tag() {
    return "rPh";
  }
  render(xmlStream, model) {
    xmlStream.openNode(this.tag, {
      sb: model.sb || 0,
      eb: model.eb || 0
    });
    if (model && model.hasOwnProperty("richText") && model.richText) {
      const { r } = this.map;
      model.richText.forEach((text) => {
        r.render(xmlStream, text);
      });
    } else if (model) {
      this.map.t.render(xmlStream, model.text);
    }
    xmlStream.closeNode();
  }
  parseOpen(node) {
    const { name } = node;
    if (this.parser) {
      this.parser.parseOpen(node);
      return true;
    }
    if (name === this.tag) {
      this.model = {
        sb: parseInt(node.attributes.sb, 10),
        eb: parseInt(node.attributes.eb, 10)
      };
      return true;
    }
    this.parser = this.map[name];
    if (this.parser) {
      this.parser.parseOpen(node);
      return true;
    }
    return false;
  }
  parseText(text) {
    if (this.parser) {
      this.parser.parseText(text);
    }
  }
  parseClose(name) {
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        switch (name) {
          case "r": {
            let rt = this.model.richText;
            if (!rt) {
              rt = this.model.richText = [];
            }
            rt.push(this.parser.model);
            break;
          }
          case "t":
            this.model.text = this.parser.model;
            break;
          default:
            break;
        }
        this.parser = void 0;
      }
      return true;
    }
    switch (name) {
      case this.tag:
        return false;
      default:
        return true;
    }
  }
};
var phonetic_text_xform_default = PhoneticTextXform;

// esm/xlsx/xform/strings/shared-string-xform.js
init_base_xform();
var SharedStringXform = class extends base_xform_default {
  constructor(model) {
    super();
    this.model = model;
    this.map = {
      r: new rich_text_xform_default(),
      t: new text_xform_default(),
      rPh: new phonetic_text_xform_default()
    };
  }
  get tag() {
    return "si";
  }
  render(xmlStream, model) {
    xmlStream.openNode(this.tag);
    if (model && model.hasOwnProperty("richText") && model.richText) {
      if (model.richText.length) {
        model.richText.forEach((text) => {
          this.map.r.render(xmlStream, text);
        });
      } else {
        this.map.t.render(xmlStream, "");
      }
    } else if (model !== void 0 && model !== null) {
      this.map.t.render(xmlStream, model);
    }
    xmlStream.closeNode();
  }
  parseOpen(node) {
    const { name } = node;
    if (this.parser) {
      this.parser.parseOpen(node);
      return true;
    }
    if (name === this.tag) {
      this.model = {};
      return true;
    }
    this.parser = this.map[name];
    if (this.parser) {
      this.parser.parseOpen(node);
      return true;
    }
    return false;
  }
  parseText(text) {
    if (this.parser) {
      this.parser.parseText(text);
    }
  }
  parseClose(name) {
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        switch (name) {
          case "r": {
            let rt = this.model.richText;
            if (!rt) {
              rt = this.model.richText = [];
            }
            rt.push(this.parser.model);
            break;
          }
          case "t":
            this.model = this.parser.model;
            break;
          default:
            break;
        }
        this.parser = void 0;
      }
      return true;
    }
    switch (name) {
      case this.tag:
        return false;
      default:
        return true;
    }
  }
};
var shared_string_xform_default = SharedStringXform;

// esm/xlsx/xform/strings/shared-strings-xform.js
var SharedStringsXform = class extends base_xform_default {
  constructor(model) {
    super();
    this.model = model || {
      values: [],
      count: 0
    };
    this.hash = /* @__PURE__ */ Object.create(null);
    this.rich = /* @__PURE__ */ Object.create(null);
  }
  get sharedStringXform() {
    return this._sharedStringXform || (this._sharedStringXform = new shared_string_xform_default());
  }
  get values() {
    return this.model.values;
  }
  get uniqueCount() {
    return this.model.values.length;
  }
  get count() {
    return this.model.count;
  }
  getString(index) {
    return this.model.values[index];
  }
  add(value) {
    return value.richText ? this.addRichText(value) : this.addText(value);
  }
  addText(value) {
    let index = this.hash[value];
    if (index === void 0) {
      index = this.hash[value] = this.model.values.length;
      this.model.values.push(value);
    }
    this.model.count++;
    return index;
  }
  addRichText(value) {
    const xml = this.sharedStringXform.toXml(value);
    let index = this.rich[xml];
    if (index === void 0) {
      index = this.rich[xml] = this.model.values.length;
      this.model.values.push(value);
    }
    this.model.count++;
    return index;
  }
  // <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
  // <sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="<%=totalRefs%>" uniqueCount="<%=count%>">
  //   <si><t><%=text%></t></si>
  //   <si><r><rPr></rPr><t></t></r></si>
  // </sst>
  render(xmlStream, model) {
    model = model || this._values;
    xmlStream.openXml(xml_stream_default.StdDocAttributes);
    xmlStream.openNode("sst", {
      xmlns: "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
      count: model.count,
      uniqueCount: model.values.length
    });
    const sx = this.sharedStringXform;
    model.values.forEach((sharedString) => {
      sx.render(xmlStream, sharedString);
    });
    xmlStream.closeNode();
  }
  parseOpen(node) {
    if (this.parser) {
      this.parser.parseOpen(node);
      return true;
    }
    switch (node.name) {
      case "sst":
        return true;
      case "si":
        this.parser = this.sharedStringXform;
        this.parser.parseOpen(node);
        return true;
      default:
        throw new Error(`Unexpected xml node in parseOpen: ${JSON.stringify(node)}`);
    }
  }
  parseText(text) {
    if (this.parser) {
      this.parser.parseText(text);
    }
  }
  parseClose(name) {
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        this.model.values.push(this.parser.model);
        this.model.count++;
        this.parser = void 0;
      }
      return true;
    }
    switch (name) {
      case "sst":
        return false;
      default:
        throw new Error(`Unexpected xml node in parseClose: ${name}`);
    }
  }
};
var shared_strings_xform_default = SharedStringsXform;

// esm/xlsx/xform/core/relationships-xform.js
init_xml_stream();
init_base_xform();

// esm/xlsx/xform/core/relationship-xform.js
init_base_xform();
var RelationshipXform = class extends base_xform_default {
  render(xmlStream, model) {
    xmlStream.leafNode("Relationship", model);
  }
  parseOpen(node) {
    switch (node.name) {
      case "Relationship":
        this.model = node.attributes;
        return true;
      default:
        return false;
    }
  }
  parseText() {
  }
  parseClose() {
    return false;
  }
};
var relationship_xform_default = RelationshipXform;

// esm/xlsx/xform/core/relationships-xform.js
var RelationshipsXform = class _RelationshipsXform extends base_xform_default {
  constructor() {
    super();
    this.map = {
      Relationship: new relationship_xform_default()
    };
  }
  render(xmlStream, model) {
    model = model || this._values;
    xmlStream.openXml(xml_stream_default.StdDocAttributes);
    xmlStream.openNode("Relationships", _RelationshipsXform.RELATIONSHIPS_ATTRIBUTES);
    model.forEach((relationship) => {
      this.map.Relationship.render(xmlStream, relationship);
    });
    xmlStream.closeNode();
  }
  parseOpen(node) {
    if (this.parser) {
      this.parser.parseOpen(node);
      return true;
    }
    switch (node.name) {
      case "Relationships":
        this.model = [];
        return true;
      default:
        this.parser = this.map[node.name];
        if (this.parser) {
          this.parser.parseOpen(node);
          return true;
        }
        throw new Error(`Unexpected xml node in parseOpen: ${JSON.stringify(node)}`);
    }
  }
  parseText(text) {
    if (this.parser) {
      this.parser.parseText(text);
    }
  }
  parseClose(name) {
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        this.model.push(this.parser.model);
        this.parser = void 0;
      }
      return true;
    }
    switch (name) {
      case "Relationships":
        return false;
      default:
        throw new Error(`Unexpected xml node in parseClose: ${name}`);
    }
  }
};
RelationshipsXform.RELATIONSHIPS_ATTRIBUTES = {
  xmlns: "http://schemas.openxmlformats.org/package/2006/relationships"
};
var relationships_xform_default = RelationshipsXform;

// esm/xlsx/xform/core/content-types-xform.js
init_xml_stream();
init_base_xform();
var ContentTypesXform = class _ContentTypesXform extends base_xform_default {
  render(xmlStream, model) {
    xmlStream.openXml(xml_stream_default.StdDocAttributes);
    xmlStream.openNode("Types", _ContentTypesXform.PROPERTY_ATTRIBUTES);
    const mediaHash = {};
    (model.media || []).forEach((medium) => {
      if (medium.type === "image") {
        const imageType = medium.extension;
        if (!mediaHash[imageType]) {
          mediaHash[imageType] = true;
          xmlStream.leafNode("Default", { Extension: imageType, ContentType: `image/${imageType}` });
        }
      }
    });
    xmlStream.leafNode("Default", {
      Extension: "rels",
      ContentType: "application/vnd.openxmlformats-package.relationships+xml"
    });
    xmlStream.leafNode("Default", { Extension: "xml", ContentType: "application/xml" });
    xmlStream.leafNode("Override", {
      PartName: "/xl/workbook.xml",
      ContentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"
    });
    model.worksheets.forEach((worksheet) => {
      const name = `/xl/worksheets/sheet${worksheet.id}.xml`;
      xmlStream.leafNode("Override", {
        PartName: name,
        ContentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"
      });
    });
    if ((model.pivotTables || []).length) {
      xmlStream.leafNode("Override", {
        PartName: "/xl/pivotCache/pivotCacheDefinition1.xml",
        ContentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheDefinition+xml"
      });
      xmlStream.leafNode("Override", {
        PartName: "/xl/pivotCache/pivotCacheRecords1.xml",
        ContentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheRecords+xml"
      });
      xmlStream.leafNode("Override", {
        PartName: "/xl/pivotTables/pivotTable1.xml",
        ContentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotTable+xml"
      });
    }
    xmlStream.leafNode("Override", {
      PartName: "/xl/theme/theme1.xml",
      ContentType: "application/vnd.openxmlformats-officedocument.theme+xml"
    });
    xmlStream.leafNode("Override", {
      PartName: "/xl/styles.xml",
      ContentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"
    });
    const hasSharedStrings = model.sharedStrings && model.sharedStrings.count;
    if (hasSharedStrings) {
      xmlStream.leafNode("Override", {
        PartName: "/xl/sharedStrings.xml",
        ContentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"
      });
    }
    if (model.tables) {
      model.tables.forEach((table) => {
        xmlStream.leafNode("Override", {
          PartName: `/xl/tables/${table.target}`,
          ContentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml"
        });
      });
    }
    if (model.drawings) {
      model.drawings.forEach((drawing) => {
        xmlStream.leafNode("Override", {
          PartName: `/xl/drawings/${drawing.name}.xml`,
          ContentType: "application/vnd.openxmlformats-officedocument.drawing+xml"
        });
      });
    }
    if (model.commentRefs) {
      xmlStream.leafNode("Default", {
        Extension: "vml",
        ContentType: "application/vnd.openxmlformats-officedocument.vmlDrawing"
      });
      model.commentRefs.forEach(({ commentName }) => {
        xmlStream.leafNode("Override", {
          PartName: `/xl/${commentName}.xml`,
          ContentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml"
        });
      });
    }
    xmlStream.leafNode("Override", {
      PartName: "/docProps/core.xml",
      ContentType: "application/vnd.openxmlformats-package.core-properties+xml"
    });
    xmlStream.leafNode("Override", {
      PartName: "/docProps/app.xml",
      ContentType: "application/vnd.openxmlformats-officedocument.extended-properties+xml"
    });
    xmlStream.closeNode();
  }
  parseOpen() {
    return false;
  }
  parseText() {
  }
  parseClose() {
    return false;
  }
};
ContentTypesXform.PROPERTY_ATTRIBUTES = {
  xmlns: "http://schemas.openxmlformats.org/package/2006/content-types"
};
var content_types_xform_default = ContentTypesXform;

// esm/xlsx/xform/book/workbook-xform.js
init_under_dash();
init_col_cache();
init_xml_stream();
init_base_xform();
init_static_xform();

// esm/xlsx/xform/book/defined-name-xform.js
init_base_xform();
init_col_cache();
var DefinedNamesXform = class extends base_xform_default {
  render(xmlStream, model) {
    xmlStream.openNode("definedName", {
      name: model.name,
      localSheetId: model.localSheetId
    });
    xmlStream.writeText(model.ranges.join(","));
    xmlStream.closeNode();
  }
  parseOpen(node) {
    switch (node.name) {
      case "definedName":
        this._parsedName = node.attributes.name;
        this._parsedLocalSheetId = node.attributes.localSheetId;
        this._parsedText = [];
        return true;
      default:
        return false;
    }
  }
  parseText(text) {
    this._parsedText.push(text);
  }
  parseClose() {
    this.model = {
      name: this._parsedName,
      ranges: extractRanges(this._parsedText.join(""))
    };
    if (this._parsedLocalSheetId !== void 0) {
      this.model.localSheetId = parseInt(this._parsedLocalSheetId, 10);
    }
    return false;
  }
};
function isValidRange(range2) {
  try {
    decodeEx(range2);
    return true;
  } catch (err) {
    return false;
  }
}
function extractRanges(parsedText) {
  const ranges = [];
  let quotesOpened = false;
  let last = "";
  parsedText.split(",").forEach((item) => {
    if (!item) {
      return;
    }
    const quotes = (item.match(/'/g) || []).length;
    if (!quotes) {
      if (quotesOpened) {
        last += `${item},`;
      } else if (isValidRange(item)) {
        ranges.push(item);
      }
      return;
    }
    const quotesEven = quotes % 2 === 0;
    if (!quotesOpened && quotesEven && isValidRange(item)) {
      ranges.push(item);
    } else if (quotesOpened && !quotesEven) {
      quotesOpened = false;
      if (isValidRange(last + item)) {
        ranges.push(last + item);
      }
      last = "";
    } else {
      quotesOpened = true;
      last += `${item},`;
    }
  });
  return ranges;
}
var defined_name_xform_default = DefinedNamesXform;

// esm/xlsx/xform/book/sheet-xform.js
init_base_xform();
var WorksheetXform = class extends base_xform_default {
  render(xmlStream, model) {
    xmlStream.leafNode("sheet", {
      sheetId: model.id,
      name: model.name,
      state: model.state,
      "r:id": model.rId
    });
  }
  parseOpen(node) {
    if (node.name === "sheet") {
      this.model = {
        name: utils.xmlDecode(node.attributes.name),
        id: parseInt(node.attributes.sheetId, 10),
        state: node.attributes.state,
        rId: node.attributes["r:id"]
      };
      return true;
    }
    return false;
  }
  parseText() {
  }
  parseClose() {
    return false;
  }
};
var sheet_xform_default = WorksheetXform;

// esm/xlsx/xform/book/workbook-view-xform.js
init_base_xform();
var WorkbookViewXform = class extends base_xform_default {
  render(xmlStream, model) {
    const attributes = {
      xWindow: model.x || 0,
      yWindow: model.y || 0,
      windowWidth: model.width || 12e3,
      windowHeight: model.height || 24e3,
      firstSheet: model.firstSheet,
      activeTab: model.activeTab
    };
    if (model.visibility && model.visibility !== "visible") {
      attributes.visibility = model.visibility;
    }
    xmlStream.leafNode("workbookView", attributes);
  }
  parseOpen(node) {
    if (node.name === "workbookView") {
      const model = this.model = {};
      const addS = function(name, value, dflt) {
        const s = value !== void 0 ? model[name] = value : dflt;
        if (s !== void 0) {
          model[name] = s;
        }
      };
      const addN = function(name, value, dflt) {
        const n = value !== void 0 ? model[name] = parseInt(value, 10) : dflt;
        if (n !== void 0) {
          model[name] = n;
        }
      };
      addN("x", node.attributes.xWindow, 0);
      addN("y", node.attributes.yWindow, 0);
      addN("width", node.attributes.windowWidth, 25e3);
      addN("height", node.attributes.windowHeight, 1e4);
      addS("visibility", node.attributes.visibility, "visible");
      addN("activeTab", node.attributes.activeTab, void 0);
      addN("firstSheet", node.attributes.firstSheet, void 0);
      return true;
    }
    return false;
  }
  parseText() {
  }
  parseClose() {
    return false;
  }
};
var workbook_view_xform_default = WorkbookViewXform;

// esm/xlsx/xform/book/workbook-properties-xform.js
init_base_xform();
var WorksheetPropertiesXform = class extends base_xform_default {
  render(xmlStream, model) {
    xmlStream.leafNode("workbookPr", {
      date1904: model.date1904 ? 1 : void 0,
      defaultThemeVersion: 164011,
      filterPrivacy: 1
    });
  }
  parseOpen(node) {
    if (node.name === "workbookPr") {
      this.model = {
        date1904: node.attributes.date1904 === "1"
      };
      return true;
    }
    return false;
  }
  parseText() {
  }
  parseClose() {
    return false;
  }
};
var workbook_properties_xform_default = WorksheetPropertiesXform;

// esm/xlsx/xform/book/workbook-calc-properties-xform.js
init_base_xform();
var WorkbookCalcPropertiesXform = class extends base_xform_default {
  render(xmlStream, model) {
    xmlStream.leafNode("calcPr", {
      calcId: 171027,
      fullCalcOnLoad: model.fullCalcOnLoad ? 1 : void 0
    });
  }
  parseOpen(node) {
    if (node.name === "calcPr") {
      this.model = {};
      return true;
    }
    return false;
  }
  parseText() {
  }
  parseClose() {
    return false;
  }
};
var workbook_calc_properties_xform_default = WorkbookCalcPropertiesXform;

// esm/xlsx/xform/book/workbook-pivot-cache-xform.js
init_base_xform();
var WorkbookPivotCacheXform = class extends base_xform_default {
  render(xmlStream, model) {
    xmlStream.leafNode("pivotCache", {
      cacheId: model.cacheId,
      "r:id": model.rId
    });
  }
  parseOpen(node) {
    if (node.name === "pivotCache") {
      this.model = {
        cacheId: node.attributes.cacheId,
        rId: node.attributes["r:id"]
      };
      return true;
    }
    return false;
  }
  parseText() {
  }
  parseClose() {
    return false;
  }
};
var workbook_pivot_cache_xform_default = WorkbookPivotCacheXform;

// esm/xlsx/xform/book/workbook-xform.js
var WorkbookXform = class _WorkbookXform extends base_xform_default {
  constructor() {
    super();
    this.map = {
      fileVersion: _WorkbookXform.STATIC_XFORMS.fileVersion,
      workbookPr: new workbook_properties_xform_default(),
      bookViews: new list_xform_default({
        tag: "bookViews",
        count: false,
        childXform: new workbook_view_xform_default()
      }),
      sheets: new list_xform_default({ tag: "sheets", count: false, childXform: new sheet_xform_default() }),
      definedNames: new list_xform_default({
        tag: "definedNames",
        count: false,
        childXform: new defined_name_xform_default()
      }),
      calcPr: new workbook_calc_properties_xform_default(),
      pivotCaches: new list_xform_default({
        tag: "pivotCaches",
        count: false,
        childXform: new workbook_pivot_cache_xform_default()
      })
    };
  }
  prepare(model) {
    model.sheets = model.worksheets;
    const printAreas = [];
    let index = 0;
    model.sheets.forEach((sheet) => {
      if (sheet.pageSetup && sheet.pageSetup.printArea) {
        sheet.pageSetup.printArea.split("&&").forEach((printArea) => {
          const printAreaComponents = printArea.split(":");
          const definedName = {
            name: "_xlnm.Print_Area",
            ranges: [`'${sheet.name}'!$${printAreaComponents[0]}:$${printAreaComponents[1]}`],
            localSheetId: index
          };
          printAreas.push(definedName);
        });
      }
      if (sheet.pageSetup && (sheet.pageSetup.printTitlesRow || sheet.pageSetup.printTitlesColumn)) {
        const ranges = [];
        if (sheet.pageSetup.printTitlesColumn) {
          const titlesColumns = sheet.pageSetup.printTitlesColumn.split(":");
          ranges.push(`'${sheet.name}'!$${titlesColumns[0]}:$${titlesColumns[1]}`);
        }
        if (sheet.pageSetup.printTitlesRow) {
          const titlesRows = sheet.pageSetup.printTitlesRow.split(":");
          ranges.push(`'${sheet.name}'!$${titlesRows[0]}:$${titlesRows[1]}`);
        }
        const definedName = {
          name: "_xlnm.Print_Titles",
          ranges,
          localSheetId: index
        };
        printAreas.push(definedName);
      }
      index++;
    });
    if (printAreas.length) {
      model.definedNames = model.definedNames.concat(printAreas);
    }
    (model.media || []).forEach((medium, i) => {
      medium.name = medium.type + (i + 1);
    });
  }
  render(xmlStream, model) {
    xmlStream.openXml(xml_stream_default.StdDocAttributes);
    xmlStream.openNode("workbook", _WorkbookXform.WORKBOOK_ATTRIBUTES);
    this.map.fileVersion.render(xmlStream);
    this.map.workbookPr.render(xmlStream, model.properties);
    this.map.bookViews.render(xmlStream, model.views);
    this.map.sheets.render(xmlStream, model.sheets);
    this.map.definedNames.render(xmlStream, model.definedNames);
    this.map.calcPr.render(xmlStream, model.calcProperties);
    this.map.pivotCaches.render(xmlStream, model.pivotTables);
    xmlStream.closeNode();
  }
  parseOpen(node) {
    if (this.parser) {
      this.parser.parseOpen(node);
      return true;
    }
    switch (node.name) {
      case "workbook":
        return true;
      default:
        this.parser = this.map[node.name];
        if (this.parser) {
          this.parser.parseOpen(node);
        }
        return true;
    }
  }
  parseText(text) {
    if (this.parser) {
      this.parser.parseText(text);
    }
  }
  parseClose(name) {
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        this.parser = void 0;
      }
      return true;
    }
    switch (name) {
      case "workbook":
        this.model = {
          sheets: this.map.sheets.model,
          properties: this.map.workbookPr.model || {},
          views: this.map.bookViews.model,
          calcProperties: {}
        };
        if (this.map.definedNames.model) {
          this.model.definedNames = this.map.definedNames.model;
        }
        return false;
      default:
        return true;
    }
  }
  reconcile(model) {
    const rels = (model.workbookRels || []).reduce((map2, rel) => {
      map2[rel.Id] = rel;
      return map2;
    }, {});
    const worksheets = [];
    let worksheet;
    let index = 0;
    (model.sheets || []).forEach((sheet) => {
      const rel = rels[sheet.rId];
      if (!rel) {
        return;
      }
      worksheet = model.worksheetHash[`xl/${rel.Target.replace(/^(\s|\/xl\/)+/, "")}`];
      if (worksheet) {
        worksheet.name = sheet.name;
        worksheet.id = sheet.id;
        worksheet.state = sheet.state;
        worksheets[index++] = worksheet;
      }
    });
    const definedNames = [];
    each(model.definedNames, (definedName) => {
      if (definedName.name === "_xlnm.Print_Area") {
        worksheet = worksheets[definedName.localSheetId];
        if (worksheet) {
          if (!worksheet.pageSetup) {
            worksheet.pageSetup = {};
          }
          const range2 = decodeEx(definedName.ranges[0]);
          worksheet.pageSetup.printArea = worksheet.pageSetup.printArea ? `${worksheet.pageSetup.printArea}&&${range2.dimensions}` : range2.dimensions;
        }
      } else if (definedName.name === "_xlnm.Print_Titles") {
        worksheet = worksheets[definedName.localSheetId];
        if (worksheet) {
          if (!worksheet.pageSetup) {
            worksheet.pageSetup = {};
          }
          const rangeString = definedName.ranges.join(",");
          const dollarRegex = /\$/g;
          const rowRangeRegex = /\$\d+:\$\d+/;
          const rowRangeMatches = rangeString.match(rowRangeRegex);
          if (rowRangeMatches && rowRangeMatches.length) {
            const range2 = rowRangeMatches[0];
            worksheet.pageSetup.printTitlesRow = range2.replace(dollarRegex, "");
          }
          const columnRangeRegex = /\$[A-Z]+:\$[A-Z]+/;
          const columnRangeMatches = rangeString.match(columnRangeRegex);
          if (columnRangeMatches && columnRangeMatches.length) {
            const range2 = columnRangeMatches[0];
            worksheet.pageSetup.printTitlesColumn = range2.replace(dollarRegex, "");
          }
        }
      } else {
        definedNames.push(definedName);
      }
    });
    model.definedNames = definedNames;
    model.media.forEach((media, i) => {
      media.index = i;
    });
  }
};
WorkbookXform.WORKBOOK_ATTRIBUTES = {
  xmlns: "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
  "xmlns:r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
  "xmlns:mc": "http://schemas.openxmlformats.org/markup-compatibility/2006",
  "mc:Ignorable": "x15",
  "xmlns:x15": "http://schemas.microsoft.com/office/spreadsheetml/2010/11/main"
};
WorkbookXform.STATIC_XFORMS = {
  fileVersion: new static_xform_default({
    tag: "fileVersion",
    $: { appName: "xl", lastEdited: 5, lowestEdited: 5, rupBuild: 9303 }
  })
};
var workbook_xform_default = WorkbookXform;

// esm/xlsx/xform/sheet/worksheet-xform.js
init_under_dash();
init_col_cache();
init_xml_stream();

// esm/xlsx/rel-type.js
var OfficeDocument = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument";
var Worksheet2 = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet";
var CalcChain = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/calcChain";
var SharedStrings = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings";
var Styles = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles";
var Theme = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme";
var Hyperlink = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink";
var Image2 = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image";
var CoreProperties = "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties";
var ExtenderProperties = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties";
var Comments = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments";
var VmlDrawing = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/vmlDrawing";
var Table2 = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/table";
var PivotCacheDefinition = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/pivotCacheDefinition";
var PivotCacheRecords = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/pivotCacheRecords";
var PivotTable = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/pivotTable";
var rel_type_default = {
  OfficeDocument,
  Worksheet: Worksheet2,
  CalcChain,
  SharedStrings,
  Styles,
  Theme,
  Hyperlink,
  Image: Image2,
  CoreProperties,
  ExtenderProperties,
  Comments,
  VmlDrawing,
  Table: Table2,
  PivotCacheDefinition,
  PivotCacheRecords,
  PivotTable
};

// esm/xlsx/xform/sheet/merges.js
init_under_dash();
init_col_cache();
var Merges = class {
  constructor() {
    this.merges = {};
  }
  add(merge) {
    if (this.merges[merge.master]) {
      this.merges[merge.master].expandToAddress(merge.address);
    } else {
      const range2 = `${merge.master}:${merge.address}`;
      this.merges[merge.master] = new range_default(range2);
    }
  }
  get mergeCells() {
    return map(this.merges, (merge) => merge.range);
  }
  reconcile(mergeCells, rows) {
    each(mergeCells, (merge) => {
      const dimensions = decode(merge);
      for (let i = dimensions.top; i <= dimensions.bottom; i++) {
        const row = rows[i - 1];
        for (let j = dimensions.left; j <= dimensions.right; j++) {
          const cell = row.cells[j - 1];
          if (!cell) {
            row.cells[j] = {
              type: 0,
              address: encodeAddress(i, j)
            };
          } else if (cell.type === 1) {
            cell.master = dimensions.tl;
          }
        }
      }
    });
  }
  getMasterAddress(address) {
    const range2 = this.hash[address];
    return range2 && range2.tl;
  }
};
var merges_default = Merges;

// esm/xlsx/xform/sheet/worksheet-xform.js
init_base_xform();

// esm/xlsx/xform/sheet/row-xform.js
init_base_xform();
init_utils();

// esm/xlsx/xform/sheet/cell-xform.js
init_utils();
init_base_xform();
init_rich_text_xform();
function getValueType(v) {
  if (v === null || v === void 0) {
    return ValueType.Null;
  }
  if (v instanceof String || typeof v === "string") {
    return ValueType.String;
  }
  if (typeof v === "number") {
    return ValueType.Number;
  }
  if (typeof v === "boolean") {
    return ValueType.Boolean;
  }
  if (v instanceof Date) {
    return ValueType.Date;
  }
  if (v.text && v.hyperlink) {
    return ValueType.Hyperlink;
  }
  if (v.formula) {
    return ValueType.Formula;
  }
  if (v.error) {
    return ValueType.Error;
  }
  throw new Error("I could not understand type of value");
}
function getEffectiveCellType(cell) {
  switch (cell.type) {
    case ValueType.Formula:
      return getValueType(cell.result);
    default:
      return cell.type;
  }
}
var CellXform = class extends base_xform_default {
  constructor() {
    super();
    this.richTextXForm = new rich_text_xform_default();
  }
  get tag() {
    return "c";
  }
  prepare(model, options) {
    const styleId = options.styles.addStyleModel(model.style || {}, getEffectiveCellType(model));
    if (styleId) {
      model.styleId = styleId;
    }
    if (model.comment) {
      options.comments.push({ ...model.comment, ref: model.address });
    }
    switch (model.type) {
      case ValueType.String:
      case ValueType.RichText:
        if (options.sharedStrings) {
          model.ssId = options.sharedStrings.add(model.value);
        }
        break;
      case ValueType.Date:
        if (options.date1904) {
          model.date1904 = true;
        }
        break;
      case ValueType.Hyperlink:
        if (options.sharedStrings && model.text !== void 0 && model.text !== null) {
          model.ssId = options.sharedStrings.add(model.text);
        }
        options.hyperlinks.push({
          address: model.address,
          target: model.hyperlink,
          tooltip: model.tooltip
        });
        break;
      case ValueType.Merge:
        options.merges.add(model);
        break;
      case ValueType.Formula:
        if (options.date1904) {
          model.date1904 = true;
        }
        if (model.shareType === "shared") {
          model.si = options.siFormulae++;
        }
        if (model.formula) {
          options.formulae[model.address] = model;
        } else if (model.sharedFormula) {
          const master = options.formulae[model.sharedFormula];
          if (!master) {
            throw new Error(`Shared Formula master must exist above and or left of clone for cell ${model.address}`);
          }
          if (master.si === void 0) {
            master.shareType = "shared";
            master.si = options.siFormulae++;
            master.range = new range_default(master.address, model.address);
          } else if (master.range) {
            master.range.expandToAddress(model.address);
          }
          model.si = master.si;
        }
        break;
      default:
        break;
    }
  }
  renderFormula(xmlStream, model) {
    let attrs = null;
    switch (model.shareType) {
      case "shared":
        attrs = {
          t: "shared",
          ref: model.ref || model.range.range,
          si: model.si
        };
        break;
      case "array":
        attrs = {
          t: "array",
          ref: model.ref
        };
        break;
      default:
        if (model.si !== void 0) {
          attrs = {
            t: "shared",
            si: model.si
          };
        }
        break;
    }
    switch (getValueType(model.result)) {
      case ValueType.Null:
        xmlStream.leafNode("f", attrs, model.formula);
        break;
      case ValueType.String:
        xmlStream.addAttribute("t", "str");
        xmlStream.leafNode("f", attrs, model.formula);
        xmlStream.leafNode("v", null, model.result);
        break;
      case ValueType.Number:
        xmlStream.leafNode("f", attrs, model.formula);
        xmlStream.leafNode("v", null, model.result);
        break;
      case ValueType.Boolean:
        xmlStream.addAttribute("t", "b");
        xmlStream.leafNode("f", attrs, model.formula);
        xmlStream.leafNode("v", null, model.result ? 1 : 0);
        break;
      case ValueType.Error:
        xmlStream.addAttribute("t", "e");
        xmlStream.leafNode("f", attrs, model.formula);
        xmlStream.leafNode("v", null, model.result.error);
        break;
      case ValueType.Date:
        xmlStream.leafNode("f", attrs, model.formula);
        xmlStream.leafNode("v", null, dateToExcel(model.result, model.date1904));
        break;
      default:
        throw new Error("I could not understand type of value");
    }
  }
  render(xmlStream, model) {
    if (model.type === ValueType.Null && !model.styleId) {
      return;
    }
    xmlStream.openNode("c");
    xmlStream.addAttribute("r", model.address);
    if (model.styleId) {
      xmlStream.addAttribute("s", model.styleId);
    }
    switch (model.type) {
      case ValueType.Null:
        break;
      case ValueType.Number:
        xmlStream.leafNode("v", null, model.value);
        break;
      case ValueType.Boolean:
        xmlStream.addAttribute("t", "b");
        xmlStream.leafNode("v", null, model.value ? "1" : "0");
        break;
      case ValueType.Error:
        xmlStream.addAttribute("t", "e");
        xmlStream.leafNode("v", null, model.value.error);
        break;
      case ValueType.String:
      case ValueType.RichText:
        if (model.ssId !== void 0) {
          xmlStream.addAttribute("t", "s");
          xmlStream.leafNode("v", null, model.ssId);
        } else if (model.value && model.value.richText) {
          xmlStream.addAttribute("t", "inlineStr");
          xmlStream.openNode("is");
          model.value.richText.forEach((text) => {
            this.richTextXForm.render(xmlStream, text);
          });
          xmlStream.closeNode("is");
        } else {
          xmlStream.addAttribute("t", "str");
          xmlStream.leafNode("v", null, model.value);
        }
        break;
      case ValueType.Date:
        xmlStream.leafNode("v", null, dateToExcel(model.value, model.date1904));
        break;
      case ValueType.Hyperlink:
        if (model.ssId !== void 0) {
          xmlStream.addAttribute("t", "s");
          xmlStream.leafNode("v", null, model.ssId);
        } else {
          xmlStream.addAttribute("t", "str");
          xmlStream.leafNode("v", null, model.text);
        }
        break;
      case ValueType.Formula:
        this.renderFormula(xmlStream, model);
        break;
      case ValueType.Merge:
        break;
      default:
        break;
    }
    xmlStream.closeNode();
  }
  parseOpen(node) {
    if (this.parser) {
      this.parser.parseOpen(node);
      return true;
    }
    switch (node.name) {
      case "c":
        this.model = {
          address: node.attributes.r
        };
        this.t = node.attributes.t;
        if (node.attributes.s) {
          this.model.styleId = parseInt(node.attributes.s, 10);
        }
        return true;
      case "f":
        this.currentNode = "f";
        this.model.si = node.attributes.si;
        this.model.shareType = node.attributes.t;
        this.model.ref = node.attributes.ref;
        return true;
      case "v":
        this.currentNode = "v";
        return true;
      case "t":
        this.currentNode = "t";
        return true;
      case "r":
        this.parser = this.richTextXForm;
        this.parser.parseOpen(node);
        return true;
      default:
        return false;
    }
  }
  parseText(text) {
    if (this.parser) {
      this.parser.parseText(text);
      return;
    }
    switch (this.currentNode) {
      case "f":
        this.model.formula = this.model.formula ? this.model.formula + text : text;
        break;
      case "v":
      case "t":
        if (this.model.value && this.model.value.richText) {
          this.model.value.richText.text = this.model.value.richText.text ? this.model.value.richText.text + text : text;
        } else {
          this.model.value = this.model.value ? this.model.value + text : text;
        }
        break;
      default:
        break;
    }
  }
  parseClose(name) {
    switch (name) {
      case "c": {
        const { model } = this;
        if (model.formula || model.shareType) {
          model.type = ValueType.Formula;
          if (model.value) {
            if (this.t === "str") {
              model.result = xmlDecode(model.value);
            } else if (this.t === "b") {
              model.result = parseInt(model.value, 10) !== 0;
            } else if (this.t === "e") {
              model.result = { error: model.value };
            } else {
              model.result = parseFloat(model.value);
            }
            model.value = void 0;
          }
        } else if (model.value !== void 0) {
          switch (this.t) {
            case "s":
              model.type = ValueType.String;
              model.value = parseInt(model.value, 10);
              break;
            case "str":
              model.type = ValueType.String;
              model.value = xmlDecode(model.value);
              break;
            case "inlineStr":
              model.type = ValueType.String;
              break;
            case "b":
              model.type = ValueType.Boolean;
              model.value = parseInt(model.value, 10) !== 0;
              break;
            case "e":
              model.type = ValueType.Error;
              model.value = { error: model.value };
              break;
            default:
              model.type = ValueType.Number;
              model.value = parseFloat(model.value);
              break;
          }
        } else if (model.styleId) {
          model.type = ValueType.Null;
        } else {
          model.type = ValueType.Merge;
        }
        return false;
      }
      case "f":
      case "v":
      case "is":
        this.currentNode = void 0;
        return true;
      case "t":
        if (this.parser) {
          this.parser.parseClose(name);
          return true;
        }
        this.currentNode = void 0;
        return true;
      case "r":
        this.model.value = this.model.value || {};
        this.model.value.richText = this.model.value.richText || [];
        this.model.value.richText.push(this.parser.model);
        this.parser = void 0;
        this.currentNode = void 0;
        return true;
      default:
        if (this.parser) {
          this.parser.parseClose(name);
          return true;
        }
        return false;
    }
  }
  reconcile(model, options) {
    const style = model.styleId && options.styles && options.styles.getStyleModel(model.styleId);
    if (style) {
      model.style = style;
    }
    if (model.styleId !== void 0) {
      model.styleId = void 0;
    }
    switch (model.type) {
      case ValueType.String:
        if (typeof model.value === "number") {
          if (options.sharedStrings) {
            model.value = options.sharedStrings.getString(model.value);
          }
        }
        if (model.value.richText) {
          model.type = ValueType.RichText;
        }
        break;
      case ValueType.Number:
        if (style && isDateFmt(style.numFmt)) {
          model.type = ValueType.Date;
          model.value = excelToDate(model.value, options.date1904);
        }
        break;
      case ValueType.Formula:
        if (model.result !== void 0 && style && isDateFmt(style.numFmt)) {
          model.result = excelToDate(model.result, options.date1904);
        }
        if (model.shareType === "shared") {
          if (model.ref) {
            options.formulae[model.si] = model.address;
          } else {
            model.sharedFormula = options.formulae[model.si];
            delete model.shareType;
          }
          delete model.si;
        }
        break;
      default:
        break;
    }
    const hyperlink = options.hyperlinkMap[model.address];
    if (hyperlink) {
      if (model.type === ValueType.Formula) {
        model.text = model.result;
        model.result = void 0;
      } else {
        model.text = model.value;
        model.value = void 0;
      }
      model.type = ValueType.Hyperlink;
      model.hyperlink = hyperlink;
    }
    const comment = options.commentsMap && options.commentsMap[model.address];
    if (comment) {
      model.comment = comment;
    }
  }
};
var cell_xform_default = CellXform;

// esm/xlsx/xform/sheet/row-xform.js
var RowXform = class extends base_xform_default {
  constructor(options) {
    super();
    this.maxItems = options && options.maxItems;
    this.map = {
      c: new cell_xform_default()
    };
  }
  get tag() {
    return "row";
  }
  prepare(model, options) {
    const styleId = options.styles.addStyleModel(model.style);
    if (styleId) {
      model.styleId = styleId;
    }
    const cellXform = this.map.c;
    model.cells.forEach((cellModel) => {
      cellXform.prepare(cellModel, options);
    });
  }
  render(xmlStream, model, options) {
    xmlStream.openNode("row");
    xmlStream.addAttribute("r", model.number);
    if (model.height) {
      xmlStream.addAttribute("ht", model.height);
      xmlStream.addAttribute("customHeight", "1");
    }
    if (model.hidden) {
      xmlStream.addAttribute("hidden", "1");
    }
    if (model.min > 0 && model.max > 0 && model.min <= model.max) {
      xmlStream.addAttribute("spans", `${model.min}:${model.max}`);
    }
    if (model.styleId) {
      xmlStream.addAttribute("s", model.styleId);
      xmlStream.addAttribute("customFormat", "1");
    }
    xmlStream.addAttribute("x14ac:dyDescent", "0.25");
    if (model.outlineLevel) {
      xmlStream.addAttribute("outlineLevel", model.outlineLevel);
    }
    if (model.collapsed) {
      xmlStream.addAttribute("collapsed", "1");
    }
    const cellXform = this.map.c;
    model.cells.forEach((cellModel) => {
      cellXform.render(xmlStream, cellModel, options);
    });
    xmlStream.closeNode();
  }
  parseOpen(node) {
    if (this.parser) {
      this.parser.parseOpen(node);
      return true;
    }
    if (node.name === "row") {
      this.numRowsSeen += 1;
      const spans = node.attributes.spans ? node.attributes.spans.split(":").map((span) => parseInt(span, 10)) : [void 0, void 0];
      const model = this.model = {
        number: parseInt(node.attributes.r, 10),
        min: spans[0],
        max: spans[1],
        cells: []
      };
      if (node.attributes.s) {
        model.styleId = parseInt(node.attributes.s, 10);
      }
      if (parseBoolean(node.attributes.hidden)) {
        model.hidden = true;
      }
      if (parseBoolean(node.attributes.bestFit)) {
        model.bestFit = true;
      }
      if (node.attributes.ht) {
        model.height = parseFloat(node.attributes.ht);
      }
      if (node.attributes.outlineLevel) {
        model.outlineLevel = parseInt(node.attributes.outlineLevel, 10);
      }
      if (parseBoolean(node.attributes.collapsed)) {
        model.collapsed = true;
      }
      return true;
    }
    this.parser = this.map[node.name];
    if (this.parser) {
      this.parser.parseOpen(node);
      return true;
    }
    return false;
  }
  parseText(text) {
    if (this.parser) {
      this.parser.parseText(text);
    }
  }
  parseClose(name) {
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        this.model.cells.push(this.parser.model);
        if (this.maxItems && this.model.cells.length > this.maxItems) {
          throw new Error(`Max column count (${this.maxItems}) exceeded`);
        }
        this.parser = void 0;
      }
      return true;
    }
    return false;
  }
  reconcile(model, options) {
    model.style = model.styleId ? options.styles.getStyleModel(model.styleId) : {};
    if (model.styleId !== void 0) {
      model.styleId = void 0;
    }
    const cellXform = this.map.c;
    model.cells.forEach((cellModel) => {
      cellXform.reconcile(cellModel, options);
    });
  }
};
var row_xform_default = RowXform;

// esm/xlsx/xform/sheet/col-xform.js
init_utils();
init_base_xform();
var ColXform = class extends base_xform_default {
  get tag() {
    return "col";
  }
  prepare(model, options) {
    const styleId = options.styles.addStyleModel(model.style || {});
    if (styleId) {
      model.styleId = styleId;
    }
  }
  render(xmlStream, model) {
    xmlStream.openNode("col");
    xmlStream.addAttribute("min", model.min);
    xmlStream.addAttribute("max", model.max);
    if (model.width) {
      xmlStream.addAttribute("width", model.width);
    }
    if (model.styleId) {
      xmlStream.addAttribute("style", model.styleId);
    }
    if (model.hidden) {
      xmlStream.addAttribute("hidden", "1");
    }
    if (model.bestFit) {
      xmlStream.addAttribute("bestFit", "1");
    }
    if (model.outlineLevel) {
      xmlStream.addAttribute("outlineLevel", model.outlineLevel);
    }
    if (model.collapsed) {
      xmlStream.addAttribute("collapsed", "1");
    }
    xmlStream.addAttribute("customWidth", "1");
    xmlStream.closeNode();
  }
  parseOpen(node) {
    if (node.name === "col") {
      const model = this.model = {
        min: parseInt(node.attributes.min || "0", 10),
        max: parseInt(node.attributes.max || "0", 10),
        width: node.attributes.width === void 0 ? void 0 : parseFloat(node.attributes.width || "0")
      };
      if (node.attributes.style) {
        model.styleId = parseInt(node.attributes.style, 10);
      }
      if (parseBoolean(node.attributes.hidden)) {
        model.hidden = true;
      }
      if (parseBoolean(node.attributes.bestFit)) {
        model.bestFit = true;
      }
      if (node.attributes.outlineLevel) {
        model.outlineLevel = parseInt(node.attributes.outlineLevel, 10);
      }
      if (parseBoolean(node.attributes.collapsed)) {
        model.collapsed = true;
      }
      return true;
    }
    return false;
  }
  parseText() {
  }
  parseClose() {
    return false;
  }
  reconcile(model, options) {
    if (model.styleId) {
      model.style = options.styles.getStyleModel(model.styleId);
    }
  }
};
var col_xform_default = ColXform;

// esm/xlsx/xform/sheet/dimension-xform.js
init_base_xform();
var DimensionXform = class extends base_xform_default {
  get tag() {
    return "dimension";
  }
  render(xmlStream, model) {
    if (model) {
      xmlStream.leafNode("dimension", { ref: model });
    }
  }
  parseOpen(node) {
    if (node.name === "dimension") {
      this.model = node.attributes.ref;
      return true;
    }
    return false;
  }
  parseText() {
  }
  parseClose() {
    return false;
  }
};
var dimension_xform_default = DimensionXform;

// esm/xlsx/xform/sheet/hyperlink-xform.js
init_base_xform();
var HyperlinkXform = class extends base_xform_default {
  get tag() {
    return "hyperlink";
  }
  render(xmlStream, model) {
    if (this.isInternalLink(model)) {
      xmlStream.leafNode("hyperlink", {
        ref: model.address,
        "r:id": model.rId,
        tooltip: model.tooltip,
        location: model.target
      });
    } else {
      xmlStream.leafNode("hyperlink", {
        ref: model.address,
        "r:id": model.rId,
        tooltip: model.tooltip
      });
    }
  }
  parseOpen(node) {
    if (node.name === "hyperlink") {
      this.model = {
        address: node.attributes.ref,
        rId: node.attributes["r:id"],
        tooltip: node.attributes.tooltip
      };
      if (node.attributes.location) {
        this.model.target = node.attributes.location;
      }
      return true;
    }
    return false;
  }
  parseText() {
  }
  parseClose() {
    return false;
  }
  isInternalLink(model) {
    return model.target && /^[^!]+![a-zA-Z]+[\d]+$/.test(model.target);
  }
};
var hyperlink_xform_default = HyperlinkXform;

// esm/xlsx/xform/sheet/merge-cell-xform.js
init_base_xform();
var MergeCellXform = class extends base_xform_default {
  get tag() {
    return "mergeCell";
  }
  render(xmlStream, model) {
    xmlStream.leafNode("mergeCell", { ref: model });
  }
  parseOpen(node) {
    if (node.name === "mergeCell") {
      this.model = node.attributes.ref;
      return true;
    }
    return false;
  }
  parseText() {
  }
  parseClose() {
    return false;
  }
};
var merge_cell_xform_default = MergeCellXform;

// esm/xlsx/xform/sheet/data-validations-xform.js
init_under_dash();
init_utils();
init_col_cache();
init_base_xform();
function assign(definedName, attributes, name, defaultValue) {
  const value = attributes[name];
  if (value !== void 0) {
    definedName[name] = value;
  } else if (defaultValue !== void 0) {
    definedName[name] = defaultValue;
  }
}
function assignBool(definedName, attributes, name, defaultValue) {
  const value = attributes[name];
  if (value !== void 0) {
    definedName[name] = parseBoolean(value);
  } else if (defaultValue !== void 0) {
    definedName[name] = defaultValue;
  }
}
function optimiseDataValidations(model) {
  const dvList = map(model, (dataValidation, address) => ({
    address,
    dataValidation,
    marked: false
  })).sort((a, b) => strcmp(a.address, b.address));
  const dvMap = keyBy(dvList, "address");
  const matchCol = (addr, height, col) => {
    for (let i = 0; i < height; i++) {
      const otherAddress = encodeAddress(addr.row + i, col);
      if (!model[otherAddress] || !isEqual(model[addr.address], model[otherAddress])) {
        return false;
      }
    }
    return true;
  };
  return dvList.map((dv) => {
    if (!dv.marked) {
      const addr = decodeEx(dv.address);
      if (addr.dimensions) {
        dvMap[addr.dimensions].marked = true;
        return {
          ...dv.dataValidation,
          sqref: dv.address
        };
      }
      let height = 1;
      let otherAddress = encodeAddress(addr.row + height, addr.col);
      while (model[otherAddress] && isEqual(dv.dataValidation, model[otherAddress])) {
        height++;
        otherAddress = encodeAddress(addr.row + height, addr.col);
      }
      let width = 1;
      while (matchCol(addr, height, addr.col + width)) {
        width++;
      }
      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          otherAddress = encodeAddress(addr.row + i, addr.col + j);
          dvMap[otherAddress].marked = true;
        }
      }
      if (height > 1 || width > 1) {
        const bottom = addr.row + (height - 1);
        const right = addr.col + (width - 1);
        return {
          ...dv.dataValidation,
          sqref: `${dv.address}:${encodeAddress(bottom, right)}`
        };
      }
      return {
        ...dv.dataValidation,
        sqref: dv.address
      };
    }
    return null;
  }).filter(Boolean);
}
var DataValidationsXform = class extends base_xform_default {
  get tag() {
    return "dataValidations";
  }
  render(xmlStream, model) {
    const optimizedModel = optimiseDataValidations(model);
    if (optimizedModel.length) {
      xmlStream.openNode("dataValidations", { count: optimizedModel.length });
      optimizedModel.forEach((value) => {
        xmlStream.openNode("dataValidation");
        if (value.type !== "any") {
          xmlStream.addAttribute("type", value.type);
          if (value.operator && value.type !== "list" && value.operator !== "between") {
            xmlStream.addAttribute("operator", value.operator);
          }
          if (value.allowBlank) {
            xmlStream.addAttribute("allowBlank", "1");
          }
        }
        if (value.showInputMessage) {
          xmlStream.addAttribute("showInputMessage", "1");
        }
        if (value.promptTitle) {
          xmlStream.addAttribute("promptTitle", value.promptTitle);
        }
        if (value.prompt) {
          xmlStream.addAttribute("prompt", value.prompt);
        }
        if (value.showErrorMessage) {
          xmlStream.addAttribute("showErrorMessage", "1");
        }
        if (value.errorStyle) {
          xmlStream.addAttribute("errorStyle", value.errorStyle);
        }
        if (value.errorTitle) {
          xmlStream.addAttribute("errorTitle", value.errorTitle);
        }
        if (value.error) {
          xmlStream.addAttribute("error", value.error);
        }
        xmlStream.addAttribute("sqref", value.sqref);
        (value.formulae || []).forEach((formula, index) => {
          xmlStream.openNode(`formula${index + 1}`);
          if (value.type === "date") {
            xmlStream.writeText(dateToExcel(new Date(formula)));
          } else {
            xmlStream.writeText(formula);
          }
          xmlStream.closeNode();
        });
        xmlStream.closeNode();
      });
      xmlStream.closeNode();
    }
  }
  parseOpen(node) {
    switch (node.name) {
      case "dataValidations":
        this.model = {};
        return true;
      case "dataValidation": {
        this._address = node.attributes.sqref;
        const dataValidation = { type: node.attributes.type || "any", formulae: [] };
        if (node.attributes.type) {
          assignBool(dataValidation, node.attributes, "allowBlank");
        }
        assignBool(dataValidation, node.attributes, "showInputMessage");
        assignBool(dataValidation, node.attributes, "showErrorMessage");
        switch (dataValidation.type) {
          case "any":
          case "list":
          case "custom":
            break;
          default:
            assign(dataValidation, node.attributes, "operator", "between");
            break;
        }
        assign(dataValidation, node.attributes, "promptTitle");
        assign(dataValidation, node.attributes, "prompt");
        assign(dataValidation, node.attributes, "errorStyle");
        assign(dataValidation, node.attributes, "errorTitle");
        assign(dataValidation, node.attributes, "error");
        this._dataValidation = dataValidation;
        return true;
      }
      case "formula1":
      case "formula2":
        this._formula = [];
        return true;
      default:
        return false;
    }
  }
  parseText(text) {
    if (this._formula) {
      this._formula.push(text);
    }
  }
  parseClose(name) {
    switch (name) {
      case "dataValidations":
        return false;
      case "dataValidation": {
        if (!this._dataValidation.formulae || !this._dataValidation.formulae.length) {
          delete this._dataValidation.formulae;
          delete this._dataValidation.operator;
        }
        const list = this._address.split(/\s+/g) || [];
        list.forEach((addr) => {
          if (addr.includes(":")) {
            const range2 = new range_default(addr);
            range2.forEachAddress((address) => {
              this.model[address] = this._dataValidation;
            });
          } else {
            this.model[addr] = this._dataValidation;
          }
        });
        return true;
      }
      case "formula1":
      case "formula2": {
        let formula = this._formula.join("");
        switch (this._dataValidation.type) {
          case "whole":
          case "textLength":
            formula = parseInt(formula, 10);
            break;
          case "decimal":
            formula = parseFloat(formula);
            break;
          case "date":
            formula = excelToDate(parseFloat(formula));
            break;
          default:
            break;
        }
        this._dataValidation.formulae.push(formula);
        this._formula = void 0;
        return true;
      }
      default:
        return true;
    }
  }
};
var data_validations_xform_default = DataValidationsXform;

// esm/xlsx/xform/sheet/sheet-properties-xform.js
init_base_xform();
init_color_xform();

// esm/xlsx/xform/sheet/page-setup-properties-xform.js
init_base_xform();
var PageSetupPropertiesXform = class extends base_xform_default {
  get tag() {
    return "pageSetUpPr";
  }
  render(xmlStream, model) {
    if (model && model.fitToPage) {
      xmlStream.leafNode(this.tag, {
        fitToPage: model.fitToPage ? "1" : void 0
      });
      return true;
    }
    return false;
  }
  parseOpen(node) {
    if (node.name === this.tag) {
      this.model = {
        fitToPage: node.attributes.fitToPage === "1"
      };
      return true;
    }
    return false;
  }
  parseText() {
  }
  parseClose() {
    return false;
  }
};
var page_setup_properties_xform_default = PageSetupPropertiesXform;

// esm/xlsx/xform/sheet/outline-properties-xform.js
init_base_xform();
var isDefined = (attr) => typeof attr !== "undefined";
var OutlinePropertiesXform = class extends base_xform_default {
  get tag() {
    return "outlinePr";
  }
  render(xmlStream, model) {
    if (model && (isDefined(model.summaryBelow) || isDefined(model.summaryRight))) {
      xmlStream.leafNode(this.tag, {
        summaryBelow: isDefined(model.summaryBelow) ? Number(model.summaryBelow) : void 0,
        summaryRight: isDefined(model.summaryRight) ? Number(model.summaryRight) : void 0
      });
      return true;
    }
    return false;
  }
  parseOpen(node) {
    if (node.name === this.tag) {
      this.model = {
        summaryBelow: isDefined(node.attributes.summaryBelow) ? Boolean(Number(node.attributes.summaryBelow)) : void 0,
        summaryRight: isDefined(node.attributes.summaryRight) ? Boolean(Number(node.attributes.summaryRight)) : void 0
      };
      return true;
    }
    return false;
  }
  parseText() {
  }
  parseClose() {
    return false;
  }
};
var outline_properties_xform_default = OutlinePropertiesXform;

// esm/xlsx/xform/sheet/sheet-properties-xform.js
var SheetPropertiesXform = class extends base_xform_default {
  constructor() {
    super();
    this.map = {
      tabColor: new color_xform_default("tabColor"),
      pageSetUpPr: new page_setup_properties_xform_default(),
      outlinePr: new outline_properties_xform_default()
    };
  }
  get tag() {
    return "sheetPr";
  }
  render(xmlStream, model) {
    if (model) {
      xmlStream.addRollback();
      xmlStream.openNode("sheetPr");
      let inner = false;
      inner = this.map.tabColor.render(xmlStream, model.tabColor) || inner;
      inner = this.map.pageSetUpPr.render(xmlStream, model.pageSetup) || inner;
      inner = this.map.outlinePr.render(xmlStream, model.outlineProperties) || inner;
      if (inner) {
        xmlStream.closeNode();
        xmlStream.commit();
      } else {
        xmlStream.rollback();
      }
    }
  }
  parseOpen(node) {
    if (this.parser) {
      this.parser.parseOpen(node);
      return true;
    }
    if (node.name === this.tag) {
      this.reset();
      return true;
    }
    if (this.map[node.name]) {
      this.parser = this.map[node.name];
      this.parser.parseOpen(node);
      return true;
    }
    return false;
  }
  parseText(text) {
    if (this.parser) {
      this.parser.parseText(text);
      return true;
    }
    return false;
  }
  parseClose(name) {
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        this.parser = void 0;
      }
      return true;
    }
    if (this.map.tabColor.model || this.map.pageSetUpPr.model || this.map.outlinePr.model) {
      this.model = {};
      if (this.map.tabColor.model) {
        this.model.tabColor = this.map.tabColor.model;
      }
      if (this.map.pageSetUpPr.model) {
        this.model.pageSetup = this.map.pageSetUpPr.model;
      }
      if (this.map.outlinePr.model) {
        this.model.outlineProperties = this.map.outlinePr.model;
      }
    } else {
      this.model = null;
    }
    return false;
  }
};
var sheet_properties_xform_default = SheetPropertiesXform;

// esm/xlsx/xform/sheet/sheet-format-properties-xform.js
init_under_dash();
init_base_xform();
var SheetFormatPropertiesXform = class extends base_xform_default {
  get tag() {
    return "sheetFormatPr";
  }
  render(xmlStream, model) {
    if (model) {
      const attributes = {
        defaultRowHeight: model.defaultRowHeight,
        outlineLevelRow: model.outlineLevelRow,
        outlineLevelCol: model.outlineLevelCol,
        "x14ac:dyDescent": model.dyDescent
      };
      if (model.defaultColWidth) {
        attributes.defaultColWidth = model.defaultColWidth;
      }
      if (!model.defaultRowHeight || model.defaultRowHeight !== 15) {
        attributes.customHeight = "1";
      }
      if (some2(attributes, (value) => value !== void 0)) {
        xmlStream.leafNode("sheetFormatPr", attributes);
      }
    }
  }
  parseOpen(node) {
    if (node.name === "sheetFormatPr") {
      this.model = {
        defaultRowHeight: parseFloat(node.attributes.defaultRowHeight || "0"),
        dyDescent: parseFloat(node.attributes["x14ac:dyDescent"] || "0"),
        outlineLevelRow: parseInt(node.attributes.outlineLevelRow || "0", 10),
        outlineLevelCol: parseInt(node.attributes.outlineLevelCol || "0", 10)
      };
      if (node.attributes.defaultColWidth) {
        this.model.defaultColWidth = parseFloat(node.attributes.defaultColWidth);
      }
      return true;
    }
    return false;
  }
  parseText() {
  }
  parseClose() {
    return false;
  }
};
var sheet_format_properties_xform_default = SheetFormatPropertiesXform;

// esm/xlsx/xform/sheet/sheet-view-xform.js
init_col_cache();
init_base_xform();
var VIEW_STATES = {
  frozen: "frozen",
  frozenSplit: "frozen",
  split: "split"
};
var SheetViewXform = class extends base_xform_default {
  get tag() {
    return "sheetView";
  }
  prepare(model) {
    switch (model.state) {
      case "frozen":
      case "split":
        break;
      default:
        model.state = "normal";
        break;
    }
  }
  render(xmlStream, model) {
    xmlStream.openNode("sheetView", {
      workbookViewId: model.workbookViewId || 0
    });
    const add = function(name, value, included) {
      if (included) {
        xmlStream.addAttribute(name, value);
      }
    };
    add("rightToLeft", "1", model.rightToLeft === true);
    add("tabSelected", "1", model.tabSelected);
    add("showRuler", "0", model.showRuler === false);
    add("showRowColHeaders", "0", model.showRowColHeaders === false);
    add("showGridLines", "0", model.showGridLines === false);
    add("zoomScale", model.zoomScale, model.zoomScale);
    add("zoomScaleNormal", model.zoomScaleNormal, model.zoomScaleNormal);
    add("view", model.style, model.style);
    let topLeftCell;
    let xSplit;
    let ySplit;
    let activePane;
    switch (model.state) {
      case "frozen":
        xSplit = model.xSplit || 0;
        ySplit = model.ySplit || 0;
        topLeftCell = model.topLeftCell || getAddress(ySplit + 1, xSplit + 1).address;
        activePane = model.xSplit && model.ySplit && "bottomRight" || model.xSplit && "topRight" || "bottomLeft";
        xmlStream.leafNode("pane", {
          xSplit: model.xSplit || void 0,
          ySplit: model.ySplit || void 0,
          topLeftCell,
          activePane,
          state: "frozen"
        });
        xmlStream.leafNode("selection", {
          pane: activePane,
          activeCell: model.activeCell,
          sqref: model.activeCell
        });
        break;
      case "split":
        if (model.activePane === "topLeft") {
          model.activePane = void 0;
        }
        xmlStream.leafNode("pane", {
          xSplit: model.xSplit || void 0,
          ySplit: model.ySplit || void 0,
          topLeftCell: model.topLeftCell,
          activePane: model.activePane
        });
        xmlStream.leafNode("selection", {
          pane: model.activePane,
          activeCell: model.activeCell,
          sqref: model.activeCell
        });
        break;
      case "normal":
        if (model.activeCell) {
          xmlStream.leafNode("selection", {
            activeCell: model.activeCell,
            sqref: model.activeCell
          });
        }
        break;
      default:
        break;
    }
    xmlStream.closeNode();
  }
  parseOpen(node) {
    switch (node.name) {
      case "sheetView":
        this.sheetView = {
          workbookViewId: parseInt(node.attributes.workbookViewId, 10),
          rightToLeft: node.attributes.rightToLeft === "1",
          tabSelected: node.attributes.tabSelected === "1",
          showRuler: !(node.attributes.showRuler === "0"),
          showRowColHeaders: !(node.attributes.showRowColHeaders === "0"),
          showGridLines: !(node.attributes.showGridLines === "0"),
          zoomScale: parseInt(node.attributes.zoomScale || "100", 10),
          zoomScaleNormal: parseInt(node.attributes.zoomScaleNormal || "100", 10),
          style: node.attributes.view
        };
        this.pane = void 0;
        this.selections = {};
        return true;
      case "pane":
        this.pane = {
          xSplit: parseInt(node.attributes.xSplit || "0", 10),
          ySplit: parseInt(node.attributes.ySplit || "0", 10),
          topLeftCell: node.attributes.topLeftCell,
          activePane: node.attributes.activePane || "topLeft",
          state: node.attributes.state
        };
        return true;
      case "selection": {
        const name = node.attributes.pane || "topLeft";
        this.selections[name] = {
          pane: name,
          activeCell: node.attributes.activeCell
        };
        return true;
      }
      default:
        return false;
    }
  }
  parseText() {
  }
  parseClose(name) {
    let model;
    let selection;
    switch (name) {
      case "sheetView":
        if (this.sheetView && this.pane) {
          model = this.model = {
            workbookViewId: this.sheetView.workbookViewId,
            rightToLeft: this.sheetView.rightToLeft,
            state: VIEW_STATES[this.pane.state] || "split",
            xSplit: this.pane.xSplit,
            ySplit: this.pane.ySplit,
            topLeftCell: this.pane.topLeftCell,
            showRuler: this.sheetView.showRuler,
            showRowColHeaders: this.sheetView.showRowColHeaders,
            showGridLines: this.sheetView.showGridLines,
            zoomScale: this.sheetView.zoomScale,
            zoomScaleNormal: this.sheetView.zoomScaleNormal
          };
          if (this.model.state === "split") {
            model.activePane = this.pane.activePane;
          }
          selection = this.selections[this.pane.activePane];
          if (selection && selection.activeCell) {
            model.activeCell = selection.activeCell;
          }
          if (this.sheetView.style) {
            model.style = this.sheetView.style;
          }
        } else {
          model = this.model = {
            workbookViewId: this.sheetView.workbookViewId,
            rightToLeft: this.sheetView.rightToLeft,
            state: "normal",
            showRuler: this.sheetView.showRuler,
            showRowColHeaders: this.sheetView.showRowColHeaders,
            showGridLines: this.sheetView.showGridLines,
            zoomScale: this.sheetView.zoomScale,
            zoomScaleNormal: this.sheetView.zoomScaleNormal
          };
          selection = this.selections.topLeft;
          if (selection && selection.activeCell) {
            model.activeCell = selection.activeCell;
          }
          if (this.sheetView.style) {
            model.style = this.sheetView.style;
          }
        }
        return false;
      default:
        return true;
    }
  }
  reconcile() {
  }
};
var sheet_view_xform_default = SheetViewXform;

// esm/xlsx/xform/sheet/sheet-protection-xform.js
init_under_dash();
init_base_xform();
function booleanToXml(model, value) {
  return model ? value : void 0;
}
function xmlToBoolean(value, equals) {
  return value === equals ? true : void 0;
}
var SheetProtectionXform = class extends base_xform_default {
  get tag() {
    return "sheetProtection";
  }
  render(xmlStream, model) {
    if (model) {
      const attributes = {
        sheet: booleanToXml(model.sheet, "1"),
        selectLockedCells: model.selectLockedCells === false ? "1" : void 0,
        selectUnlockedCells: model.selectUnlockedCells === false ? "1" : void 0,
        formatCells: booleanToXml(model.formatCells, "0"),
        formatColumns: booleanToXml(model.formatColumns, "0"),
        formatRows: booleanToXml(model.formatRows, "0"),
        insertColumns: booleanToXml(model.insertColumns, "0"),
        insertRows: booleanToXml(model.insertRows, "0"),
        insertHyperlinks: booleanToXml(model.insertHyperlinks, "0"),
        deleteColumns: booleanToXml(model.deleteColumns, "0"),
        deleteRows: booleanToXml(model.deleteRows, "0"),
        sort: booleanToXml(model.sort, "0"),
        autoFilter: booleanToXml(model.autoFilter, "0"),
        pivotTables: booleanToXml(model.pivotTables, "0")
      };
      if (model.sheet) {
        attributes.algorithmName = model.algorithmName;
        attributes.hashValue = model.hashValue;
        attributes.saltValue = model.saltValue;
        attributes.spinCount = model.spinCount;
        attributes.objects = booleanToXml(model.objects === false, "1");
        attributes.scenarios = booleanToXml(model.scenarios === false, "1");
      }
      if (some2(attributes, (value) => value !== void 0)) {
        xmlStream.leafNode(this.tag, attributes);
      }
    }
  }
  parseOpen(node) {
    switch (node.name) {
      case this.tag:
        this.model = {
          sheet: xmlToBoolean(node.attributes.sheet, "1"),
          objects: node.attributes.objects === "1" ? false : void 0,
          scenarios: node.attributes.scenarios === "1" ? false : void 0,
          selectLockedCells: node.attributes.selectLockedCells === "1" ? false : void 0,
          selectUnlockedCells: node.attributes.selectUnlockedCells === "1" ? false : void 0,
          formatCells: xmlToBoolean(node.attributes.formatCells, "0"),
          formatColumns: xmlToBoolean(node.attributes.formatColumns, "0"),
          formatRows: xmlToBoolean(node.attributes.formatRows, "0"),
          insertColumns: xmlToBoolean(node.attributes.insertColumns, "0"),
          insertRows: xmlToBoolean(node.attributes.insertRows, "0"),
          insertHyperlinks: xmlToBoolean(node.attributes.insertHyperlinks, "0"),
          deleteColumns: xmlToBoolean(node.attributes.deleteColumns, "0"),
          deleteRows: xmlToBoolean(node.attributes.deleteRows, "0"),
          sort: xmlToBoolean(node.attributes.sort, "0"),
          autoFilter: xmlToBoolean(node.attributes.autoFilter, "0"),
          pivotTables: xmlToBoolean(node.attributes.pivotTables, "0")
        };
        if (node.attributes.algorithmName) {
          this.model.algorithmName = node.attributes.algorithmName;
          this.model.hashValue = node.attributes.hashValue;
          this.model.saltValue = node.attributes.saltValue;
          this.model.spinCount = parseInt(node.attributes.spinCount, 10);
        }
        return true;
      default:
        return false;
    }
  }
  parseText() {
  }
  parseClose() {
    return false;
  }
};
var sheet_protection_xform_default = SheetProtectionXform;

// esm/xlsx/xform/sheet/page-margins-xform.js
init_under_dash();
init_base_xform();
var PageMarginsXform = class extends base_xform_default {
  get tag() {
    return "pageMargins";
  }
  render(xmlStream, model) {
    if (model) {
      const attributes = {
        left: model.left,
        right: model.right,
        top: model.top,
        bottom: model.bottom,
        header: model.header,
        footer: model.footer
      };
      if (some2(attributes, (value) => value !== void 0)) {
        xmlStream.leafNode(this.tag, attributes);
      }
    }
  }
  parseOpen(node) {
    switch (node.name) {
      case this.tag:
        this.model = {
          left: parseFloat(node.attributes.left || 0.7),
          right: parseFloat(node.attributes.right || 0.7),
          top: parseFloat(node.attributes.top || 0.75),
          bottom: parseFloat(node.attributes.bottom || 0.75),
          header: parseFloat(node.attributes.header || 0.3),
          footer: parseFloat(node.attributes.footer || 0.3)
        };
        return true;
      default:
        return false;
    }
  }
  parseText() {
  }
  parseClose() {
    return false;
  }
};
var page_margins_xform_default = PageMarginsXform;

// esm/xlsx/xform/sheet/page-setup-xform.js
init_under_dash();
init_base_xform();
function booleanToXml2(model) {
  return model ? "1" : void 0;
}
function pageOrderToXml(model) {
  switch (model) {
    case "overThenDown":
      return model;
    default:
      return void 0;
  }
}
function cellCommentsToXml(model) {
  switch (model) {
    case "atEnd":
    case "asDisplyed":
      return model;
    default:
      return void 0;
  }
}
function errorsToXml(model) {
  switch (model) {
    case "dash":
    case "blank":
    case "NA":
      return model;
    default:
      return void 0;
  }
}
function pageSizeToModel(value) {
  return value !== void 0 ? parseInt(value, 10) : void 0;
}
var PageSetupXform = class extends base_xform_default {
  get tag() {
    return "pageSetup";
  }
  render(xmlStream, model) {
    if (model) {
      const attributes = {
        paperSize: model.paperSize,
        orientation: model.orientation,
        horizontalDpi: model.horizontalDpi,
        verticalDpi: model.verticalDpi,
        pageOrder: pageOrderToXml(model.pageOrder),
        blackAndWhite: booleanToXml2(model.blackAndWhite),
        draft: booleanToXml2(model.draft),
        cellComments: cellCommentsToXml(model.cellComments),
        errors: errorsToXml(model.errors),
        scale: model.scale,
        fitToWidth: model.fitToWidth,
        fitToHeight: model.fitToHeight,
        firstPageNumber: model.firstPageNumber,
        useFirstPageNumber: booleanToXml2(model.firstPageNumber),
        usePrinterDefaults: booleanToXml2(model.usePrinterDefaults),
        copies: model.copies
      };
      if (some2(attributes, (value) => value !== void 0)) {
        xmlStream.leafNode(this.tag, attributes);
      }
    }
  }
  parseOpen(node) {
    switch (node.name) {
      case this.tag:
        this.model = {
          paperSize: pageSizeToModel(node.attributes.paperSize),
          orientation: node.attributes.orientation || "portrait",
          horizontalDpi: parseInt(node.attributes.horizontalDpi || "4294967295", 10),
          verticalDpi: parseInt(node.attributes.verticalDpi || "4294967295", 10),
          pageOrder: node.attributes.pageOrder || "downThenOver",
          blackAndWhite: node.attributes.blackAndWhite === "1",
          draft: node.attributes.draft === "1",
          cellComments: node.attributes.cellComments || "None",
          errors: node.attributes.errors || "displayed",
          scale: parseInt(node.attributes.scale || "100", 10),
          fitToWidth: parseInt(node.attributes.fitToWidth || "1", 10),
          fitToHeight: parseInt(node.attributes.fitToHeight || "1", 10),
          firstPageNumber: parseInt(node.attributes.firstPageNumber || "1", 10),
          useFirstPageNumber: node.attributes.useFirstPageNumber === "1",
          usePrinterDefaults: node.attributes.usePrinterDefaults === "1",
          copies: parseInt(node.attributes.copies || "1", 10)
        };
        return true;
      default:
        return false;
    }
  }
  parseText() {
  }
  parseClose() {
    return false;
  }
};
var page_setup_xform_default = PageSetupXform;

// esm/xlsx/xform/sheet/print-options-xform.js
init_base_xform();
function booleanToXml3(model) {
  return model ? "1" : void 0;
}
var PrintOptionsXform = class extends base_xform_default {
  get tag() {
    return "printOptions";
  }
  render(xmlStream, model) {
    if (model) {
      const attributes = {
        headings: booleanToXml3(model.showRowColHeaders),
        gridLines: booleanToXml3(model.showGridLines),
        horizontalCentered: booleanToXml3(model.horizontalCentered),
        verticalCentered: booleanToXml3(model.verticalCentered)
      };
      if (some(attributes, (value) => value !== void 0)) {
        xmlStream.leafNode(this.tag, attributes);
      }
    }
  }
  parseOpen(node) {
    switch (node.name) {
      case this.tag:
        this.model = {
          showRowColHeaders: node.attributes.headings === "1",
          showGridLines: node.attributes.gridLines === "1",
          horizontalCentered: node.attributes.horizontalCentered === "1",
          verticalCentered: node.attributes.verticalCentered === "1"
        };
        return true;
      default:
        return false;
    }
  }
  parseText() {
  }
  parseClose() {
    return false;
  }
};
var print_options_xform_default = PrintOptionsXform;

// esm/xlsx/xform/sheet/auto-filter-xform.js
init_col_cache();
init_base_xform();
var AutoFilterXform = class extends base_xform_default {
  get tag() {
    return "autoFilter";
  }
  render(xmlStream, model) {
    if (model) {
      if (typeof model === "string") {
        xmlStream.leafNode("autoFilter", { ref: model });
      } else {
        const getAddress2 = function(addr) {
          if (typeof addr === "string") {
            return addr;
          }
          return getAddress2(addr.row, addr.column).address;
        };
        const firstAddress = getAddress2(model.from);
        const secondAddress = getAddress2(model.to);
        if (firstAddress && secondAddress) {
          xmlStream.leafNode("autoFilter", { ref: `${firstAddress}:${secondAddress}` });
        }
      }
    }
  }
  parseOpen(node) {
    if (node.name === "autoFilter") {
      this.model = node.attributes.ref;
    }
  }
};
var auto_filter_xform_default = AutoFilterXform;

// esm/xlsx/xform/sheet/picture-xform.js
init_base_xform();
var PictureXform = class extends base_xform_default {
  get tag() {
    return "picture";
  }
  render(xmlStream, model) {
    if (model) {
      xmlStream.leafNode(this.tag, { "r:id": model.rId });
    }
  }
  parseOpen(node) {
    switch (node.name) {
      case this.tag:
        this.model = {
          rId: node.attributes["r:id"]
        };
        return true;
      default:
        return false;
    }
  }
  parseText() {
  }
  parseClose() {
    return false;
  }
};
var picture_xform_default = PictureXform;

// esm/xlsx/xform/sheet/drawing-xform.js
init_base_xform();
var DrawingXform = class extends base_xform_default {
  get tag() {
    return "drawing";
  }
  render(xmlStream, model) {
    if (model) {
      xmlStream.leafNode(this.tag, { "r:id": model.rId });
    }
  }
  parseOpen(node) {
    switch (node.name) {
      case this.tag:
        this.model = {
          rId: node.attributes["r:id"]
        };
        return true;
      default:
        return false;
    }
  }
  parseText() {
  }
  parseClose() {
    return false;
  }
};
var drawing_xform_default = DrawingXform;

// esm/xlsx/xform/sheet/table-part-xform.js
init_base_xform();
var TablePartXform = class extends base_xform_default {
  get tag() {
    return "tablePart";
  }
  render(xmlStream, model) {
    if (model) {
      xmlStream.leafNode(this.tag, { "r:id": model.rId });
    }
  }
  parseOpen(node) {
    switch (node.name) {
      case this.tag:
        this.model = {
          rId: node.attributes["r:id"]
        };
        return true;
      default:
        return false;
    }
  }
  parseText() {
  }
  parseClose() {
    return false;
  }
};
var table_part_xform_default = TablePartXform;

// esm/xlsx/xform/sheet/page-breaks-xform.js
init_base_xform();
var PageBreaksXform = class extends base_xform_default {
  get tag() {
    return "brk";
  }
  render(xmlStream, model) {
    xmlStream.leafNode("brk", model);
  }
  parseOpen(node) {
    if (node.name === "brk") {
      this.model = node.attributes.ref;
      return true;
    }
    return false;
  }
  parseText() {
  }
  parseClose() {
    return false;
  }
};
var page_breaks_xform_default = PageBreaksXform;

// esm/xlsx/xform/sheet/row-breaks-xform.js
var RowBreaksXform = class extends list_xform_default {
  constructor() {
    const options = {
      tag: "rowBreaks",
      count: true,
      childXform: new page_breaks_xform_default()
    };
    super(options);
  }
  // get tag() { return 'rowBreaks'; }
  render(xmlStream, model) {
    if (model && model.length) {
      xmlStream.openNode(this.tag, this.$);
      if (this.count) {
        xmlStream.addAttribute(this.$count, model.length);
        xmlStream.addAttribute("manualBreakCount", model.length);
      }
      const { childXform } = this;
      model.forEach((childModel) => {
        childXform.render(xmlStream, childModel);
      });
      xmlStream.closeNode();
    } else if (this.empty) {
      xmlStream.leafNode(this.tag);
    }
  }
};
var row_breaks_xform_default = RowBreaksXform;

// esm/xlsx/xform/sheet/header-footer-xform.js
init_base_xform();
var HeaderFooterXform = class extends base_xform_default {
  get tag() {
    return "headerFooter";
  }
  render(xmlStream, model) {
    if (model) {
      xmlStream.addRollback();
      let createTag = false;
      xmlStream.openNode("headerFooter");
      if (model.differentFirst) {
        xmlStream.addAttribute("differentFirst", "1");
        createTag = true;
      }
      if (model.differentOddEven) {
        xmlStream.addAttribute("differentOddEven", "1");
        createTag = true;
      }
      if (model.oddHeader && typeof model.oddHeader === "string") {
        xmlStream.leafNode("oddHeader", null, model.oddHeader);
        createTag = true;
      }
      if (model.oddFooter && typeof model.oddFooter === "string") {
        xmlStream.leafNode("oddFooter", null, model.oddFooter);
        createTag = true;
      }
      if (model.evenHeader && typeof model.evenHeader === "string") {
        xmlStream.leafNode("evenHeader", null, model.evenHeader);
        createTag = true;
      }
      if (model.evenFooter && typeof model.evenFooter === "string") {
        xmlStream.leafNode("evenFooter", null, model.evenFooter);
        createTag = true;
      }
      if (model.firstHeader && typeof model.firstHeader === "string") {
        xmlStream.leafNode("firstHeader", null, model.firstHeader);
        createTag = true;
      }
      if (model.firstFooter && typeof model.firstFooter === "string") {
        xmlStream.leafNode("firstFooter", null, model.firstFooter);
        createTag = true;
      }
      if (createTag) {
        xmlStream.closeNode();
        xmlStream.commit();
      } else {
        xmlStream.rollback();
      }
    }
  }
  parseOpen(node) {
    switch (node.name) {
      case "headerFooter":
        this.model = {};
        if (node.attributes.differentFirst) {
          this.model.differentFirst = parseInt(node.attributes.differentFirst, 0) === 1;
        }
        if (node.attributes.differentOddEven) {
          this.model.differentOddEven = parseInt(node.attributes.differentOddEven, 0) === 1;
        }
        return true;
      case "oddHeader":
        this.currentNode = "oddHeader";
        return true;
      case "oddFooter":
        this.currentNode = "oddFooter";
        return true;
      case "evenHeader":
        this.currentNode = "evenHeader";
        return true;
      case "evenFooter":
        this.currentNode = "evenFooter";
        return true;
      case "firstHeader":
        this.currentNode = "firstHeader";
        return true;
      case "firstFooter":
        this.currentNode = "firstFooter";
        return true;
      default:
        return false;
    }
  }
  parseText(text) {
    switch (this.currentNode) {
      case "oddHeader":
        this.model.oddHeader = text;
        break;
      case "oddFooter":
        this.model.oddFooter = text;
        break;
      case "evenHeader":
        this.model.evenHeader = text;
        break;
      case "evenFooter":
        this.model.evenFooter = text;
        break;
      case "firstHeader":
        this.model.firstHeader = text;
        break;
      case "firstFooter":
        this.model.firstFooter = text;
        break;
      default:
        break;
    }
  }
  parseClose() {
    switch (this.currentNode) {
      case "oddHeader":
      case "oddFooter":
      case "evenHeader":
      case "evenFooter":
      case "firstHeader":
      case "firstFooter":
        this.currentNode = void 0;
        return true;
      default:
        return false;
    }
  }
};
var header_footer_xform_default = HeaderFooterXform;

// esm/xlsx/xform/sheet/cf/conditional-formattings-xform.js
init_base_xform();

// esm/xlsx/xform/composite-xform.js
init_base_xform();
var CompositeXform = class extends base_xform_default {
  createNewModel(node) {
    return {};
  }
  parseOpen(node) {
    this.parser = this.parser || this.map[node.name];
    if (this.parser) {
      this.parser.parseOpen(node);
      return true;
    }
    if (node.name === this.tag) {
      this.model = this.createNewModel(node);
      return true;
    }
    return false;
  }
  parseText(text) {
    if (this.parser) {
      this.parser.parseText(text);
    }
  }
  onParserClose(name, parser) {
    this.model[name] = parser.model;
  }
  parseClose(name) {
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        this.onParserClose(name, this.parser);
        this.parser = void 0;
      }
      return true;
    }
    return name !== this.tag;
  }
};
var composite_xform_default = CompositeXform;

// esm/xlsx/xform/sheet/cf/cf-rule-xform.js
init_base_xform();

// esm/xlsx/xform/sheet/cf/databar-xform.js
init_color_xform();

// esm/xlsx/xform/sheet/cf/cfvo-xform.js
init_base_xform();
var CfvoXform = class extends base_xform_default {
  get tag() {
    return "cfvo";
  }
  render(xmlStream, model) {
    xmlStream.leafNode(this.tag, {
      type: model.type,
      val: model.value
    });
  }
  parseOpen(node) {
    this.model = {
      type: node.attributes.type,
      value: base_xform_default.toFloatValue(node.attributes.val)
    };
  }
  parseClose(name) {
    return name !== this.tag;
  }
};
var cfvo_xform_default = CfvoXform;

// esm/xlsx/xform/sheet/cf/databar-xform.js
var DatabarXform = class extends composite_xform_default {
  constructor() {
    super();
    this.map = {
      cfvo: this.cfvoXform = new cfvo_xform_default(),
      color: this.colorXform = new color_xform_default()
    };
  }
  get tag() {
    return "dataBar";
  }
  render(xmlStream, model) {
    xmlStream.openNode(this.tag);
    model.cfvo.forEach((cfvo) => {
      this.cfvoXform.render(xmlStream, cfvo);
    });
    this.colorXform.render(xmlStream, model.color);
    xmlStream.closeNode();
  }
  createNewModel() {
    return {
      cfvo: []
    };
  }
  onParserClose(name, parser) {
    switch (name) {
      case "cfvo":
        this.model.cfvo.push(parser.model);
        break;
      case "color":
        this.model.color = parser.model;
        break;
    }
  }
};
var databar_xform_default = DatabarXform;

// esm/xlsx/xform/sheet/cf/ext-lst-ref-xform.js
init_base_xform();
var X14IdXform = class extends base_xform_default {
  get tag() {
    return "x14:id";
  }
  render(xmlStream, model) {
    xmlStream.leafNode(this.tag, null, model);
  }
  parseOpen() {
    this.model = "";
  }
  parseText(text) {
    this.model += text;
  }
  parseClose(name) {
    return name !== this.tag;
  }
};
var ExtXform = class extends composite_xform_default {
  constructor() {
    super();
    this.map = {
      "x14:id": this.idXform = new X14IdXform()
    };
  }
  get tag() {
    return "ext";
  }
  render(xmlStream, model) {
    xmlStream.openNode(this.tag, {
      uri: "{B025F937-C7B1-47D3-B67F-A62EFF666E3E}",
      "xmlns:x14": "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main"
    });
    this.idXform.render(xmlStream, model.x14Id);
    xmlStream.closeNode();
  }
  createNewModel() {
    return {};
  }
  onParserClose(name, parser) {
    this.model.x14Id = parser.model;
  }
};
var ExtLstRefXform = class extends composite_xform_default {
  constructor() {
    super();
    this.map = {
      ext: new ExtXform()
    };
  }
  get tag() {
    return "extLst";
  }
  render(xmlStream, model) {
    xmlStream.openNode(this.tag);
    this.map.ext.render(xmlStream, model);
    xmlStream.closeNode();
  }
  createNewModel() {
    return {};
  }
  onParserClose(name, parser) {
    Object.assign(this.model, parser.model);
  }
};
var ext_lst_ref_xform_default = ExtLstRefXform;

// esm/xlsx/xform/sheet/cf/formula-xform.js
init_base_xform();
var FormulaXform = class extends base_xform_default {
  get tag() {
    return "formula";
  }
  render(xmlStream, model) {
    xmlStream.leafNode(this.tag, null, model);
  }
  parseOpen() {
    this.model = "";
  }
  parseText(text) {
    this.model += text;
  }
  parseClose(name) {
    return name !== this.tag;
  }
};
var formula_xform_default = FormulaXform;

// esm/xlsx/xform/sheet/cf/color-scale-xform.js
init_color_xform();
var ColorScaleXform = class extends composite_xform_default {
  constructor() {
    super();
    this.map = {
      cfvo: this.cfvoXform = new cfvo_xform_default(),
      color: this.colorXform = new color_xform_default()
    };
  }
  get tag() {
    return "colorScale";
  }
  render(xmlStream, model) {
    xmlStream.openNode(this.tag);
    model.cfvo.forEach((cfvo) => {
      this.cfvoXform.render(xmlStream, cfvo);
    });
    model.color.forEach((color) => {
      this.colorXform.render(xmlStream, color);
    });
    xmlStream.closeNode();
  }
  createNewModel(node) {
    return {
      cfvo: [],
      color: []
    };
  }
  onParserClose(name, parser) {
    this.model[name].push(parser.model);
  }
};
var color_scale_xform_default = ColorScaleXform;

// esm/xlsx/xform/sheet/cf/icon-set-xform.js
init_base_xform();
var IconSetXform = class extends composite_xform_default {
  constructor() {
    super();
    this.map = {
      cfvo: this.cfvoXform = new cfvo_xform_default()
    };
  }
  get tag() {
    return "iconSet";
  }
  render(xmlStream, model) {
    xmlStream.openNode(this.tag, {
      iconSet: base_xform_default.toStringAttribute(model.iconSet, "3TrafficLights"),
      reverse: base_xform_default.toBoolAttribute(model.reverse, false),
      showValue: base_xform_default.toBoolAttribute(model.showValue, true)
    });
    model.cfvo.forEach((cfvo) => {
      this.cfvoXform.render(xmlStream, cfvo);
    });
    xmlStream.closeNode();
  }
  createNewModel({ attributes }) {
    return {
      iconSet: base_xform_default.toStringValue(attributes.iconSet, "3TrafficLights"),
      reverse: base_xform_default.toBoolValue(attributes.reverse),
      showValue: base_xform_default.toBoolValue(attributes.showValue),
      cfvo: []
    };
  }
  onParserClose(name, parser) {
    this.model[name].push(parser.model);
  }
};
var icon_set_xform_default = IconSetXform;

// esm/xlsx/xform/sheet/cf/cf-rule-xform.js
var extIcons = {
  "3Triangles": true,
  "3Stars": true,
  "5Boxes": true
};
var getTextFormula = (model) => {
  if (model.formulae && model.formulae[0]) {
    return model.formulae[0];
  }
  const range2 = new range_default(model.ref);
  const { tl } = range2;
  switch (model.operator) {
    case "containsText":
      return `NOT(ISERROR(SEARCH("${model.text}",${tl})))`;
    case "containsBlanks":
      return `LEN(TRIM(${tl}))=0`;
    case "notContainsBlanks":
      return `LEN(TRIM(${tl}))>0`;
    case "containsErrors":
      return `ISERROR(${tl})`;
    case "notContainsErrors":
      return `NOT(ISERROR(${tl}))`;
    default:
      return void 0;
  }
};
var getTimePeriodFormula = (model) => {
  if (model.formulae && model.formulae[0]) {
    return model.formulae[0];
  }
  const range2 = new range_default(model.ref);
  const { tl } = range2;
  switch (model.timePeriod) {
    case "thisWeek":
      return `AND(TODAY()-ROUNDDOWN(${tl},0)<=WEEKDAY(TODAY())-1,ROUNDDOWN(${tl},0)-TODAY()<=7-WEEKDAY(TODAY()))`;
    case "lastWeek":
      return `AND(TODAY()-ROUNDDOWN(${tl},0)>=(WEEKDAY(TODAY())),TODAY()-ROUNDDOWN(${tl},0)<(WEEKDAY(TODAY())+7))`;
    case "nextWeek":
      return `AND(ROUNDDOWN(${tl},0)-TODAY()>(7-WEEKDAY(TODAY())),ROUNDDOWN(${tl},0)-TODAY()<(15-WEEKDAY(TODAY())))`;
    case "yesterday":
      return `FLOOR(${tl},1)=TODAY()-1`;
    case "today":
      return `FLOOR(${tl},1)=TODAY()`;
    case "tomorrow":
      return `FLOOR(${tl},1)=TODAY()+1`;
    case "last7Days":
      return `AND(TODAY()-FLOOR(${tl},1)<=6,FLOOR(${tl},1)<=TODAY())`;
    case "lastMonth":
      return `AND(MONTH(${tl})=MONTH(EDATE(TODAY(),0-1)),YEAR(${tl})=YEAR(EDATE(TODAY(),0-1)))`;
    case "thisMonth":
      return `AND(MONTH(${tl})=MONTH(TODAY()),YEAR(${tl})=YEAR(TODAY()))`;
    case "nextMonth":
      return `AND(MONTH(${tl})=MONTH(EDATE(TODAY(),0+1)),YEAR(${tl})=YEAR(EDATE(TODAY(),0+1)))`;
    default:
      return void 0;
  }
};
var opType = (attributes) => {
  const { type, operator } = attributes;
  switch (type) {
    case "containsText":
    case "containsBlanks":
    case "notContainsBlanks":
    case "containsErrors":
    case "notContainsErrors":
      return {
        type: "containsText",
        operator: type
      };
    default:
      return { type, operator };
  }
};
var CfRuleXform = class _CfRuleXform extends composite_xform_default {
  constructor() {
    super();
    this.map = {
      dataBar: this.databarXform = new databar_xform_default(),
      extLst: this.extLstRefXform = new ext_lst_ref_xform_default(),
      formula: this.formulaXform = new formula_xform_default(),
      colorScale: this.colorScaleXform = new color_scale_xform_default(),
      iconSet: this.iconSetXform = new icon_set_xform_default()
    };
  }
  get tag() {
    return "cfRule";
  }
  static isPrimitive(rule) {
    if (rule.type === "iconSet") {
      if (rule.custom || extIcons[rule.iconSet]) {
        return false;
      }
    }
    return true;
  }
  render(xmlStream, model) {
    switch (model.type) {
      case "expression":
        this.renderExpression(xmlStream, model);
        break;
      case "cellIs":
        this.renderCellIs(xmlStream, model);
        break;
      case "top10":
        this.renderTop10(xmlStream, model);
        break;
      case "aboveAverage":
        this.renderAboveAverage(xmlStream, model);
        break;
      case "dataBar":
        this.renderDataBar(xmlStream, model);
        break;
      case "colorScale":
        this.renderColorScale(xmlStream, model);
        break;
      case "iconSet":
        this.renderIconSet(xmlStream, model);
        break;
      case "containsText":
        this.renderText(xmlStream, model);
        break;
      case "timePeriod":
        this.renderTimePeriod(xmlStream, model);
        break;
    }
  }
  renderExpression(xmlStream, model) {
    xmlStream.openNode(this.tag, {
      type: "expression",
      dxfId: model.dxfId,
      priority: model.priority
    });
    this.formulaXform.render(xmlStream, model.formulae[0]);
    xmlStream.closeNode();
  }
  renderCellIs(xmlStream, model) {
    xmlStream.openNode(this.tag, {
      type: "cellIs",
      dxfId: model.dxfId,
      priority: model.priority,
      operator: model.operator
    });
    model.formulae.forEach((formula) => {
      this.formulaXform.render(xmlStream, formula);
    });
    xmlStream.closeNode();
  }
  renderTop10(xmlStream, model) {
    xmlStream.leafNode(this.tag, {
      type: "top10",
      dxfId: model.dxfId,
      priority: model.priority,
      percent: base_xform_default.toBoolAttribute(model.percent, false),
      bottom: base_xform_default.toBoolAttribute(model.bottom, false),
      rank: base_xform_default.toIntValue(model.rank, 10, true)
    });
  }
  renderAboveAverage(xmlStream, model) {
    xmlStream.leafNode(this.tag, {
      type: "aboveAverage",
      dxfId: model.dxfId,
      priority: model.priority,
      aboveAverage: base_xform_default.toBoolAttribute(model.aboveAverage, true)
    });
  }
  renderDataBar(xmlStream, model) {
    xmlStream.openNode(this.tag, {
      type: "dataBar",
      priority: model.priority
    });
    this.databarXform.render(xmlStream, model);
    this.extLstRefXform.render(xmlStream, model);
    xmlStream.closeNode();
  }
  renderColorScale(xmlStream, model) {
    xmlStream.openNode(this.tag, {
      type: "colorScale",
      priority: model.priority
    });
    this.colorScaleXform.render(xmlStream, model);
    xmlStream.closeNode();
  }
  renderIconSet(xmlStream, model) {
    if (!_CfRuleXform.isPrimitive(model)) {
      return;
    }
    xmlStream.openNode(this.tag, {
      type: "iconSet",
      priority: model.priority
    });
    this.iconSetXform.render(xmlStream, model);
    xmlStream.closeNode();
  }
  renderText(xmlStream, model) {
    xmlStream.openNode(this.tag, {
      type: model.operator,
      dxfId: model.dxfId,
      priority: model.priority,
      operator: base_xform_default.toStringAttribute(model.operator, "containsText")
    });
    const formula = getTextFormula(model);
    if (formula) {
      this.formulaXform.render(xmlStream, formula);
    }
    xmlStream.closeNode();
  }
  renderTimePeriod(xmlStream, model) {
    xmlStream.openNode(this.tag, {
      type: "timePeriod",
      dxfId: model.dxfId,
      priority: model.priority,
      timePeriod: model.timePeriod
    });
    const formula = getTimePeriodFormula(model);
    if (formula) {
      this.formulaXform.render(xmlStream, formula);
    }
    xmlStream.closeNode();
  }
  createNewModel({ attributes }) {
    return {
      ...opType(attributes),
      dxfId: base_xform_default.toIntValue(attributes.dxfId),
      priority: base_xform_default.toIntValue(attributes.priority),
      timePeriod: attributes.timePeriod,
      percent: base_xform_default.toBoolValue(attributes.percent),
      bottom: base_xform_default.toBoolValue(attributes.bottom),
      rank: base_xform_default.toIntValue(attributes.rank),
      aboveAverage: base_xform_default.toBoolValue(attributes.aboveAverage)
    };
  }
  onParserClose(name, parser) {
    switch (name) {
      case "dataBar":
      case "extLst":
      case "colorScale":
      case "iconSet":
        Object.assign(this.model, parser.model);
        break;
      case "formula":
        this.model.formulae = this.model.formulae || [];
        this.model.formulae.push(parser.model);
        break;
    }
  }
};
var cf_rule_xform_default = CfRuleXform;

// esm/xlsx/xform/sheet/cf/conditional-formatting-xform.js
var ConditionalFormattingXform = class extends composite_xform_default {
  constructor() {
    super();
    this.map = {
      cfRule: new cf_rule_xform_default()
    };
  }
  get tag() {
    return "conditionalFormatting";
  }
  render(xmlStream, model) {
    if (!model.rules.some(cf_rule_xform_default.isPrimitive)) {
      return;
    }
    xmlStream.openNode(this.tag, { sqref: model.ref });
    model.rules.forEach((rule) => {
      if (cf_rule_xform_default.isPrimitive(rule)) {
        rule.ref = model.ref;
        this.map.cfRule.render(xmlStream, rule);
      }
    });
    xmlStream.closeNode();
  }
  createNewModel({ attributes }) {
    return {
      ref: attributes.sqref,
      rules: []
    };
  }
  onParserClose(name, parser) {
    this.model.rules.push(parser.model);
  }
};
var conditional_formatting_xform_default = ConditionalFormattingXform;

// esm/xlsx/xform/sheet/cf/conditional-formattings-xform.js
var ConditionalFormattingsXform = class extends base_xform_default {
  constructor() {
    super();
    this.cfXform = new conditional_formatting_xform_default();
  }
  get tag() {
    return "conditionalFormatting";
  }
  reset() {
    this.model = [];
  }
  prepare(model, options) {
    let nextPriority = model.reduce((p, cf) => Math.max(p, ...cf.rules.map((rule) => rule.priority || 0)), 1);
    model.forEach((cf) => {
      cf.rules.forEach((rule) => {
        if (!rule.priority) {
          rule.priority = nextPriority++;
        }
        if (rule.style) {
          rule.dxfId = options.styles.addDxfStyle(rule.style);
        }
      });
    });
  }
  render(xmlStream, model) {
    model.forEach((cf) => {
      this.cfXform.render(xmlStream, cf);
    });
  }
  parseOpen(node) {
    if (this.parser) {
      this.parser.parseOpen(node);
      return true;
    }
    switch (node.name) {
      case "conditionalFormatting":
        this.parser = this.cfXform;
        this.parser.parseOpen(node);
        return true;
      default:
        return false;
    }
  }
  parseText(text) {
    if (this.parser) {
      this.parser.parseText(text);
    }
  }
  parseClose(name) {
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        this.model.push(this.parser.model);
        this.parser = void 0;
        return false;
      }
      return true;
    }
    return false;
  }
  reconcile(model, options) {
    model.forEach((cf) => {
      cf.rules.forEach((rule) => {
        if (rule.dxfId !== void 0) {
          rule.style = options.styles.getDxfStyle(rule.dxfId);
          delete rule.dxfId;
        }
      });
    });
  }
};
var conditional_formattings_xform_default = ConditionalFormattingsXform;

// esm/xlsx/xform/sheet/cf-ext/cf-rule-ext-xform.js
init_base_xform();

// esm/xlsx/xform/sheet/cf-ext/databar-ext-xform.js
init_base_xform();
init_color_xform();

// esm/xlsx/xform/sheet/cf-ext/f-ext-xform.js
init_base_xform();
var FExtXform = class extends base_xform_default {
  get tag() {
    return "xm:f";
  }
  render(xmlStream, model) {
    xmlStream.leafNode(this.tag, null, model);
  }
  parseOpen() {
    this.model = "";
  }
  parseText(text) {
    this.model += text;
  }
  parseClose(name) {
    return name !== this.tag;
  }
};
var f_ext_xform_default = FExtXform;

// esm/xlsx/xform/sheet/cf-ext/cfvo-ext-xform.js
var CfvoExtXform = class extends composite_xform_default {
  constructor() {
    super();
    this.map = {
      "xm:f": this.fExtXform = new f_ext_xform_default()
    };
  }
  get tag() {
    return "x14:cfvo";
  }
  render(xmlStream, model) {
    xmlStream.openNode(this.tag, {
      type: model.type
    });
    if (model.value !== void 0) {
      this.fExtXform.render(xmlStream, model.value);
    }
    xmlStream.closeNode();
  }
  createNewModel(node) {
    return {
      type: node.attributes.type
    };
  }
  onParserClose(name, parser) {
    switch (name) {
      case "xm:f":
        this.model.value = parser.model ? parseFloat(parser.model) : 0;
        break;
    }
  }
};
var cfvo_ext_xform_default = CfvoExtXform;

// esm/xlsx/xform/sheet/cf-ext/databar-ext-xform.js
var DatabarExtXform = class extends composite_xform_default {
  constructor() {
    super();
    this.map = {
      "x14:cfvo": this.cfvoXform = new cfvo_ext_xform_default(),
      "x14:borderColor": this.borderColorXform = new color_xform_default("x14:borderColor"),
      "x14:negativeBorderColor": this.negativeBorderColorXform = new color_xform_default("x14:negativeBorderColor"),
      "x14:negativeFillColor": this.negativeFillColorXform = new color_xform_default("x14:negativeFillColor"),
      "x14:axisColor": this.axisColorXform = new color_xform_default("x14:axisColor")
    };
  }
  static isExt(rule) {
    return !rule.gradient;
  }
  get tag() {
    return "x14:dataBar";
  }
  render(xmlStream, model) {
    xmlStream.openNode(this.tag, {
      minLength: base_xform_default.toIntAttribute(model.minLength, 0, true),
      maxLength: base_xform_default.toIntAttribute(model.maxLength, 100, true),
      border: base_xform_default.toBoolAttribute(model.border, false),
      gradient: base_xform_default.toBoolAttribute(model.gradient, true),
      negativeBarColorSameAsPositive: base_xform_default.toBoolAttribute(model.negativeBarColorSameAsPositive, true),
      negativeBarBorderColorSameAsPositive: base_xform_default.toBoolAttribute(model.negativeBarBorderColorSameAsPositive, true),
      axisPosition: base_xform_default.toAttribute(model.axisPosition, "auto"),
      direction: base_xform_default.toAttribute(model.direction, "leftToRight")
    });
    model.cfvo.forEach((cfvo) => {
      this.cfvoXform.render(xmlStream, cfvo);
    });
    this.borderColorXform.render(xmlStream, model.borderColor);
    this.negativeBorderColorXform.render(xmlStream, model.negativeBorderColor);
    this.negativeFillColorXform.render(xmlStream, model.negativeFillColor);
    this.axisColorXform.render(xmlStream, model.axisColor);
    xmlStream.closeNode();
  }
  createNewModel({ attributes }) {
    return {
      cfvo: [],
      minLength: base_xform_default.toIntValue(attributes.minLength, 0),
      maxLength: base_xform_default.toIntValue(attributes.maxLength, 100),
      border: base_xform_default.toBoolValue(attributes.border, false),
      gradient: base_xform_default.toBoolValue(attributes.gradient, true),
      negativeBarColorSameAsPositive: base_xform_default.toBoolValue(attributes.negativeBarColorSameAsPositive, true),
      negativeBarBorderColorSameAsPositive: base_xform_default.toBoolValue(attributes.negativeBarBorderColorSameAsPositive, true),
      axisPosition: base_xform_default.toStringValue(attributes.axisPosition, "auto"),
      direction: base_xform_default.toStringValue(attributes.direction, "leftToRight")
    };
  }
  onParserClose(name, parser) {
    const [, prop] = name.split(":");
    switch (prop) {
      case "cfvo":
        this.model.cfvo.push(parser.model);
        break;
      default:
        this.model[prop] = parser.model;
        break;
    }
  }
};
var databar_ext_xform_default = DatabarExtXform;

// esm/xlsx/xform/sheet/cf-ext/icon-set-ext-xform.js
init_base_xform();

// esm/xlsx/xform/sheet/cf-ext/cf-icon-ext-xform.js
init_base_xform();
var CfIconExtXform = class extends base_xform_default {
  get tag() {
    return "x14:cfIcon";
  }
  render(xmlStream, model) {
    xmlStream.leafNode(this.tag, {
      iconSet: model.iconSet,
      iconId: model.iconId
    });
  }
  parseOpen({ attributes }) {
    this.model = {
      iconSet: attributes.iconSet,
      iconId: base_xform_default.toIntValue(attributes.iconId)
    };
  }
  parseClose(name) {
    return name !== this.tag;
  }
};
var cf_icon_ext_xform_default = CfIconExtXform;

// esm/xlsx/xform/sheet/cf-ext/icon-set-ext-xform.js
var IconSetExtXform = class extends composite_xform_default {
  constructor() {
    super();
    this.map = {
      "x14:cfvo": this.cfvoXform = new cfvo_ext_xform_default(),
      "x14:cfIcon": this.cfIconXform = new cf_icon_ext_xform_default()
    };
  }
  get tag() {
    return "x14:iconSet";
  }
  render(xmlStream, model) {
    xmlStream.openNode(this.tag, {
      iconSet: base_xform_default.toStringAttribute(model.iconSet),
      reverse: base_xform_default.toBoolAttribute(model.reverse, false),
      showValue: base_xform_default.toBoolAttribute(model.showValue, true),
      custom: base_xform_default.toBoolAttribute(model.icons, false)
    });
    model.cfvo.forEach((cfvo) => {
      this.cfvoXform.render(xmlStream, cfvo);
    });
    if (model.icons) {
      model.icons.forEach((icon, i) => {
        icon.iconId = i;
        this.cfIconXform.render(xmlStream, icon);
      });
    }
    xmlStream.closeNode();
  }
  createNewModel({ attributes }) {
    return {
      cfvo: [],
      iconSet: base_xform_default.toStringValue(attributes.iconSet, "3TrafficLights"),
      reverse: base_xform_default.toBoolValue(attributes.reverse, false),
      showValue: base_xform_default.toBoolValue(attributes.showValue, true)
    };
  }
  onParserClose(name, parser) {
    const [, prop] = name.split(":");
    switch (prop) {
      case "cfvo":
        this.model.cfvo.push(parser.model);
        break;
      case "cfIcon":
        if (!this.model.icons) {
          this.model.icons = [];
        }
        this.model.icons.push(parser.model);
        break;
      default:
        this.model[prop] = parser.model;
        break;
    }
  }
};
var icon_set_ext_xform_default = IconSetExtXform;

// esm/xlsx/xform/sheet/cf-ext/cf-rule-ext-xform.js
var uuidv4 = crypto.randomUUID();
var extIcons2 = {
  "3Triangles": true,
  "3Stars": true,
  "5Boxes": true
};
var CfRuleExtXform = class _CfRuleExtXform extends composite_xform_default {
  constructor() {
    super();
    this.map = {
      "x14:dataBar": this.databarXform = new databar_ext_xform_default(),
      "x14:iconSet": this.iconSetXform = new icon_set_ext_xform_default()
    };
  }
  get tag() {
    return "x14:cfRule";
  }
  static isExt(rule) {
    if (rule.type === "dataBar") {
      return databar_ext_xform_default.isExt(rule);
    }
    if (rule.type === "iconSet") {
      if (rule.custom || extIcons2[rule.iconSet]) {
        return true;
      }
    }
    return false;
  }
  prepare(model) {
    if (_CfRuleExtXform.isExt(model)) {
      model.x14Id = `{${uuidv4()}}`.toUpperCase();
    }
  }
  render(xmlStream, model) {
    if (!_CfRuleExtXform.isExt(model)) {
      return;
    }
    switch (model.type) {
      case "dataBar":
        this.renderDataBar(xmlStream, model);
        break;
      case "iconSet":
        this.renderIconSet(xmlStream, model);
        break;
    }
  }
  renderDataBar(xmlStream, model) {
    xmlStream.openNode(this.tag, {
      type: "dataBar",
      id: model.x14Id
    });
    this.databarXform.render(xmlStream, model);
    xmlStream.closeNode();
  }
  renderIconSet(xmlStream, model) {
    xmlStream.openNode(this.tag, {
      type: "iconSet",
      priority: model.priority,
      id: model.x14Id || `{${uuidv4()}}`
    });
    this.iconSetXform.render(xmlStream, model);
    xmlStream.closeNode();
  }
  createNewModel({ attributes }) {
    return {
      type: attributes.type,
      x14Id: attributes.id,
      priority: base_xform_default.toIntValue(attributes.priority)
    };
  }
  onParserClose(name, parser) {
    Object.assign(this.model, parser.model);
  }
};
var cf_rule_ext_xform_default = CfRuleExtXform;

// esm/xlsx/xform/sheet/cf-ext/sqref-ext-xform.js
init_base_xform();
var SqrefExtXform = class extends base_xform_default {
  get tag() {
    return "xm:sqref";
  }
  render(xmlStream, model) {
    xmlStream.leafNode(this.tag, null, model);
  }
  parseOpen() {
    this.model = "";
  }
  parseText(text) {
    this.model += text;
  }
  parseClose(name) {
    return name !== this.tag;
  }
};
var sqref_ext_xform_default = SqrefExtXform;

// esm/xlsx/xform/sheet/cf-ext/conditional-formatting-ext-xform.js
var ConditionalFormattingExtXform = class extends composite_xform_default {
  constructor() {
    super();
    this.map = {
      "xm:sqref": this.sqRef = new sqref_ext_xform_default(),
      "x14:cfRule": this.cfRule = new cf_rule_ext_xform_default()
    };
  }
  get tag() {
    return "x14:conditionalFormatting";
  }
  prepare(model, options) {
    model.rules.forEach((rule) => {
      this.cfRule.prepare(rule, options);
    });
  }
  render(xmlStream, model) {
    if (!model.rules.some(cf_rule_ext_xform_default.isExt)) {
      return;
    }
    xmlStream.openNode(this.tag, {
      "xmlns:xm": "http://schemas.microsoft.com/office/excel/2006/main"
    });
    model.rules.filter(cf_rule_ext_xform_default.isExt).forEach((rule) => this.cfRule.render(xmlStream, rule));
    this.sqRef.render(xmlStream, model.ref);
    xmlStream.closeNode();
  }
  createNewModel() {
    return {
      rules: []
    };
  }
  onParserClose(name, parser) {
    switch (name) {
      case "xm:sqref":
        this.model.ref = parser.model;
        break;
      case "x14:cfRule":
        this.model.rules.push(parser.model);
        break;
    }
  }
};
var conditional_formatting_ext_xform_default = ConditionalFormattingExtXform;

// esm/xlsx/xform/sheet/cf-ext/conditional-formattings-ext-xform.js
var ConditionalFormattingsExtXform = class extends composite_xform_default {
  constructor() {
    super();
    this.map = {
      "x14:conditionalFormatting": this.cfXform = new conditional_formatting_ext_xform_default()
    };
  }
  get tag() {
    return "x14:conditionalFormattings";
  }
  hasContent(model) {
    if (model.hasExtContent === void 0) {
      model.hasExtContent = model.some((cf) => cf.rules.some(cf_rule_ext_xform_default.isExt));
    }
    return model.hasExtContent;
  }
  prepare(model, options) {
    model.forEach((cf) => {
      this.cfXform.prepare(cf, options);
    });
  }
  render(xmlStream, model) {
    if (this.hasContent(model)) {
      xmlStream.openNode(this.tag);
      model.forEach((cf) => this.cfXform.render(xmlStream, cf));
      xmlStream.closeNode();
    }
  }
  createNewModel() {
    return [];
  }
  onParserClose(name, parser) {
    this.model.push(parser.model);
  }
};
var conditional_formattings_ext_xform_default = ConditionalFormattingsExtXform;

// esm/xlsx/xform/sheet/ext-lst-xform.js
var ExtXform2 = class extends composite_xform_default {
  constructor() {
    super();
    this.map = {
      "x14:conditionalFormattings": this.conditionalFormattings = new conditional_formattings_ext_xform_default()
    };
  }
  get tag() {
    return "ext";
  }
  hasContent(model) {
    return this.conditionalFormattings.hasContent(model.conditionalFormattings);
  }
  prepare(model, options) {
    this.conditionalFormattings.prepare(model.conditionalFormattings, options);
  }
  render(xmlStream, model) {
    xmlStream.openNode("ext", {
      uri: "{78C0D931-6437-407d-A8EE-F0AAD7539E65}",
      "xmlns:x14": "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main"
    });
    this.conditionalFormattings.render(xmlStream, model.conditionalFormattings);
    xmlStream.closeNode();
  }
  createNewModel() {
    return {};
  }
  onParserClose(name, parser) {
    this.model[name] = parser.model;
  }
};
var ExtLstXform = class extends composite_xform_default {
  constructor() {
    super();
    this.map = {
      ext: this.ext = new ExtXform2()
    };
  }
  get tag() {
    return "extLst";
  }
  prepare(model, options) {
    this.ext.prepare(model, options);
  }
  hasContent(model) {
    return this.ext.hasContent(model);
  }
  render(xmlStream, model) {
    if (!this.hasContent(model)) {
      return;
    }
    xmlStream.openNode("extLst");
    this.ext.render(xmlStream, model);
    xmlStream.closeNode();
  }
  createNewModel() {
    return {};
  }
  onParserClose(name, parser) {
    Object.assign(this.model, parser.model);
  }
};
var ext_lst_xform_default = ExtLstXform;

// esm/xlsx/xform/sheet/worksheet-xform.js
var mergeRule = (rule, extRule) => {
  Object.keys(extRule).forEach((key) => {
    const value = rule[key];
    const extValue = extRule[key];
    if (value === void 0 && extValue !== void 0) {
      rule[key] = extValue;
    }
  });
};
var mergeConditionalFormattings = (model, extModel) => {
  if (!extModel || !extModel.length) {
    return model;
  }
  if (!model || !model.length) {
    return extModel;
  }
  const cfMap = {};
  const ruleMap = {};
  model.forEach((cf) => {
    cfMap[cf.ref] = cf;
    cf.rules.forEach((rule) => {
      const { x14Id } = rule;
      if (x14Id) {
        ruleMap[x14Id] = rule;
      }
    });
  });
  extModel.forEach((extCf) => {
    extCf.rules.forEach((extRule) => {
      const rule = ruleMap[extRule.x14Id];
      if (rule) {
        mergeRule(rule, extRule);
      } else if (cfMap[extCf.ref]) {
        cfMap[extCf.ref].rules.push(extRule);
      } else {
        model.push({
          ref: extCf.ref,
          rules: [extRule]
        });
      }
    });
  });
  return model;
};
var WorkSheetXform = class _WorkSheetXform extends base_xform_default {
  constructor(options) {
    super();
    const { maxRows, maxCols, ignoreNodes } = options || {};
    this.ignoreNodes = ignoreNodes || [];
    this.map = {
      sheetPr: new sheet_properties_xform_default(),
      dimension: new dimension_xform_default(),
      sheetViews: new list_xform_default({
        tag: "sheetViews",
        count: false,
        childXform: new sheet_view_xform_default()
      }),
      sheetFormatPr: new sheet_format_properties_xform_default(),
      cols: new list_xform_default({ tag: "cols", count: false, childXform: new col_xform_default() }),
      sheetData: new list_xform_default({
        tag: "sheetData",
        count: false,
        empty: true,
        childXform: new row_xform_default({ maxItems: maxCols }),
        maxItems: maxRows
      }),
      autoFilter: new auto_filter_xform_default(),
      mergeCells: new list_xform_default({ tag: "mergeCells", count: true, childXform: new merge_cell_xform_default() }),
      rowBreaks: new row_breaks_xform_default(),
      hyperlinks: new list_xform_default({
        tag: "hyperlinks",
        count: false,
        childXform: new hyperlink_xform_default()
      }),
      pageMargins: new page_margins_xform_default(),
      dataValidations: new data_validations_xform_default(),
      pageSetup: new page_setup_xform_default(),
      headerFooter: new header_footer_xform_default(),
      printOptions: new print_options_xform_default(),
      picture: new picture_xform_default(),
      drawing: new drawing_xform_default(),
      sheetProtection: new sheet_protection_xform_default(),
      tableParts: new list_xform_default({ tag: "tableParts", count: true, childXform: new table_part_xform_default() }),
      conditionalFormatting: new conditional_formattings_xform_default(),
      extLst: new ext_lst_xform_default()
    };
  }
  prepare(model, options) {
    options.merges = new merges_default();
    model.hyperlinks = options.hyperlinks = [];
    model.comments = options.comments = [];
    options.formulae = {};
    options.siFormulae = 0;
    this.map.cols.prepare(model.cols, options);
    this.map.sheetData.prepare(model.rows, options);
    this.map.conditionalFormatting.prepare(model.conditionalFormattings, options);
    model.mergeCells = options.merges.mergeCells;
    const rels = model.rels = [];
    function nextRid(r) {
      return `rId${r.length + 1}`;
    }
    model.hyperlinks.forEach((hyperlink) => {
      const rId = nextRid(rels);
      hyperlink.rId = rId;
      rels.push({
        Id: rId,
        Type: rel_type_default.Hyperlink,
        Target: hyperlink.target,
        TargetMode: "External"
      });
    });
    if (model.comments.length > 0) {
      const comment = {
        Id: nextRid(rels),
        Type: rel_type_default.Comments,
        Target: `../comments${model.id}.xml`
      };
      rels.push(comment);
      const vmlDrawing = {
        Id: nextRid(rels),
        Type: rel_type_default.VmlDrawing,
        Target: `../drawings/vmlDrawing${model.id}.vml`
      };
      rels.push(vmlDrawing);
      model.comments.forEach((item) => {
        item.refAddress = decodeAddress(item.ref);
      });
      options.commentRefs.push({
        commentName: `comments${model.id}`,
        vmlDrawing: `vmlDrawing${model.id}`
      });
    }
    const drawingRelsHash = [];
    let bookImage;
    model.media.forEach((medium) => {
      if (medium.type === "background") {
        const rId = nextRid(rels);
        bookImage = options.media[medium.imageId];
        rels.push({
          Id: rId,
          Type: rel_type_default.Image,
          Target: `../media/${bookImage.name}.${bookImage.extension}`
        });
        model.background = {
          rId
        };
        model.image = options.media[medium.imageId];
      } else if (medium.type === "image") {
        let { drawing } = model;
        bookImage = options.media[medium.imageId];
        if (!drawing) {
          drawing = model.drawing = {
            rId: nextRid(rels),
            name: `drawing${++options.drawingsCount}`,
            anchors: [],
            rels: []
          };
          options.drawings.push(drawing);
          rels.push({
            Id: drawing.rId,
            Type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing",
            Target: `../drawings/${drawing.name}.xml`
          });
        }
        let rIdImage = this.preImageId === medium.imageId ? drawingRelsHash[medium.imageId] : drawingRelsHash[drawing.rels.length];
        if (!rIdImage) {
          rIdImage = nextRid(drawing.rels);
          drawingRelsHash[drawing.rels.length] = rIdImage;
          drawing.rels.push({
            Id: rIdImage,
            Type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",
            Target: `../media/${bookImage.name}.${bookImage.extension}`
          });
        }
        const anchor = {
          picture: {
            rId: rIdImage
          },
          range: medium.range
        };
        if (medium.hyperlinks && medium.hyperlinks.hyperlink) {
          const rIdHyperLink = nextRid(drawing.rels);
          drawingRelsHash[drawing.rels.length] = rIdHyperLink;
          anchor.picture.hyperlinks = {
            tooltip: medium.hyperlinks.tooltip,
            rId: rIdHyperLink
          };
          drawing.rels.push({
            Id: rIdHyperLink,
            Type: rel_type_default.Hyperlink,
            Target: medium.hyperlinks.hyperlink,
            TargetMode: "External"
          });
        }
        this.preImageId = medium.imageId;
        drawing.anchors.push(anchor);
      }
    });
    model.tables.forEach((table) => {
      const rId = nextRid(rels);
      table.rId = rId;
      rels.push({
        Id: rId,
        Type: rel_type_default.Table,
        Target: `../tables/${table.target}`
      });
      table.columns.forEach((column) => {
        const { style } = column;
        if (style) {
          column.dxfId = options.styles.addDxfStyle(style);
        }
      });
    });
    if ((model.pivotTables || []).length) {
      rels.push({
        Id: nextRid(rels),
        Type: rel_type_default.PivotTable,
        Target: "../pivotTables/pivotTable1.xml"
      });
    }
    this.map.extLst.prepare(model, options);
  }
  render(xmlStream, model) {
    xmlStream.openXml(xml_stream_default.StdDocAttributes);
    xmlStream.openNode("worksheet", _WorkSheetXform.WORKSHEET_ATTRIBUTES);
    const sheetFormatPropertiesModel = model.properties ? {
      defaultRowHeight: model.properties.defaultRowHeight,
      dyDescent: model.properties.dyDescent,
      outlineLevelCol: model.properties.outlineLevelCol,
      outlineLevelRow: model.properties.outlineLevelRow
    } : void 0;
    if (model.properties && model.properties.defaultColWidth) {
      sheetFormatPropertiesModel.defaultColWidth = model.properties.defaultColWidth;
    }
    const sheetPropertiesModel = {
      outlineProperties: model.properties && model.properties.outlineProperties,
      tabColor: model.properties && model.properties.tabColor,
      pageSetup: model.pageSetup && model.pageSetup.fitToPage ? {
        fitToPage: model.pageSetup.fitToPage
      } : void 0
    };
    const pageMarginsModel = model.pageSetup && model.pageSetup.margins;
    const printOptionsModel = {
      showRowColHeaders: model.pageSetup && model.pageSetup.showRowColHeaders,
      showGridLines: model.pageSetup && model.pageSetup.showGridLines,
      horizontalCentered: model.pageSetup && model.pageSetup.horizontalCentered,
      verticalCentered: model.pageSetup && model.pageSetup.verticalCentered
    };
    const sheetProtectionModel = model.sheetProtection;
    this.map.sheetPr.render(xmlStream, sheetPropertiesModel);
    this.map.dimension.render(xmlStream, model.dimensions);
    this.map.sheetViews.render(xmlStream, model.views);
    this.map.sheetFormatPr.render(xmlStream, sheetFormatPropertiesModel);
    this.map.cols.render(xmlStream, model.cols);
    this.map.sheetData.render(xmlStream, model.rows);
    this.map.sheetProtection.render(xmlStream, sheetProtectionModel);
    this.map.autoFilter.render(xmlStream, model.autoFilter);
    this.map.mergeCells.render(xmlStream, model.mergeCells);
    this.map.conditionalFormatting.render(xmlStream, model.conditionalFormattings);
    this.map.dataValidations.render(xmlStream, model.dataValidations);
    this.map.hyperlinks.render(xmlStream, model.hyperlinks);
    this.map.printOptions.render(xmlStream, printOptionsModel);
    this.map.pageMargins.render(xmlStream, pageMarginsModel);
    this.map.pageSetup.render(xmlStream, model.pageSetup);
    this.map.headerFooter.render(xmlStream, model.headerFooter);
    this.map.rowBreaks.render(xmlStream, model.rowBreaks);
    this.map.drawing.render(xmlStream, model.drawing);
    this.map.picture.render(xmlStream, model.background);
    this.map.tableParts.render(xmlStream, model.tables);
    this.map.extLst.render(xmlStream, model);
    if (model.rels) {
      model.rels.forEach((rel) => {
        if (rel.Type === rel_type_default.VmlDrawing) {
          xmlStream.leafNode("legacyDrawing", { "r:id": rel.Id });
        }
      });
    }
    xmlStream.closeNode();
  }
  parseOpen(node) {
    if (this.parser) {
      this.parser.parseOpen(node);
      return true;
    }
    if (node.name === "worksheet") {
      each(this.map, (xform) => {
        xform.reset();
      });
      return true;
    }
    if (this.map[node.name] && !this.ignoreNodes.includes(node.name)) {
      this.parser = this.map[node.name];
      this.parser.parseOpen(node);
    }
    return true;
  }
  parseText(text) {
    if (this.parser) {
      this.parser.parseText(text);
    }
  }
  parseClose(name) {
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        this.parser = void 0;
      }
      return true;
    }
    switch (name) {
      case "worksheet": {
        const properties = this.map.sheetFormatPr.model || {};
        if (this.map.sheetPr.model && this.map.sheetPr.model.tabColor) {
          properties.tabColor = this.map.sheetPr.model.tabColor;
        }
        if (this.map.sheetPr.model && this.map.sheetPr.model.outlineProperties) {
          properties.outlineProperties = this.map.sheetPr.model.outlineProperties;
        }
        const sheetProperties = {
          fitToPage: this.map.sheetPr.model && this.map.sheetPr.model.pageSetup && this.map.sheetPr.model.pageSetup.fitToPage || false,
          margins: this.map.pageMargins.model
        };
        const pageSetup = Object.assign(sheetProperties, this.map.pageSetup.model, this.map.printOptions.model);
        const conditionalFormattings = mergeConditionalFormattings(this.map.conditionalFormatting.model, this.map.extLst.model && this.map.extLst.model["x14:conditionalFormattings"]);
        this.model = {
          dimensions: this.map.dimension.model,
          cols: this.map.cols.model,
          rows: this.map.sheetData.model,
          mergeCells: this.map.mergeCells.model,
          hyperlinks: this.map.hyperlinks.model,
          dataValidations: this.map.dataValidations.model,
          properties,
          views: this.map.sheetViews.model,
          pageSetup,
          headerFooter: this.map.headerFooter.model,
          background: this.map.picture.model,
          drawing: this.map.drawing.model,
          tables: this.map.tableParts.model,
          conditionalFormattings
        };
        if (this.map.autoFilter.model) {
          this.model.autoFilter = this.map.autoFilter.model;
        }
        if (this.map.sheetProtection.model) {
          this.model.sheetProtection = this.map.sheetProtection.model;
        }
        return false;
      }
      default:
        return true;
    }
  }
  reconcile(model, options) {
    const rels = (model.relationships || []).reduce((h, rel) => {
      h[rel.Id] = rel;
      if (rel.Type === rel_type_default.Comments) {
        model.comments = options.comments[rel.Target].comments;
      }
      if (rel.Type === rel_type_default.VmlDrawing && model.comments && model.comments.length) {
        const vmlComment = options.vmlDrawings[rel.Target].comments;
        model.comments.forEach((comment, index) => {
          comment.note = Object.assign({}, comment.note, vmlComment[index]);
        });
      }
      return h;
    }, {});
    options.commentsMap = (model.comments || []).reduce((h, comment) => {
      if (comment.ref) {
        h[comment.ref] = comment;
      }
      return h;
    }, {});
    options.hyperlinkMap = (model.hyperlinks || []).reduce((h, hyperlink) => {
      if (hyperlink.rId) {
        h[hyperlink.address] = rels[hyperlink.rId].Target;
      }
      return h;
    }, {});
    options.formulae = {};
    model.rows = model.rows && model.rows.filter(Boolean) || [];
    model.rows.forEach((row) => {
      row.cells = row.cells && row.cells.filter(Boolean) || [];
    });
    this.map.cols.reconcile(model.cols, options);
    this.map.sheetData.reconcile(model.rows, options);
    this.map.conditionalFormatting.reconcile(model.conditionalFormattings, options);
    model.media = [];
    if (model.drawing) {
      const drawingRel = rels[model.drawing.rId];
      const match = drawingRel.Target.match(/\/drawings\/([a-zA-Z0-9]+)[.][a-zA-Z]{3,4}$/);
      if (match) {
        const drawingName = match[1];
        const drawing = options.drawings[drawingName];
        drawing.anchors.forEach((anchor) => {
          if (anchor.medium) {
            const image = {
              type: "image",
              imageId: anchor.medium.index,
              range: anchor.range,
              hyperlinks: anchor.picture.hyperlinks
            };
            model.media.push(image);
          }
        });
      }
    }
    const backgroundRel = model.background && rels[model.background.rId];
    if (backgroundRel) {
      const target = backgroundRel.Target.split("/media/")[1];
      const imageId = options.mediaIndex && options.mediaIndex[target];
      if (imageId !== void 0) {
        model.media.push({
          type: "background",
          imageId
        });
      }
    }
    model.tables = (model.tables || []).map((tablePart) => {
      const rel = rels[tablePart.rId];
      return options.tables[rel.Target];
    });
    delete model.relationships;
    delete model.hyperlinks;
    delete model.comments;
  }
};
WorkSheetXform.WORKSHEET_ATTRIBUTES = {
  xmlns: "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
  "xmlns:r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
  "xmlns:mc": "http://schemas.openxmlformats.org/markup-compatibility/2006",
  "mc:Ignorable": "x14ac",
  "xmlns:x14ac": "http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac"
};
var worksheet_xform_default = WorkSheetXform;

// esm/xlsx/xform/table/table-xform.js
init_xml_stream();
init_base_xform();

// esm/xlsx/xform/table/auto-filter-xform.js
init_base_xform();

// esm/xlsx/xform/table/filter-column-xform.js
init_base_xform();

// esm/xlsx/xform/table/custom-filter-xform.js
init_base_xform();
var CustomFilterXform = class extends base_xform_default {
  get tag() {
    return "customFilter";
  }
  render(xmlStream, model) {
    xmlStream.leafNode(this.tag, {
      val: model.val,
      operator: model.operator
    });
  }
  parseOpen(node) {
    if (node.name === this.tag) {
      this.model = {
        val: node.attributes.val,
        operator: node.attributes.operator
      };
      return true;
    }
    return false;
  }
  parseText() {
  }
  parseClose() {
    return false;
  }
};
var custom_filter_xform_default = CustomFilterXform;

// esm/xlsx/xform/table/filter-xform.js
init_base_xform();
var FilterXform = class extends base_xform_default {
  get tag() {
    return "filter";
  }
  render(xmlStream, model) {
    xmlStream.leafNode(this.tag, {
      val: model.val
    });
  }
  parseOpen(node) {
    if (node.name === this.tag) {
      this.model = {
        val: node.attributes.val
      };
      return true;
    }
    return false;
  }
  parseText() {
  }
  parseClose() {
    return false;
  }
};
var filter_xform_default = FilterXform;

// esm/xlsx/xform/table/filter-column-xform.js
var FilterColumnXform = class extends base_xform_default {
  constructor() {
    super();
    this.map = {
      customFilters: new list_xform_default({
        tag: "customFilters",
        count: false,
        empty: true,
        childXform: new custom_filter_xform_default()
      }),
      filters: new list_xform_default({
        tag: "filters",
        count: false,
        empty: true,
        childXform: new filter_xform_default()
      })
    };
  }
  get tag() {
    return "filterColumn";
  }
  prepare(model, options) {
    model.colId = options.index.toString();
  }
  render(xmlStream, model) {
    if (model.customFilters) {
      xmlStream.openNode(this.tag, {
        colId: model.colId,
        hiddenButton: model.filterButton ? "0" : "1"
      });
      this.map.customFilters.render(xmlStream, model.customFilters);
      xmlStream.closeNode();
      return true;
    }
    xmlStream.leafNode(this.tag, {
      colId: model.colId,
      hiddenButton: model.filterButton ? "0" : "1"
    });
    return true;
  }
  parseOpen(node) {
    if (this.parser) {
      this.parser.parseOpen(node);
      return true;
    }
    const { attributes } = node;
    switch (node.name) {
      case this.tag:
        this.model = {
          filterButton: attributes.hiddenButton === "0"
        };
        return true;
      default:
        this.parser = this.map[node.name];
        if (this.parser) {
          this.parseOpen(node);
          return true;
        }
        throw new Error(`Unexpected xml node in parseOpen: ${JSON.stringify(node)}`);
    }
  }
  parseText() {
  }
  parseClose(name) {
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        this.parser = void 0;
      }
      return true;
    }
    switch (name) {
      case this.tag:
        this.model.customFilters = this.map.customFilters.model;
        return false;
      default:
        return true;
    }
  }
};
var filter_column_xform_default = FilterColumnXform;

// esm/xlsx/xform/table/auto-filter-xform.js
var AutoFilterXform2 = class extends base_xform_default {
  constructor() {
    super();
    this.map = {
      filterColumn: new filter_column_xform_default()
    };
  }
  get tag() {
    return "autoFilter";
  }
  prepare(model) {
    model.columns.forEach((column, index) => {
      this.map.filterColumn.prepare(column, { index });
    });
  }
  render(xmlStream, model) {
    xmlStream.openNode(this.tag, { ref: model.autoFilterRef });
    model.columns.forEach((column) => {
      this.map.filterColumn.render(xmlStream, column);
    });
    xmlStream.closeNode();
    return true;
  }
  parseOpen(node) {
    if (this.parser) {
      this.parser.parseOpen(node);
      return true;
    }
    switch (node.name) {
      case this.tag:
        this.model = {
          autoFilterRef: node.attributes.ref,
          columns: []
        };
        return true;
      default:
        this.parser = this.map[node.name];
        if (this.parser) {
          this.parseOpen(node);
          return true;
        }
        throw new Error(`Unexpected xml node in parseOpen: ${JSON.stringify(node)}`);
    }
  }
  parseText(text) {
    if (this.parser) {
      this.parser.parseText(text);
    }
  }
  parseClose(name) {
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        this.model.columns.push(this.parser.model);
        this.parser = void 0;
      }
      return true;
    }
    switch (name) {
      case this.tag:
        return false;
      default:
        throw new Error(`Unexpected xml node in parseClose: ${name}`);
    }
  }
};
var auto_filter_xform_default2 = AutoFilterXform2;

// esm/xlsx/xform/table/table-column-xform.js
init_base_xform();
var TableColumnXform = class extends base_xform_default {
  get tag() {
    return "tableColumn";
  }
  prepare(model, options) {
    model.id = options.index + 1;
  }
  render(xmlStream, model) {
    xmlStream.leafNode(this.tag, {
      id: model.id.toString(),
      name: model.name,
      totalsRowLabel: model.totalsRowLabel,
      totalsRowFunction: model.totalsRowFunction,
      dxfId: model.dxfId
    });
    return true;
  }
  parseOpen(node) {
    if (node.name === this.tag) {
      const { attributes } = node;
      this.model = {
        name: attributes.name,
        totalsRowLabel: attributes.totalsRowLabel,
        totalsRowFunction: attributes.totalsRowFunction,
        dxfId: attributes.dxfId
      };
      return true;
    }
    return false;
  }
  parseText() {
  }
  parseClose() {
    return false;
  }
};
var table_column_xform_default = TableColumnXform;

// esm/xlsx/xform/table/table-style-info-xform.js
init_base_xform();
var TableStyleInfoXform = class extends base_xform_default {
  get tag() {
    return "tableStyleInfo";
  }
  render(xmlStream, model) {
    xmlStream.leafNode(this.tag, {
      name: model.theme ? model.theme : void 0,
      showFirstColumn: model.showFirstColumn ? "1" : "0",
      showLastColumn: model.showLastColumn ? "1" : "0",
      showRowStripes: model.showRowStripes ? "1" : "0",
      showColumnStripes: model.showColumnStripes ? "1" : "0"
    });
    return true;
  }
  parseOpen(node) {
    if (node.name === this.tag) {
      const { attributes } = node;
      this.model = {
        theme: attributes.name ? attributes.name : null,
        showFirstColumn: attributes.showFirstColumn === "1",
        showLastColumn: attributes.showLastColumn === "1",
        showRowStripes: attributes.showRowStripes === "1",
        showColumnStripes: attributes.showColumnStripes === "1"
      };
      return true;
    }
    return false;
  }
  parseText() {
  }
  parseClose() {
    return false;
  }
};
var table_style_info_xform_default = TableStyleInfoXform;

// esm/xlsx/xform/table/table-xform.js
var TableXform = class _TableXform extends base_xform_default {
  constructor() {
    super();
    this.map = {
      autoFilter: new auto_filter_xform_default2(),
      tableColumns: new list_xform_default({
        tag: "tableColumns",
        count: true,
        empty: true,
        childXform: new table_column_xform_default()
      }),
      tableStyleInfo: new table_style_info_xform_default()
    };
  }
  prepare(model, options) {
    this.map.autoFilter.prepare(model);
    this.map.tableColumns.prepare(model.columns, options);
  }
  get tag() {
    return "table";
  }
  render(xmlStream, model) {
    xmlStream.openXml(xml_stream_default.StdDocAttributes);
    xmlStream.openNode(this.tag, {
      ..._TableXform.TABLE_ATTRIBUTES,
      id: model.id,
      name: model.name,
      displayName: model.displayName || model.name,
      ref: model.tableRef,
      totalsRowCount: model.totalsRow ? "1" : void 0,
      totalsRowShown: model.totalsRow ? void 0 : "1",
      headerRowCount: model.headerRow ? "1" : "0"
    });
    this.map.autoFilter.render(xmlStream, model);
    this.map.tableColumns.render(xmlStream, model.columns);
    this.map.tableStyleInfo.render(xmlStream, model.style);
    xmlStream.closeNode();
  }
  parseOpen(node) {
    if (this.parser) {
      this.parser.parseOpen(node);
      return true;
    }
    const { name, attributes } = node;
    switch (name) {
      case this.tag:
        this.reset();
        this.model = {
          name: attributes.name,
          displayName: attributes.displayName || attributes.name,
          tableRef: attributes.ref,
          totalsRow: attributes.totalsRowCount === "1",
          headerRow: attributes.headerRowCount === "1"
        };
        break;
      default:
        this.parser = this.map[node.name];
        if (this.parser) {
          this.parser.parseOpen(node);
        }
        break;
    }
    return true;
  }
  parseText(text) {
    if (this.parser) {
      this.parser.parseText(text);
    }
  }
  parseClose(name) {
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        this.parser = void 0;
      }
      return true;
    }
    switch (name) {
      case this.tag:
        this.model.columns = this.map.tableColumns.model;
        if (this.map.autoFilter.model) {
          this.model.autoFilterRef = this.map.autoFilter.model.autoFilterRef;
          this.map.autoFilter.model.columns.forEach((column, index) => {
            this.model.columns[index].filterButton = column.filterButton;
          });
        }
        this.model.style = this.map.tableStyleInfo.model;
        return false;
      default:
        return true;
    }
  }
  reconcile(model, options) {
    model.columns.forEach((column) => {
      if (column.dxfId !== void 0) {
        column.style = options.styles.getDxfStyle(column.dxfId);
      }
    });
  }
};
TableXform.TABLE_ATTRIBUTES = {
  xmlns: "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
  "xmlns:mc": "http://schemas.openxmlformats.org/markup-compatibility/2006",
  "mc:Ignorable": "xr xr3",
  "xmlns:xr": "http://schemas.microsoft.com/office/spreadsheetml/2014/revision",
  "xmlns:xr3": "http://schemas.microsoft.com/office/spreadsheetml/2016/revision3"
  // 'xr:uid': '{00000000-000C-0000-FFFF-FFFF00000000}',
};
var table_xform_default = TableXform;

// esm/xlsx/xml/theme1.js
var theme1_default = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme"> <a:themeElements> <a:clrScheme name="Office"> <a:dk1> <a:sysClr val="windowText" lastClr="000000"/> </a:dk1> <a:lt1> <a:sysClr val="window" lastClr="FFFFFF"/> </a:lt1> <a:dk2> <a:srgbClr val="1F497D"/> </a:dk2> <a:lt2> <a:srgbClr val="EEECE1"/> </a:lt2> <a:accent1> <a:srgbClr val="4F81BD"/> </a:accent1> <a:accent2> <a:srgbClr val="C0504D"/> </a:accent2> <a:accent3> <a:srgbClr val="9BBB59"/> </a:accent3> <a:accent4> <a:srgbClr val="8064A2"/> </a:accent4> <a:accent5> <a:srgbClr val="4BACC6"/> </a:accent5> <a:accent6> <a:srgbClr val="F79646"/> </a:accent6> <a:hlink> <a:srgbClr val="0000FF"/> </a:hlink> <a:folHlink> <a:srgbClr val="800080"/> </a:folHlink> </a:clrScheme> <a:fontScheme name="Office"> <a:majorFont> <a:latin typeface="Cambria"/> <a:ea typeface=""/> <a:cs typeface=""/> <a:font script="Jpan" typeface="\uFF2D\uFF33 \uFF30\u30B4\u30B7\u30C3\u30AF"/> <a:font script="Hang" typeface="\uB9D1\uC740 \uACE0\uB515"/> <a:font script="Hans" typeface="\u5B8B\u4F53"/> <a:font script="Hant" typeface="\u65B0\u7D30\u660E\u9AD4"/> <a:font script="Arab" typeface="Times New Roman"/> <a:font script="Hebr" typeface="Times New Roman"/> <a:font script="Thai" typeface="Tahoma"/> <a:font script="Ethi" typeface="Nyala"/> <a:font script="Beng" typeface="Vrinda"/> <a:font script="Gujr" typeface="Shruti"/> <a:font script="Khmr" typeface="MoolBoran"/> <a:font script="Knda" typeface="Tunga"/> <a:font script="Guru" typeface="Raavi"/> <a:font script="Cans" typeface="Euphemia"/> <a:font script="Cher" typeface="Plantagenet Cherokee"/> <a:font script="Yiii" typeface="Microsoft Yi Baiti"/> <a:font script="Tibt" typeface="Microsoft Himalaya"/> <a:font script="Thaa" typeface="MV Boli"/> <a:font script="Deva" typeface="Mangal"/> <a:font script="Telu" typeface="Gautami"/> <a:font script="Taml" typeface="Latha"/> <a:font script="Syrc" typeface="Estrangelo Edessa"/> <a:font script="Orya" typeface="Kalinga"/> <a:font script="Mlym" typeface="Kartika"/> <a:font script="Laoo" typeface="DokChampa"/> <a:font script="Sinh" typeface="Iskoola Pota"/> <a:font script="Mong" typeface="Mongolian Baiti"/> <a:font script="Viet" typeface="Times New Roman"/> <a:font script="Uigh" typeface="Microsoft Uighur"/> <a:font script="Geor" typeface="Sylfaen"/> </a:majorFont> <a:minorFont> <a:latin typeface="Calibri"/> <a:ea typeface=""/> <a:cs typeface=""/> <a:font script="Jpan" typeface="\uFF2D\uFF33 \uFF30\u30B4\u30B7\u30C3\u30AF"/> <a:font script="Hang" typeface="\uB9D1\uC740 \uACE0\uB515"/> <a:font script="Hans" typeface="\u5B8B\u4F53"/> <a:font script="Hant" typeface="\u65B0\u7D30\u660E\u9AD4"/> <a:font script="Arab" typeface="Arial"/> <a:font script="Hebr" typeface="Arial"/> <a:font script="Thai" typeface="Tahoma"/> <a:font script="Ethi" typeface="Nyala"/> <a:font script="Beng" typeface="Vrinda"/> <a:font script="Gujr" typeface="Shruti"/> <a:font script="Khmr" typeface="DaunPenh"/> <a:font script="Knda" typeface="Tunga"/> <a:font script="Guru" typeface="Raavi"/> <a:font script="Cans" typeface="Euphemia"/> <a:font script="Cher" typeface="Plantagenet Cherokee"/> <a:font script="Yiii" typeface="Microsoft Yi Baiti"/> <a:font script="Tibt" typeface="Microsoft Himalaya"/> <a:font script="Thaa" typeface="MV Boli"/> <a:font script="Deva" typeface="Mangal"/> <a:font script="Telu" typeface="Gautami"/> <a:font script="Taml" typeface="Latha"/> <a:font script="Syrc" typeface="Estrangelo Edessa"/> <a:font script="Orya" typeface="Kalinga"/> <a:font script="Mlym" typeface="Kartika"/> <a:font script="Laoo" typeface="DokChampa"/> <a:font script="Sinh" typeface="Iskoola Pota"/> <a:font script="Mong" typeface="Mongolian Baiti"/> <a:font script="Viet" typeface="Arial"/> <a:font script="Uigh" typeface="Microsoft Uighur"/> <a:font script="Geor" typeface="Sylfaen"/> </a:minorFont> </a:fontScheme> <a:fmtScheme name="Office"> <a:fillStyleLst> <a:solidFill> <a:schemeClr val="phClr"/> </a:solidFill> <a:gradFill rotWithShape="1"> <a:gsLst> <a:gs pos="0"> <a:schemeClr val="phClr"> <a:tint val="50000"/> <a:satMod val="300000"/> </a:schemeClr> </a:gs> <a:gs pos="35000"> <a:schemeClr val="phClr"> <a:tint val="37000"/> <a:satMod val="300000"/> </a:schemeClr> </a:gs> <a:gs pos="100000"> <a:schemeClr val="phClr"> <a:tint val="15000"/> <a:satMod val="350000"/> </a:schemeClr> </a:gs> </a:gsLst> <a:lin ang="16200000" scaled="1"/> </a:gradFill> <a:gradFill rotWithShape="1"> <a:gsLst> <a:gs pos="0"> <a:schemeClr val="phClr"> <a:tint val="100000"/> <a:shade val="100000"/> <a:satMod val="130000"/> </a:schemeClr> </a:gs> <a:gs pos="100000"> <a:schemeClr val="phClr"> <a:tint val="50000"/> <a:shade val="100000"/> <a:satMod val="350000"/> </a:schemeClr> </a:gs> </a:gsLst> <a:lin ang="16200000" scaled="0"/> </a:gradFill> </a:fillStyleLst> <a:lnStyleLst> <a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"> <a:solidFill> <a:schemeClr val="phClr"> <a:shade val="95000"/> <a:satMod val="105000"/> </a:schemeClr> </a:solidFill> <a:prstDash val="solid"/> </a:ln> <a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"> <a:solidFill> <a:schemeClr val="phClr"/> </a:solidFill> <a:prstDash val="solid"/> </a:ln> <a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"> <a:solidFill> <a:schemeClr val="phClr"/> </a:solidFill> <a:prstDash val="solid"/> </a:ln> </a:lnStyleLst> <a:effectStyleLst> <a:effectStyle> <a:effectLst> <a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"> <a:srgbClr val="000000"> <a:alpha val="38000"/> </a:srgbClr> </a:outerShdw> </a:effectLst> </a:effectStyle> <a:effectStyle> <a:effectLst> <a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"> <a:srgbClr val="000000"> <a:alpha val="35000"/> </a:srgbClr> </a:outerShdw> </a:effectLst> </a:effectStyle> <a:effectStyle> <a:effectLst> <a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"> <a:srgbClr val="000000"> <a:alpha val="35000"/> </a:srgbClr> </a:outerShdw> </a:effectLst> <a:scene3d> <a:camera prst="orthographicFront"> <a:rot lat="0" lon="0" rev="0"/> </a:camera> <a:lightRig rig="threePt" dir="t"> <a:rot lat="0" lon="0" rev="1200000"/> </a:lightRig> </a:scene3d> <a:sp3d> <a:bevelT w="63500" h="25400"/> </a:sp3d> </a:effectStyle> </a:effectStyleLst> <a:bgFillStyleLst> <a:solidFill> <a:schemeClr val="phClr"/> </a:solidFill> <a:gradFill rotWithShape="1"> <a:gsLst> <a:gs pos="0"> <a:schemeClr val="phClr"> <a:tint val="40000"/> <a:satMod val="350000"/> </a:schemeClr> </a:gs> <a:gs pos="40000"> <a:schemeClr val="phClr"> <a:tint val="45000"/> <a:shade val="99000"/> <a:satMod val="350000"/> </a:schemeClr> </a:gs> <a:gs pos="100000"> <a:schemeClr val="phClr"> <a:shade val="20000"/> <a:satMod val="255000"/> </a:schemeClr> </a:gs> </a:gsLst> <a:path path="circle"> <a:fillToRect l="50000" t="-80000" r="50000" b="180000"/> </a:path> </a:gradFill> <a:gradFill rotWithShape="1"> <a:gsLst> <a:gs pos="0"> <a:schemeClr val="phClr"> <a:tint val="80000"/> <a:satMod val="300000"/> </a:schemeClr> </a:gs> <a:gs pos="100000"> <a:schemeClr val="phClr"> <a:shade val="30000"/> <a:satMod val="200000"/> </a:schemeClr> </a:gs> </a:gsLst> <a:path path="circle"> <a:fillToRect l="50000" t="50000" r="50000" b="50000"/> </a:path> </a:gradFill> </a:bgFillStyleLst> </a:fmtScheme> </a:themeElements> <a:objectDefaults> <a:spDef> <a:spPr/> <a:bodyPr/> <a:lstStyle/> <a:style> <a:lnRef idx="1"> <a:schemeClr val="accent1"/> </a:lnRef> <a:fillRef idx="3"> <a:schemeClr val="accent1"/> </a:fillRef> <a:effectRef idx="2"> <a:schemeClr val="accent1"/> </a:effectRef> <a:fontRef idx="minor"> <a:schemeClr val="lt1"/> </a:fontRef> </a:style> </a:spDef> <a:lnDef> <a:spPr/> <a:bodyPr/> <a:lstStyle/> <a:style> <a:lnRef idx="2"> <a:schemeClr val="accent1"/> </a:lnRef> <a:fillRef idx="0"> <a:schemeClr val="accent1"/> </a:fillRef> <a:effectRef idx="1"> <a:schemeClr val="accent1"/> </a:effectRef> <a:fontRef idx="minor"> <a:schemeClr val="tx1"/> </a:fontRef> </a:style> </a:lnDef> </a:objectDefaults> <a:extraClrSchemeLst/> </a:theme>';

// esm/xlsx/xlsx.js
var XLSX = class _XLSX {
  constructor(workbook) {
    this.workbook = workbook;
  }
  // ===============================================================================
  // Workbook
  // =========================================================================
  // Read
  // async readFile(filename, options) {
  //   if (!(await fs.exists(filename))) {
  //     throw new Error(`File not found: ${filename}`);
  //   }
  //   const stream = fs.createReadStream(filename);
  //   try {
  //     const workbook = await this.read(stream, options);
  //     stream.close();
  //     return workbook;
  //   } catch (error) {
  //     stream.close();
  //     throw error;
  //   }
  // }
  parseRels(stream) {
    const xform = new relationships_xform_default();
    return xform.parseStream(stream);
  }
  parseWorkbook(stream) {
    const xform = new workbook_xform_default();
    return xform.parseStream(stream);
  }
  parseSharedStrings(stream) {
    const xform = new shared_strings_xform_default();
    return xform.parseStream(stream);
  }
  static DrawingXform;
  static loadDrawingXform() {
    if (!(typeof _XLSX.DrawingXform === "undefined"))
      return;
    _XLSX.DrawingXform = (async () => (await Promise.resolve().then(() => (init_drawing_xform(), drawing_xform_exports))).default)();
  }
  reconcile(model, options) {
    _XLSX.loadDrawingXform();
    const workbookXform = new workbook_xform_default();
    const worksheetXform = new worksheet_xform_default(options);
    const drawingXform = new _XLSX.DrawingXform();
    const tableXform = new table_xform_default();
    workbookXform.reconcile(model);
    const drawingOptions = {
      media: model.media,
      mediaIndex: model.mediaIndex
    };
    Object.keys(model.drawings).forEach((name) => {
      const drawing = model.drawings[name];
      const drawingRel = model.drawingRels[name];
      if (drawingRel) {
        drawingOptions.rels = drawingRel.reduce((o, rel) => {
          o[rel.Id] = rel;
          return o;
        }, {});
        (drawing.anchors || []).forEach((anchor) => {
          const hyperlinks = anchor.picture && anchor.picture.hyperlinks;
          if (hyperlinks && drawingOptions.rels[hyperlinks.rId]) {
            hyperlinks.hyperlink = drawingOptions.rels[hyperlinks.rId].Target;
            delete hyperlinks.rId;
          }
        });
        drawingXform.reconcile(drawing, drawingOptions);
      }
    });
    const tableOptions = {
      styles: model.styles
    };
    Object.values(model.tables).forEach((table) => {
      tableXform.reconcile(table, tableOptions);
    });
    const sheetOptions = {
      styles: model.styles,
      sharedStrings: model.sharedStrings,
      media: model.media,
      mediaIndex: model.mediaIndex,
      date1904: model.properties && model.properties.date1904,
      drawings: model.drawings,
      comments: model.comments,
      tables: model.tables,
      vmlDrawings: model.vmlDrawings
    };
    model.worksheets.forEach((worksheet) => {
      worksheet.relationships = model.worksheetRels[worksheet.sheetNo];
      worksheetXform.reconcile(worksheet, sheetOptions);
    });
    delete model.worksheetHash;
    delete model.worksheetRels;
    delete model.globalRels;
    delete model.sharedStrings;
    delete model.workbookRels;
    delete model.sheetDefs;
    delete model.styles;
    delete model.mediaIndex;
    delete model.drawings;
    delete model.drawingRels;
    delete model.vmlDrawings;
  }
  async _processWorksheetEntry(stream, model, sheetNo, options, path) {
    const xform = new worksheet_xform_default(options);
    const worksheet = await xform.parseStream(stream);
    worksheet.sheetNo = sheetNo;
    model.worksheetHash[path] = worksheet;
    model.worksheets.push(worksheet);
  }
  static CommentsXform;
  static async loadCommentsForm() {
    if (!(typeof _XLSX.CommentsXform === "undefined"))
      return;
    _XLSX.CommentsXform = (await Promise.resolve().then(() => (init_comments_xform(), comments_xform_exports))).default;
  }
  async _processCommentEntry(stream, model, name) {
    await _XLSX.loadCommentsForm();
    const xform = new _XLSX.CommentsXform();
    const comments = await xform.parseStream(stream);
    model.comments[`../${name}.xml`] = comments;
  }
  async _processTableEntry(stream, model, name) {
    const xform = new table_xform_default();
    const table = await xform.parseStream(stream);
    model.tables[`../tables/${name}.xml`] = table;
  }
  async _processWorksheetRelsEntry(stream, model, sheetNo) {
    const xform = new relationships_xform_default();
    const relationships = await xform.parseStream(stream);
    model.worksheetRels[sheetNo] = relationships;
  }
  async _processMediaEntry(entry, model, filename) {
    const lastDot = filename.lastIndexOf(".");
    if (lastDot >= 1) {
      const extension = filename.substr(lastDot + 1);
      const name = filename.substr(0, lastDot);
      await new Promise((resolve, reject) => {
        const streamBuf = new stream_buf_default();
        streamBuf.on("finish", () => {
          model.mediaIndex[filename] = model.media.length;
          model.mediaIndex[name] = model.media.length;
          const medium = {
            type: "image",
            name,
            extension,
            buffer: streamBuf.toBuffer()
          };
          model.media.push(medium);
          resolve();
        });
        entry.on("error", (error) => {
          reject(error);
        });
        entry.pipe(streamBuf);
      });
    }
  }
  async _processDrawingEntry(entry, model, name) {
    _XLSX.loadDrawingXform();
    const xform = new _XLSX.DrawingXform();
    const drawing = await xform.parseStream(entry);
    model.drawings[name] = drawing;
  }
  async _processDrawingRelsEntry(entry, model, name) {
    const xform = new relationships_xform_default();
    const relationships = await xform.parseStream(entry);
    model.drawingRels[name] = relationships;
  }
  static vmlNotesXform;
  static async loadVml() {
    if (!(typeof _XLSX.vmlNotesXform === "undefined"))
      return;
    _XLSX.vmlNotesXform = await Promise.resolve().then(() => (init_vml_notes_xform(), vml_notes_xform_exports));
  }
  async _processVmlDrawingEntry(entry, model, name) {
    await _XLSX.loadVml();
    const xform = new _XLSX.VmlNotesXform();
    const vmlDrawing = await xform.parseStream(entry);
    model.vmlDrawings[`../drawings/${name}.vml`] = vmlDrawing;
  }
  async _processThemeEntry(entry, model, name) {
    await new Promise((resolve, reject) => {
      const stream = new stream_buf_default();
      entry.on("error", reject);
      stream.on("error", reject);
      stream.on("finish", () => {
        model.themes[name] = stream.read().toString();
        resolve();
      });
      entry.pipe(stream);
    });
  }
  // /**
  //  * @deprecated since version 4.0. You should use `#read` instead. Please follow upgrade instruction: https://github.com/exceljs/exceljs/blob/master/UPGRADE-4.0.md
  //  */
  // createInputStream() {
  //     throw new Error('`XLSX#createInputStream` is deprecated. You should use `XLSX#read` instead. This method will be removed in version 5.0. Please follow upgrade instruction: https://github.com/exceljs/exceljs/blob/master/UPGRADE-4.0.md');
  // }
  // async read(stream, options) {
  //     // TODO: Remove once node v8 is deprecated
  //     // Detect and upgrade old streams
  //     if (!stream[Symbol.asyncIterator] && stream.pipe) {
  //         stream = stream.pipe(new PassThrough());
  //     }
  //     const chunks = [];
  //     for await (const chunk of stream) {
  //         chunks.push(chunk);
  //     }
  //     return this.load(Buffer.concat(chunks), options);
  // }
  // async load(data, options) {
  //     let buffer;
  //     if (options && options.base64) {
  //         buffer = Buffer.from(data.toString(), 'base64');
  //     }
  //     else {
  //         buffer = data;
  //     }
  //     const model = {
  //         worksheets: [],
  //         worksheetHash: {},
  //         worksheetRels: [],
  //         themes: {},
  //         media: [],
  //         mediaIndex: {},
  //         drawings: {},
  //         drawingRels: {},
  //         comments: {},
  //         tables: {},
  //         vmlDrawings: {},
  //     };
  //     const zip = (await import('jszip')).loadAsync(databuffer)
  //     for (const entry of Object.values(zip.files)) {
  //         /* eslint-disable no-await-in-loop */
  //         if (!entry.dir) {
  //             let entryName = entry.name;
  //             if (entryName[0] === '/') {
  //                 entryName = entryName.substr(1);
  //             }
  //             let stream;
  //             if (entryName.match(/xl\/media\//) ||
  //                 // themes are not parsed as stream
  //                 entryName.match(/xl\/theme\/([a-zA-Z0-9]+)[.]xml/)) {
  //                 stream = new PassThrough();
  //                 stream.write(await entry.async('nodebuffer'));
  //             }
  //             else {
  //                 // use object mode to avoid buffer-string convention
  //                 stream = new PassThrough({
  //                     writableObjectMode: true,
  //                     readableObjectMode: true,
  //                 });
  //                 // let content;
  //                 // https://www.npmjs.com/package/process
  //                 // if (process.browser) {
  //                 //     // running in browser, use TextDecoder if possible
  //                 //     content = bufferToString(await entry.async('nodebuffer'));
  //                 // }
  //                 // else {
  //                 // running in node.js
  //                 const content = await entry.async('string');
  //                 // }
  //                 const chunkSize = 16 * 1024;
  //                 for (let i = 0; i < content.length; i += chunkSize) {
  //                     stream.write(content.substring(i, i + chunkSize));
  //                 }
  //             }
  //             stream.end();
  //             switch (entryName) {
  //                 case '_rels/.rels':
  //                     model.globalRels = await this.parseRels(stream);
  //                     break;
  //                 case 'xl/workbook.xml': {
  //                     const workbook = await this.parseWorkbook(stream);
  //                     model.sheets = workbook.sheets;
  //                     model.definedNames = workbook.definedNames;
  //                     model.views = workbook.views;
  //                     model.properties = workbook.properties;
  //                     model.calcProperties = workbook.calcProperties;
  //                     break;
  //                 }
  //                 case 'xl/_rels/workbook.xml.rels':
  //                     model.workbookRels = await this.parseRels(stream);
  //                     break;
  //                 case 'xl/sharedStrings.xml':
  //                     model.sharedStrings = new SharedStringsXform();
  //                     await model.sharedStrings.parseStream(stream);
  //                     break;
  //                 case 'xl/styles.xml':
  //                     model.styles = new StylesXform();
  //                     await model.styles.parseStream(stream);
  //                     break;
  //                 case 'docProps/app.xml': {
  //                     const appXform = new AppXform();
  //                     const appProperties = await appXform.parseStream(stream);
  //                     model.company = appProperties.company;
  //                     model.manager = appProperties.manager;
  //                     break;
  //                 }
  //                 case 'docProps/core.xml': {
  //                     const coreXform = new CoreXform();
  //                     const coreProperties = await coreXform.parseStream(stream);
  //                     Object.assign(model, coreProperties);
  //                     break;
  //                 }
  //                 default: {
  //                     let match = entryName.match(/xl\/worksheets\/sheet(\d+)[.]xml/);
  //                     if (match) {
  //                         await this._processWorksheetEntry(stream, model, match[1], options, entryName);
  //                         break;
  //                     }
  //                     match = entryName.match(/xl\/worksheets\/_rels\/sheet(\d+)[.]xml.rels/);
  //                     if (match) {
  //                         await this._processWorksheetRelsEntry(stream, model, match[1]);
  //                         break;
  //                     }
  //                     match = entryName.match(/xl\/theme\/([a-zA-Z0-9]+)[.]xml/);
  //                     if (match) {
  //                         await this._processThemeEntry(stream, model, match[1]);
  //                         break;
  //                     }
  //                     match = entryName.match(/xl\/media\/([a-zA-Z0-9]+[.][a-zA-Z0-9]{3,4})$/);
  //                     if (match) {
  //                         await this._processMediaEntry(stream, model, match[1]);
  //                         break;
  //                     }
  //                     match = entryName.match(/xl\/drawings\/([a-zA-Z0-9]+)[.]xml/);
  //                     if (match) {
  //                         await this._processDrawingEntry(stream, model, match[1]);
  //                         break;
  //                     }
  //                     match = entryName.match(/xl\/(comments\d+)[.]xml/);
  //                     if (match) {
  //                         await this._processCommentEntry(stream, model, match[1]);
  //                         break;
  //                     }
  //                     match = entryName.match(/xl\/tables\/(table\d+)[.]xml/);
  //                     if (match) {
  //                         await this._processTableEntry(stream, model, match[1]);
  //                         break;
  //                     }
  //                     match = entryName.match(/xl\/drawings\/_rels\/([a-zA-Z0-9]+)[.]xml[.]rels/);
  //                     if (match) {
  //                         await this._processDrawingRelsEntry(stream, model, match[1]);
  //                         break;
  //                     }
  //                     match = entryName.match(/xl\/drawings\/(vmlDrawing\d+)[.]vml/);
  //                     if (match) {
  //                         await this._processVmlDrawingEntry(stream, model, match[1]);
  //                         break;
  //                     }
  //                 }
  //             }
  //         }
  //     }
  //     this.reconcile(model, options);
  //     // apply model
  //     this.workbook.model = model;
  //     return this.workbook;
  // }
  // =========================================================================
  // Write
  async addMedia(zip, model) {
    await Promise.all(model.media.map(async (medium) => {
      if (medium.type === "image") {
        const filename = `xl/media/${medium.name}.${medium.extension}`;
        if (medium.buffer) {
          return zip.append(medium.buffer, { name: filename });
        }
        if (medium.base64) {
          const dataimg64 = medium.base64;
          const content = dataimg64.substring(dataimg64.indexOf(",") + 1);
          return zip.append(content, { name: filename, base64: true });
        }
      }
      throw new Error("Unsupported media");
    }));
  }
  addDrawings(zip, model) {
    _XLSX.loadDrawingXform();
    const drawingXform = new _XLSX.DrawingXform();
    const relsXform = new relationships_xform_default();
    model.worksheets.forEach((worksheet) => {
      const { drawing } = worksheet;
      if (drawing) {
        drawingXform.prepare(drawing, {});
        let xml = drawingXform.toXml(drawing);
        zip.append(xml, { name: `xl/drawings/${drawing.name}.xml` });
        xml = relsXform.toXml(drawing.rels);
        zip.append(xml, { name: `xl/drawings/_rels/${drawing.name}.xml.rels` });
      }
    });
  }
  addTables(zip, model) {
    const tableXform = new table_xform_default();
    model.worksheets.forEach((worksheet) => {
      const { tables } = worksheet;
      tables.forEach((table) => {
        tableXform.prepare(table, {});
        const tableXml = tableXform.toXml(table);
        zip.append(tableXml, { name: `xl/tables/${table.target}` });
      });
    });
  }
  static PivotCacheRecordsXform;
  static PivotCacheDefinitionXform;
  static PivotTableXform;
  static async loadPivotForms() {
    if (!(typeof _XLSX.PivotCacheRecordsXform === "undefined"))
      return;
    _XLSX.PivotCacheRecordsXform = (await Promise.resolve().then(() => (init_pivot_cache_records_xform(), pivot_cache_records_xform_exports))).default;
    _XLSX.PivotCacheDefinitionXform = (await Promise.resolve().then(() => (init_pivot_cache_definition_xform(), pivot_cache_definition_xform_exports))).default;
    _XLSX.PivotTableXform = (await Promise.resolve().then(() => (init_pivot_table_xform(), pivot_table_xform_exports))).default;
  }
  addPivotTables(zip, model) {
    if (!model.pivotTables.length)
      return;
    (async () => await _XLSX.loadPivotForms())();
    const pivotTable = model.pivotTables[0];
    const pivotCacheRecordsXform = new _XLSX.PivotCacheRecordsXform();
    const pivotCacheDefinitionXform = new _XLSX.PivotCacheDefinitionXform();
    const pivotTableXform = new _XLSX.PivotTableXform();
    const relsXform = new relationships_xform_default();
    let xml = pivotCacheRecordsXform.toXml(pivotTable);
    zip.append(xml, { name: "xl/pivotCache/pivotCacheRecords1.xml" });
    xml = pivotCacheDefinitionXform.toXml(pivotTable);
    zip.append(xml, { name: "xl/pivotCache/pivotCacheDefinition1.xml" });
    xml = relsXform.toXml([
      {
        Id: "rId1",
        Type: rel_type_default.PivotCacheRecords,
        Target: "pivotCacheRecords1.xml"
      }
    ]);
    zip.append(xml, { name: "xl/pivotCache/_rels/pivotCacheDefinition1.xml.rels" });
    xml = pivotTableXform.toXml(pivotTable);
    zip.append(xml, { name: "xl/pivotTables/pivotTable1.xml" });
    xml = relsXform.toXml([
      {
        Id: "rId1",
        Type: rel_type_default.PivotCacheDefinition,
        Target: "../pivotCache/pivotCacheDefinition1.xml"
      }
    ]);
    zip.append(xml, { name: "xl/pivotTables/_rels/pivotTable1.xml.rels" });
  }
  async addContentTypes(zip, model) {
    const xform = new content_types_xform_default();
    const xml = xform.toXml(model);
    zip.append(xml, { name: "[Content_Types].xml" });
  }
  // async addApp(zip, model) {
  //     const xform = new AppXform();
  //     const xml = xform.toXml(model);
  //     zip.append(xml, { name: 'docProps/app.xml' });
  // }
  async addCore(zip, model) {
    const coreXform = new core_xform_default();
    zip.append(coreXform.toXml(model), { name: "docProps/core.xml" });
  }
  async addThemes(zip, model) {
    const themes = model.themes || { theme1: theme1_default };
    Object.keys(themes).forEach((name) => {
      const xml = themes[name];
      const path = `xl/theme/${name}.xml`;
      zip.append(xml, { name: path });
    });
  }
  async addOfficeRels(zip) {
    const xform = new relationships_xform_default();
    const xml = xform.toXml([
      { Id: "rId1", Type: rel_type_default.OfficeDocument, Target: "xl/workbook.xml" },
      { Id: "rId2", Type: rel_type_default.CoreProperties, Target: "docProps/core.xml" },
      { Id: "rId3", Type: rel_type_default.ExtenderProperties, Target: "docProps/app.xml" }
    ]);
    zip.append(xml, { name: "_rels/.rels" });
  }
  async addWorkbookRels(zip, model) {
    let count = 1;
    const relationships = [
      { Id: `rId${count++}`, Type: rel_type_default.Styles, Target: "styles.xml" },
      { Id: `rId${count++}`, Type: rel_type_default.Theme, Target: "theme/theme1.xml" }
    ];
    if (model.sharedStrings.count) {
      relationships.push({
        Id: `rId${count++}`,
        Type: rel_type_default.SharedStrings,
        Target: "sharedStrings.xml"
      });
    }
    if ((model.pivotTables || []).length) {
      const pivotTable = model.pivotTables[0];
      pivotTable.rId = `rId${count++}`;
      relationships.push({
        Id: pivotTable.rId,
        Type: rel_type_default.PivotCacheDefinition,
        Target: "pivotCache/pivotCacheDefinition1.xml"
      });
    }
    model.worksheets.forEach((worksheet) => {
      worksheet.rId = `rId${count++}`;
      relationships.push({
        Id: worksheet.rId,
        Type: rel_type_default.Worksheet,
        Target: `worksheets/sheet${worksheet.id}.xml`
      });
    });
    const xform = new relationships_xform_default();
    const xml = xform.toXml(relationships);
    zip.append(xml, { name: "xl/_rels/workbook.xml.rels" });
  }
  async addSharedStrings(zip, model) {
    if (model.sharedStrings && model.sharedStrings.count) {
      zip.append(model.sharedStrings.xml, { name: "xl/sharedStrings.xml" });
    }
  }
  async addStyles(zip, model) {
    const { xml } = model.styles;
    if (xml) {
      zip.append(xml, { name: "xl/styles.xml" });
    }
  }
  async addWorkbook(zip, model) {
    const xform = new workbook_xform_default();
    zip.append(xform.toXml(model), { name: "xl/workbook.xml" });
  }
  async addWorksheets(zip, model) {
    const worksheetXform = new worksheet_xform_default();
    const relationshipsXform = new relationships_xform_default();
    let commentsXform, vmlNotesXform, cxLoaded = false;
    model.worksheets.forEach((worksheet) => {
      let xmlStream = new xml_stream_default();
      worksheetXform.render(xmlStream, worksheet);
      zip.append(xmlStream.xml, { name: `xl/worksheets/sheet${worksheet.id}.xml` });
      if (worksheet.rels && worksheet.rels.length) {
        xmlStream = new xml_stream_default();
        relationshipsXform.render(xmlStream, worksheet.rels);
        zip.append(xmlStream.xml, { name: `xl/worksheets/_rels/sheet${worksheet.id}.xml.rels` });
      }
      if (worksheet.comments.length > 0) {
        if (!cxLoaded) {
          (async () => {
            await _XLSX.loadCommentsForm();
            await _XLSX.loadVml();
          })();
          commentsXform = new _XLSX.CommentsXform();
          vmlNotesXform = new _XLSX.vmlNotesXform();
          cxLoaded = true;
        }
        xmlStream = new xml_stream_default();
        commentsXform.render(xmlStream, worksheet);
        zip.append(xmlStream.xml, { name: `xl/comments${worksheet.id}.xml` });
        xmlStream = new xml_stream_default();
        vmlNotesXform.render(xmlStream, worksheet);
        zip.append(xmlStream.xml, { name: `xl/drawings/vmlDrawing${worksheet.id}.vml` });
      }
    });
  }
  _finalize(zip) {
    return new Promise((resolve, reject) => {
      zip.on("finish", () => {
        resolve(this);
      });
      zip.on("error", reject);
      zip.finalize();
    });
  }
  prepareModel(model, options) {
    model.creator = model.creator || "ExcelJS";
    model.lastModifiedBy = model.lastModifiedBy || "ExcelJS";
    model.created = model.created || /* @__PURE__ */ new Date();
    model.modified = model.modified || /* @__PURE__ */ new Date();
    model.useSharedStrings = options.useSharedStrings !== void 0 ? options.useSharedStrings : true;
    model.useStyles = options.useStyles !== void 0 ? options.useStyles : true;
    model.sharedStrings = new shared_strings_xform_default();
    model.styles = model.useStyles ? new StylesXform(true) : new StylesXform.Mock();
    const workbookXform = new workbook_xform_default();
    const worksheetXform = new worksheet_xform_default();
    workbookXform.prepare(model);
    const worksheetOptions = {
      sharedStrings: model.sharedStrings,
      styles: model.styles,
      date1904: model.properties.date1904,
      drawingsCount: 0,
      media: model.media
    };
    worksheetOptions.drawings = model.drawings = [];
    worksheetOptions.commentRefs = model.commentRefs = [];
    let tableCount = 0;
    model.tables = [];
    model.worksheets.forEach((worksheet) => {
      worksheet.tables.forEach((table) => {
        tableCount++;
        table.target = `table${tableCount}.xml`;
        table.id = tableCount;
        model.tables.push(table);
      });
      worksheetXform.prepare(worksheet, worksheetOptions);
    });
  }
  // async write(stream, options) {
  //     options = options || {};
  //     const { model } = this.workbook;
  //     const zip = new ZipStream.ZipWriter(options.zip);
  //     zip.pipe(stream);
  //     this.prepareModel(model, options);
  //     // render
  //     await this.addContentTypes(zip, model);
  //     await this.addOfficeRels(zip, model);
  //     await this.addWorkbookRels(zip, model);
  //     await this.addWorksheets(zip, model);
  //     await this.addSharedStrings(zip, model); // always after worksheets
  //     await this.addDrawings(zip, model);
  //     await this.addTables(zip, model);
  //     await this.addPivotTables(zip, model);
  //     await Promise.all([this.addThemes(zip, model), this.addStyles(zip, model)]);
  //     await this.addMedia(zip, model);
  //     await Promise.all([this.addApp(zip, model), this.addCore(zip, model)]);
  //     await this.addWorkbook(zip, model);
  //     return this._finalize(zip);
  // }
  // writeFile(filename, options) {
  //   const stream = fs.createWriteStream(filename);
  //   return new Promise((resolve, reject) => {
  //     stream.on('finish', () => {
  //       resolve();
  //     });
  //     stream.on('error', error => {
  //       reject(error);
  //     });
  //     this.write(stream, options)
  //       .then(() => {
  //         stream.end();
  //       })
  //       .catch(err => {
  //         reject(err);
  //       });
  //   });
  // }
  async writeBuffer(options) {
    const stream = new stream_buf_default();
    await this.write(stream, options);
    return stream.read();
  }
  RelType = rel_type_default;
};

// esm/doc/workbook.js
var Workbook = class {
  constructor() {
    this.category = "";
    this.company = "";
    this.created = /* @__PURE__ */ new Date();
    this.description = "";
    this.keywords = "";
    this.manager = "";
    this.modified = this.created;
    this.properties = {};
    this.calcProperties = {};
    this._worksheets = [];
    this.subject = "";
    this.title = "";
    this.views = [];
    this.media = [];
    this.pivotTables = [];
    this._definedNames = new defined_names_default();
  }
  get xlsx() {
    if (!this._xlsx)
      this._xlsx = new XLSX(this);
    return this._xlsx;
  }
  // get csv() {
  //   if (!this._csv) this._csv = new CSV(this);
  //   return this._csv;
  // }
  get nextId() {
    for (let i = 1; i < this._worksheets.length; i++) {
      if (!this._worksheets[i]) {
        return i;
      }
    }
    return this._worksheets.length || 1;
  }
  addWorksheet(name, options) {
    const id = this.nextId;
    if (options) {
      if (typeof options === "string") {
        console.trace('tabColor argument is now deprecated. Please use workbook.addWorksheet(name, {properties: { tabColor: { argb: "rbg value" } }');
        options = {
          properties: {
            tabColor: { argb: options }
          }
        };
      } else if (options.argb || options.theme || options.indexed) {
        console.trace("tabColor argument is now deprecated. Please use workbook.addWorksheet(name, {properties: { tabColor: { ... } }");
        options = {
          properties: {
            tabColor: options
          }
        };
      }
    }
    const lastOrderNo = this._worksheets.reduce((acc, ws) => (ws && ws.orderNo) > acc ? ws.orderNo : acc, 0);
    const worksheetOptions = Object.assign({}, options, {
      id,
      name,
      orderNo: lastOrderNo + 1,
      workbook: this
    });
    const worksheet = new worksheet_default(worksheetOptions);
    this._worksheets[id] = worksheet;
    return worksheet;
  }
  removeWorksheetEx(worksheet) {
    delete this._worksheets[worksheet.id];
  }
  removeWorksheet(id) {
    const worksheet = this.getWorksheet(id);
    if (worksheet) {
      worksheet.destroy();
    }
  }
  getWorksheet(id) {
    if (id === void 0) {
      return this._worksheets.find(Boolean);
    }
    if (typeof id === "number") {
      return this._worksheets[id];
    }
    if (typeof id === "string") {
      return this._worksheets.find((worksheet) => worksheet && worksheet.name === id);
    }
    return void 0;
  }
  get worksheets() {
    return this._worksheets.slice(1).sort((a, b) => a.orderNo - b.orderNo).filter(Boolean);
  }
  eachSheet(iteratee) {
    this.worksheets.forEach((sheet) => {
      iteratee(sheet, sheet.id);
    });
  }
  get definedNames() {
    return this._definedNames;
  }
  clearThemes() {
    this._themes = void 0;
  }
  addImage(image) {
    const id = this.media.length;
    this.media.push(Object.assign({}, image, { type: "image" }));
    return id;
  }
  getImage(id) {
    return this.media[id];
  }
  get model() {
    return {
      creator: this.creator || "Unknown",
      lastModifiedBy: this.lastModifiedBy || "Unknown",
      lastPrinted: this.lastPrinted,
      created: this.created,
      modified: this.modified,
      properties: this.properties,
      worksheets: this.worksheets.map((worksheet) => worksheet.model),
      sheets: this.worksheets.map((ws) => ws.model).filter(Boolean),
      definedNames: this._definedNames.model,
      views: this.views,
      company: this.company,
      manager: this.manager,
      title: this.title,
      subject: this.subject,
      keywords: this.keywords,
      category: this.category,
      description: this.description,
      language: this.language,
      revision: this.revision,
      contentStatus: this.contentStatus,
      themes: this._themes,
      media: this.media,
      pivotTables: this.pivotTables,
      calcProperties: this.calcProperties
    };
  }
  set model(value) {
    this.creator = value.creator;
    this.lastModifiedBy = value.lastModifiedBy;
    this.lastPrinted = value.lastPrinted;
    this.created = value.created;
    this.modified = value.modified;
    this.company = value.company;
    this.manager = value.manager;
    this.title = value.title;
    this.subject = value.subject;
    this.keywords = value.keywords;
    this.category = value.category;
    this.description = value.description;
    this.language = value.language;
    this.revision = value.revision;
    this.contentStatus = value.contentStatus;
    this.properties = value.properties;
    this.calcProperties = value.calcProperties;
    this._worksheets = [];
    value.worksheets.forEach((worksheetModel) => {
      const { id, name, state } = worksheetModel;
      const orderNo = value.sheets && value.sheets.findIndex((ws) => ws.id === id);
      const worksheet = this._worksheets[id] = new worksheet_default({
        id,
        name,
        orderNo,
        state,
        workbook: this
      });
      worksheet.model = worksheetModel;
    });
    this._definedNames.model = value.definedNames;
    this.views = value.views;
    this._themes = value.themes;
    this.media = value.media || [];
    this.pivotTables = value.pivotTables || [];
  }
};

// esm/doc/modelcontainer.js
var ModelContainer = class {
  constructor(model) {
    this.model = model;
  }
  get xlsx() {
    if (!this._xlsx) {
      this._xlsx = new XLSX(this);
    }
    return this._xlsx;
  }
};
var modelcontainer_default = ModelContainer;

// esm/index.js
var ExcelJS = {
  Workbook,
  ModelContainer: modelcontainer_default
};
Object.assign(ExcelJS, enums_default);
var esm_default = ExcelJS;
export {
  esm_default as default
};
/*! Bundled license information:

xmlchars/xml/1.0/ed5.js:
  (**
   * Character classes and associated utilities for the 5th edition of XML 1.0.
   *
   * @author Louis-Dominique Dubeau
   * @license MIT
   * @copyright Louis-Dominique Dubeau
   *)

xmlchars/xml/1.1/ed2.js:
  (**
   * Character classes and associated utilities for the 2nd edition of XML 1.1.
   *
   * @author Louis-Dominique Dubeau
   * @license MIT
   * @copyright Louis-Dominique Dubeau
   *)

xmlchars/xmlns/1.0/ed3.js:
  (**
   * Character class utilities for XML NS 1.0 edition 3.
   *
   * @author Louis-Dominique Dubeau
   * @license MIT
   * @copyright Louis-Dominique Dubeau
   *)
*/

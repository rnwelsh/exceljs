export default FontXform;
declare class FontXform extends BaseXform {
    constructor(options: any);
    options: any;
    map: {
        b: {
            prop: string;
            xform: BooleanXform;
        };
        i: {
            prop: string;
            xform: BooleanXform;
        };
        u: {
            prop: string;
            xform: UnderlineXform;
        };
        charset: {
            prop: string;
            xform: IntegerXform;
        };
        color: {
            prop: string;
            xform: ColorXform;
        };
        condense: {
            prop: string;
            xform: BooleanXform;
        };
        extend: {
            prop: string;
            xform: BooleanXform;
        };
        family: {
            prop: string;
            xform: IntegerXform;
        };
        outline: {
            prop: string;
            xform: BooleanXform;
        };
        vertAlign: {
            prop: string;
            xform: StringXform;
        };
        scheme: {
            prop: string;
            xform: StringXform;
        };
        shadow: {
            prop: string;
            xform: BooleanXform;
        };
        strike: {
            prop: string;
            xform: BooleanXform;
        };
        sz: {
            prop: string;
            xform: IntegerXform;
        };
    };
    get tag(): any;
    render(xmlStream: any, model: any): void;
    parseOpen(node: any): any;
    parser: any;
    parseClose(name: any): boolean;
}
declare namespace FontXform {
    namespace OPTIONS {
        const tagName: string;
        const fontNameTag: string;
    }
}
import BaseXform from "../base-xform.js";
import BooleanXform from "../simple/boolean-xform.js";
import UnderlineXform from "./underline-xform.js";
import IntegerXform from "../simple/integer-xform.js";
import ColorXform from "./color-xform.js";
import StringXform from "../simple/string-xform.js";

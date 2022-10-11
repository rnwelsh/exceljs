export default BorderXform;
declare class BorderXform extends BaseXform {
    map: {
        top: EdgeXform;
        left: EdgeXform;
        bottom: EdgeXform;
        right: EdgeXform;
        diagonal: EdgeXform;
    };
    render(xmlStream: any, model: any): void;
    parseOpen(node: any): boolean;
    diagonalUp: boolean;
    diagonalDown: boolean;
    parser: any;
    parseClose(name: any): boolean;
}
import BaseXform from "../base-xform.js";
declare class EdgeXform extends BaseXform {
    constructor(name: any);
    name: any;
    map: {
        color: ColorXform;
    };
    get tag(): any;
    render(xmlStream: any, model: any, defaultColor: any): void;
    parseOpen(node: any): boolean;
    parser: ColorXform;
    parseClose(name: any): boolean;
    validStyle(value: any): any;
}
declare namespace EdgeXform {
    const validStyleValues: {};
}
import ColorXform from "./color-xform.js";

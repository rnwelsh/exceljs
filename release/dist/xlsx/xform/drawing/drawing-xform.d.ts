export default DrawingXform;
declare class DrawingXform extends BaseXform {
    map: {
        'xdr:twoCellAnchor': TwoCellAnchorXform;
        'xdr:oneCellAnchor': OneCellAnchorXform;
    };
    prepare(model: any): void;
    get tag(): string;
    render(xmlStream: any, model: any): void;
    parseOpen(node: any): boolean;
    parser: any;
    parseClose(name: any): boolean;
}
declare namespace DrawingXform {
    const DRAWING_ATTRIBUTES: {
        'xmlns:xdr': string;
        'xmlns:a': string;
    };
}
import BaseXform from "../base-xform.js";
import TwoCellAnchorXform from "./two-cell-anchor-xform.js";
import OneCellAnchorXform from "./one-cell-anchor-xform.js";

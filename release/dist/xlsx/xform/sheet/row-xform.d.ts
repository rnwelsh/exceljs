export default RowXform;
declare class RowXform extends BaseXform {
    constructor(options: any);
    maxItems: any;
    map: {
        c: CellXform;
    };
    get tag(): string;
    prepare(model: any, options: any): void;
    render(xmlStream: any, model: any, options: any): void;
    parseOpen(node: any): boolean;
    parser: any;
    parseClose(name: any): boolean;
}
import BaseXform from "../base-xform.js";
import CellXform from "./cell-xform.js";

export default AutoFilterXform;
declare class AutoFilterXform extends BaseXform {
    map: {
        filterColumn: FilterColumnXform;
    };
    get tag(): string;
    prepare(model: any): void;
    render(xmlStream: any, model: any): boolean;
    parseOpen(node: any): boolean;
    parser: any;
    parseClose(name: any): boolean;
}
import BaseXform from "../base-xform.js";
import FilterColumnXform from "./filter-column-xform.js";

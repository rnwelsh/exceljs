export default FilterColumnXform;
declare class FilterColumnXform extends BaseXform {
    map: {
        customFilters: ListXform;
        filters: ListXform;
    };
    get tag(): string;
    prepare(model: any, options: any): void;
    render(xmlStream: any, model: any): boolean;
    parseOpen(node: any): boolean;
    parser: any;
    parseText(): void;
    parseClose(name: any): boolean;
}
import BaseXform from "../base-xform.js";
import ListXform from "../list-xform.js";

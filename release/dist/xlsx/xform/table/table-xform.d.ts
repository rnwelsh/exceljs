export default TableXform;
declare class TableXform extends BaseXform {
    map: {
        autoFilter: AutoFilterXform;
        tableColumns: ListXform;
        tableStyleInfo: TableStyleInfoXform;
    };
    prepare(model: any, options: any): void;
    get tag(): string;
    render(xmlStream: any, model: any): void;
    parseOpen(node: any): boolean;
    parser: any;
    parseClose(name: any): boolean;
}
declare namespace TableXform {
    const TABLE_ATTRIBUTES: {
        xmlns: string;
        'xmlns:mc': string;
        'mc:Ignorable': string;
        'xmlns:xr': string;
        'xmlns:xr3': string;
    };
}
import BaseXform from "../base-xform.js";
import AutoFilterXform from "./auto-filter-xform.js";
import ListXform from "../list-xform.js";
import TableStyleInfoXform from "./table-style-info-xform.js";

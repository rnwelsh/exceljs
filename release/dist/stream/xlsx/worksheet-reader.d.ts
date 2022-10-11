export default WorksheetReader;
declare class WorksheetReader extends EventEmitter {
    constructor({ workbook, id, iterator, options }: {
        workbook: any;
        id: any;
        iterator: any;
        options: any;
    });
    workbook: any;
    id: any;
    iterator: any;
    options: any;
    name: string;
    _columns: any[] | _column[];
    _keys: {};
    _dimensions: Dimensions;
    destroy(): void;
    get dimensions(): Dimensions;
    get columns(): any[] | _column[];
    getColumn(c: any): any;
    getColumnKey(key: any): any;
    setColumnKey(key: any, value: any): void;
    deleteColumnKey(key: any): void;
    eachColumnKey(f: any): void;
    read(): Promise<void>;
    parse(): AsyncGenerator<({
        eventType: string;
        value: {
            ref: any;
            rId: any;
        };
    } | {
        eventType: string;
        value: Row;
    })[], void, unknown>;
    hyperlinks: {};
    [Symbol.asyncIterator](): AsyncGenerator<Row | {
        ref: any;
        rId: any;
    }, void, unknown>;
}
import { EventEmitter } from "events";
import _column from "../../doc/column.js";
import Dimensions from "../../doc/range.js";
import Row from "../../doc/row.js";

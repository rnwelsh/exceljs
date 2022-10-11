export default WorkbookReader;
declare class WorkbookReader extends EventEmitter {
    constructor(input: any, options?: {});
    input: any;
    options: {
        worksheets: string;
        sharedStrings: string;
        hyperlinks: string;
        styles: string;
        entries: string;
    };
    styles: StyleManager;
    _getStream(input: any): any;
    read(input: any, options: any): Promise<void>;
    parse(input: any, options: any): AsyncGenerator<{
        index: number;
        text: any;
    } | {
        eventType: string;
        value: WorksheetReader;
    } | {
        eventType: string;
        value: HyperlinkReader;
    }, void, unknown>;
    stream: any;
    _emitEntry(payload: any): void;
    _parseRels(entry: any): Promise<void>;
    workbookRels: any;
    _parseWorkbook(entry: any): Promise<void>;
    properties: import("../../xlsx/xform/book/workbook-properties-xform.js").default;
    model: any;
    _parseSharedStrings(entry: any): AsyncGenerator<{
        index: number;
        text: any;
    }, void, unknown>;
    sharedStrings: any[];
    _parseStyles(entry: any): Promise<void>;
    _parseWorksheet(iterator: any, sheetNo: any): Generator<{
        eventType: string;
        value: WorksheetReader;
    }, void, unknown>;
    _parseHyperlinks(iterator: any, sheetNo: any): Generator<{
        eventType: string;
        value: HyperlinkReader;
    }, void, unknown>;
    [Symbol.asyncIterator](): AsyncGenerator<any, void, unknown>;
}
declare namespace WorkbookReader {
    namespace Options {
        const worksheets: string[];
        const sharedStrings: string[];
        const hyperlinks: string[];
        const styles: string[];
        const entries: string[];
    }
}
import { EventEmitter } from "events";
import StyleManager from "../../xlsx/xform/style/styles-xform.js";
import WorksheetReader from "./worksheet-reader.js";
import HyperlinkReader from "./hyperlink-reader.js";

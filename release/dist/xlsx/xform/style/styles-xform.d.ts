export default StylesXform;
declare class StylesXform extends BaseXform {
    constructor(initialise: any);
    map: {
        numFmts: ListXform;
        fonts: ListXform;
        fills: ListXform;
        borders: ListXform;
        cellStyleXfs: ListXform;
        cellXfs: ListXform;
        dxfs: ListXform;
        numFmt: NumFmtXform;
        font: FontXform;
        fill: FillXform;
        border: BorderXform;
        style: StyleXform;
        cellStyles: StaticXform;
        tableStyles: StaticXform;
        extLst: StaticXform;
    };
    initIndex(): void;
    index: {
        style: {};
        numFmt: {};
        numFmtNextId: number;
        font: {};
        border: {};
        fill: {};
        model?: undefined;
    } | {
        model: any[];
        numFmt: any[];
        style?: undefined;
        numFmtNextId?: undefined;
        font?: undefined;
        border?: undefined;
        fill?: undefined;
    };
    init(): void;
    weakMap: WeakMap<object, any>;
    render(xmlStream: any, model: any): void;
    parseOpen(node: any): boolean;
    parser: any;
    parseClose(name: any): boolean;
    addStyleModel(model: any, cellType: any): any;
    getStyleModel(id: any): any;
    addDxfStyle(style: any): number;
    getDxfStyle(id: any): any;
    _addStyle(style: any): any;
    _addNumFmtStr(formatCode: any): any;
    _addFont(font: any): any;
    _addBorder(border: any): any;
    _addFill(fill: any): any;
}
declare namespace StylesXform {
    export const STYLESHEET_ATTRIBUTES: {
        xmlns: string;
        'xmlns:mc': string;
        'mc:Ignorable': string;
        'xmlns:x14ac': string;
        'xmlns:x16r2': string;
    };
    export namespace STATIC_XFORMS {
        const cellStyles: StaticXform;
        const dxfs: StaticXform;
        const tableStyles: StaticXform;
        const extLst: StaticXform;
    }
    export { StylesXformMock as Mock };
}
import BaseXform from "../base-xform.js";
import ListXform from "../list-xform.js";
import NumFmtXform from "./numfmt-xform.js";
import FontXform from "./font-xform.js";
import FillXform from "./fill-xform.js";
import BorderXform from "./border-xform.js";
import StyleXform from "./style-xform.js";
import StaticXform from "../static-xform.js";
declare class StylesXformMock extends StylesXform {
    constructor();
    model: {
        styles: {
            numFmtId: number;
            fontId: number;
            fillId: number;
            borderId: number;
            xfId: number;
        }[];
        numFmts: any[];
        fonts: {
            size: number;
            color: {
                theme: number;
            };
            name: string;
            family: number;
            scheme: string;
        }[];
        borders: {}[];
        fills: {
            type: string;
            pattern: string;
        }[];
    };
    parseStream(stream: any): Promise<void>;
    addStyleModel(model: any, cellType: any): number;
    get dateStyleId(): number;
    _dateStyleId: number;
    getStyleModel(): {};
}

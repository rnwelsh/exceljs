export default NumFmtXform;
declare class NumFmtXform extends BaseXform {
    constructor(id: any, formatCode: any);
    id: any;
    formatCode: any;
    get tag(): string;
    render(xmlStream: any, model: any): void;
    parseOpen(node: any): boolean;
    parseText(): void;
    parseClose(): boolean;
}
declare namespace NumFmtXform {
    function getDefaultFmtId(formatCode: any): any;
    function getDefaultFmtCode(numFmtId: any): any;
}
import BaseXform from "../base-xform.js";

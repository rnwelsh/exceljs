export default RichTextXform;
declare class RichTextXform extends BaseXform {
    constructor(model: any);
    get tag(): string;
    get textXform(): TextXform;
    _textXform: TextXform;
    get fontXform(): FontXform;
    _fontXform: FontXform;
    render(xmlStream: any, model: any): void;
    parseOpen(node: any): boolean;
    parser: FontXform | TextXform;
    parseClose(name: any): boolean;
}
declare namespace RichTextXform {
    namespace FONT_OPTIONS {
        const tagName: string;
        const fontNameTag: string;
    }
}
import BaseXform from "../base-xform.js";
import TextXform from "./text-xform.js";
import FontXform from "../style/font-xform.js";

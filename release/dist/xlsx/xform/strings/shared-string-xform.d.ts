export default SharedStringXform;
declare class SharedStringXform extends BaseXform {
    constructor(model: any);
    map: {
        r: RichTextXform;
        t: TextXform;
        rPh: PhoneticTextXform;
    };
    get tag(): string;
    render(xmlStream: any, model: any): void;
    parseOpen(node: any): boolean;
    parser: any;
    parseClose(name: any): boolean;
}
import BaseXform from "../base-xform.js";
import RichTextXform from "./rich-text-xform.js";
import TextXform from "./text-xform.js";
import PhoneticTextXform from "./phonetic-text-xform.js";

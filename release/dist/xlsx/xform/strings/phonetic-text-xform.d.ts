export default PhoneticTextXform;
declare class PhoneticTextXform extends BaseXform {
    map: {
        r: RichTextXform;
        t: TextXform;
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

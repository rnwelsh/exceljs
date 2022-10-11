export default TextXform;
declare class TextXform extends BaseXform {
    get tag(): string;
    render(xmlStream: any, model: any): void;
    get model(): string;
    parseOpen(node: any): boolean;
    _text: any[];
    parseClose(): boolean;
}
import BaseXform from "../base-xform.js";

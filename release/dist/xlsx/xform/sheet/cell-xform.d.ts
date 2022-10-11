export default CellXform;
declare class CellXform extends BaseXform {
    richTextXForm: RichTextXform;
    get tag(): string;
    prepare(model: any, options: any): void;
    renderFormula(xmlStream: any, model: any): void;
    render(xmlStream: any, model: any): void;
    parseOpen(node: any): boolean;
    t: any;
    currentNode: string;
    parser: RichTextXform;
    parseClose(name: any): boolean;
}
import BaseXform from "../base-xform.js";
import RichTextXform from "../strings/rich-text-xform.js";

export default ConditionalFormattingsXform;
declare class ConditionalFormattingsXform extends BaseXform {
    cfXform: ConditionalFormattingXform;
    get tag(): string;
    prepare(model: any, options: any): void;
    render(xmlStream: any, model: any): void;
    parseOpen(node: any): boolean;
    parser: ConditionalFormattingXform;
    parseClose(name: any): boolean;
}
import BaseXform from "../../base-xform.js";
import ConditionalFormattingXform from "./conditional-formatting-xform.js";

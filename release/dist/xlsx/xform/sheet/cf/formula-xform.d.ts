export default FormulaXform;
declare class FormulaXform extends BaseXform {
    get tag(): string;
    render(xmlStream: any, model: any): void;
    parseOpen(): void;
    parseClose(name: any): boolean;
}
import BaseXform from "../../base-xform.js";

export default FExtXform;
declare class FExtXform extends BaseXform {
    get tag(): string;
    render(xmlStream: any, model: any): void;
    parseOpen(): void;
    parseClose(name: any): boolean;
}
import BaseXform from "../../base-xform.js";

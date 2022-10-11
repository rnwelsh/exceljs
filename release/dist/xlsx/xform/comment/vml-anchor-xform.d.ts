export default VmlAnchorXform;
declare class VmlAnchorXform extends BaseXform {
    get tag(): string;
    getAnchorRect(anchor: any): number[];
    getDefaultRect(ref: any): any[];
    render(xmlStream: any, model: any): void;
    parseOpen(node: any): boolean;
    text: any;
    parseClose(): boolean;
}
import BaseXform from "../base-xform.js";

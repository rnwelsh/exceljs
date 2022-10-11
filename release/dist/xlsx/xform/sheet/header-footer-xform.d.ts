export default HeaderFooterXform;
declare class HeaderFooterXform extends BaseXform {
    get tag(): string;
    render(xmlStream: any, model: any): void;
    parseOpen(node: any): boolean;
    currentNode: string;
    parseClose(): boolean;
}
import BaseXform from "../base-xform.js";

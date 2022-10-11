export default ExtLstXform;
declare class ExtLstXform extends BaseXform {
    get tag(): string;
    render(xmlStream: any): void;
    parseOpen(node: any): boolean;
    parseText(): void;
    parseClose(name: any): boolean;
}
import BaseXform from "../base-xform.js";

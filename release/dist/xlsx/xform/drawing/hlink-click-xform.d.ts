export default HLinkClickXform;
declare class HLinkClickXform extends BaseXform {
    get tag(): string;
    render(xmlStream: any, model: any): void;
    parseOpen(node: any): boolean;
    parseText(): void;
    parseClose(): boolean;
}
import BaseXform from "../base-xform.js";

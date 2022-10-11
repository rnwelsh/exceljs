export default AppHeadingPairsXform;
declare class AppHeadingPairsXform extends BaseXform {
    render(xmlStream: any, model: any): void;
    parseOpen(node: any): boolean;
    parseText(): void;
    parseClose(name: any): boolean;
}
import BaseXform from "../base-xform.js";

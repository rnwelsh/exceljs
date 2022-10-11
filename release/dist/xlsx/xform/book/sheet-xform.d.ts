export default WorksheetXform;
declare class WorksheetXform extends BaseXform {
    render(xmlStream: any, model: any): void;
    parseOpen(node: any): boolean;
    parseText(): void;
    parseClose(): boolean;
}
import BaseXform from "../base-xform.js";

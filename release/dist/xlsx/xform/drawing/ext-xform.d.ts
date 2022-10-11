export default ExtXform;
declare class ExtXform extends BaseXform {
    constructor(options: any);
    tag: any;
    map: {};
    render(xmlStream: any, model: any): void;
    parseOpen(node: any): boolean;
    parseText(): void;
    parseClose(): boolean;
}
import BaseXform from "../base-xform.js";

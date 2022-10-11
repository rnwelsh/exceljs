export default ColorXform;
declare class ColorXform extends BaseXform {
    constructor(name: any);
    name: any;
    get tag(): any;
    render(xmlStream: any, model: any): boolean;
    parseOpen(node: any): boolean;
    parseText(): void;
    parseClose(): boolean;
}
import BaseXform from "../base-xform.js";

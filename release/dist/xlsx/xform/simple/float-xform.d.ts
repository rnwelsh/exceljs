export default FloatXform;
declare class FloatXform extends BaseXform {
    constructor(options: any);
    tag: any;
    attr: any;
    attrs: any;
    render(xmlStream: any, model: any): void;
    text: any[];
    parseClose(): boolean;
}
import BaseXform from "../base-xform.js";

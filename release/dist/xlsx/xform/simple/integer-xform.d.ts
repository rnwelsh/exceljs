export default IntegerXform;
declare class IntegerXform extends BaseXform {
    constructor(options: any);
    tag: any;
    attr: any;
    attrs: any;
    zero: any;
    render(xmlStream: any, model: any): void;
    parseOpen(node: any): boolean;
    text: any[];
    parseClose(): boolean;
}
import BaseXform from "../base-xform.js";

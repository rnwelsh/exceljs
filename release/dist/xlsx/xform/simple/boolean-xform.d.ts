export default BooleanXform;
declare class BooleanXform extends BaseXform {
    constructor(options: any);
    tag: any;
    attr: any;
    render(xmlStream: any, model: any): void;
    parseText(): void;
    parseClose(): boolean;
}
import BaseXform from "../base-xform.js";

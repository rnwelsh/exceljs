export default VmlProtectionXform;
declare class VmlProtectionXform extends BaseXform {
    constructor(model: any);
    _model: any;
    get tag(): any;
    render(xmlStream: any, model: any): void;
    parseOpen(node: any): boolean;
    text: any;
    parseClose(): boolean;
}
import BaseXform from "../../base-xform.js";

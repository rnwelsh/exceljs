export default VmlPositionXform;
declare class VmlPositionXform extends BaseXform {
    constructor(model: any);
    _model: any;
    get tag(): any;
    render(xmlStream: any, model: any, type: any): void;
    parseOpen(node: any): boolean;
    parseText(): void;
    parseClose(): boolean;
}
import BaseXform from "../../base-xform.js";

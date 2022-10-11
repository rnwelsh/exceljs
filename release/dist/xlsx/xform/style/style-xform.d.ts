export default StyleXform;
declare class StyleXform extends BaseXform {
    constructor(options: any);
    xfId: boolean;
    map: {
        alignment: AlignmentXform;
        protection: ProtectionXform;
    };
    get tag(): string;
    render(xmlStream: any, model: any): void;
    parseOpen(node: any): boolean;
    parser: AlignmentXform | ProtectionXform;
    parseClose(name: any): boolean;
}
import BaseXform from "../base-xform.js";
import AlignmentXform from "./alignment-xform.js";
import ProtectionXform from "./protection-xform.js";

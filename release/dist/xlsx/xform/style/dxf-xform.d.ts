export default DxfXform;
declare class DxfXform extends BaseXform {
    map: {
        alignment: AlignmentXform;
        border: BorderXform;
        fill: FillXform;
        font: FontXform;
        numFmt: NumFmtXform;
        protection: ProtectionXform;
    };
    get tag(): string;
    render(xmlStream: any, model: any): void;
    parseOpen(node: any): boolean;
    parser: any;
    parseClose(name: any): boolean;
}
import BaseXform from "../base-xform.js";
import AlignmentXform from "./alignment-xform.js";
import BorderXform from "./border-xform.js";
import FillXform from "./fill-xform.js";
import FontXform from "./font-xform.js";
import NumFmtXform from "./numfmt-xform.js";
import ProtectionXform from "./protection-xform.js";

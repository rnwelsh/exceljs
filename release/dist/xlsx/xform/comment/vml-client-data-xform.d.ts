export default VmlClientDataXform;
declare class VmlClientDataXform extends BaseXform {
    map: {
        'x:Anchor': VmlAnchorXform;
        'x:Locked': VmlProtectionXform;
        'x:LockText': VmlProtectionXform;
        'x:SizeWithCells': VmlPositionXform;
        'x:MoveWithCells': VmlPositionXform;
    };
    get tag(): string;
    render(xmlStream: any, model: any): void;
    parseOpen(node: any): boolean;
    parser: any;
    parseClose(name: any): boolean;
    normalizeModel(): void;
}
import BaseXform from "../base-xform.js";
import VmlAnchorXform from "./vml-anchor-xform.js";
import VmlProtectionXform from "./style/vml-protection-xform.js";
import VmlPositionXform from "./style/vml-position-xform.js";

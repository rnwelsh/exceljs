export default ProtectionXform;
declare class ProtectionXform extends BaseXform {
    get tag(): string;
    render(xmlStream: any, model: any): void;
    parseText(): void;
    parseClose(): boolean;
}
import BaseXform from "../base-xform.js";

export default CfvoXform;
declare class CfvoXform extends BaseXform {
    get tag(): string;
    render(xmlStream: any, model: any): void;
    parseClose(name: any): boolean;
}
import BaseXform from "../../base-xform.js";

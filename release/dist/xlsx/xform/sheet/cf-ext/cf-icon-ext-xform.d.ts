export default CfIconExtXform;
declare class CfIconExtXform extends BaseXform {
    get tag(): string;
    render(xmlStream: any, model: any): void;
    parseOpen({ attributes }: {
        attributes: any;
    }): void;
    parseClose(name: any): boolean;
}
import BaseXform from "../../base-xform.js";

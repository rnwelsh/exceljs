export default AutoFilterXform;
declare class AutoFilterXform extends BaseXform {
    get tag(): string;
    render(xmlStream: any, model: any): void;
}
import BaseXform from "../base-xform.js";

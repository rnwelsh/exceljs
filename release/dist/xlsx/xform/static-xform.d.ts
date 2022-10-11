export default StaticXform;
declare class StaticXform extends BaseXform {
    constructor(model: any);
    _model: any;
    render(xmlStream: any): void;
    _xml: string;
    parseOpen(): boolean;
    parseText(): void;
    parseClose(name: any): boolean;
}
import BaseXform from "./base-xform.js";

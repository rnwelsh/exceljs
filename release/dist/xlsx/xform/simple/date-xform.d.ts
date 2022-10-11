export default DateXform;
declare class DateXform extends BaseXform {
    constructor(options: any);
    tag: any;
    attr: any;
    attrs: any;
    _format: any;
    _parse: any;
    render(xmlStream: any, model: any): void;
    text: any[];
    parseClose(): boolean;
}
import BaseXform from "../base-xform.js";

export default CellPositionXform;
declare class CellPositionXform extends BaseXform {
    constructor(options: any);
    tag: any;
    map: {
        'xdr:col': IntegerXform;
        'xdr:colOff': IntegerXform;
        'xdr:row': IntegerXform;
        'xdr:rowOff': IntegerXform;
    };
    render(xmlStream: any, model: any): void;
    parseOpen(node: any): boolean;
    parser: any;
    parseClose(name: any): boolean;
}
import BaseXform from "../base-xform.js";
import IntegerXform from "../simple/integer-xform.js";

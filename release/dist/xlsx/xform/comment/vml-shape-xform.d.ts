export default VmlShapeXform;
declare class VmlShapeXform extends BaseXform {
    map: {
        'v:textbox': VmlTextboxXform;
        'x:ClientData': VmlClientDataXform;
    };
    get tag(): string;
    render(xmlStream: any, model: any, index: any): void;
    parseOpen(node: any): boolean;
    parser: any;
    parseClose(name: any): boolean;
}
declare namespace VmlShapeXform {
    function V_SHAPE_ATTRIBUTES(model: any, index: any): {
        id: string;
        type: string;
        style: string;
        fillcolor: string;
        strokecolor: string;
        'o:insetmode': any;
    };
}
import BaseXform from "../base-xform.js";
import VmlTextboxXform from "./vml-textbox-xform.js";
import VmlClientDataXform from "./vml-client-data-xform.js";

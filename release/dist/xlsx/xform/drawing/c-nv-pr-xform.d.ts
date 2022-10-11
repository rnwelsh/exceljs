export default CNvPrXform;
declare class CNvPrXform extends BaseXform {
    map: {
        'a:hlinkClick': HlickClickXform;
        'a:extLst': ExtLstXform;
    };
    get tag(): string;
    render(xmlStream: any, model: any): void;
    parseOpen(node: any): boolean;
    parser: any;
    parseText(): void;
    parseClose(name: any): boolean;
}
import BaseXform from "../base-xform.js";
import HlickClickXform from "./hlink-click-xform.js";
import ExtLstXform from "./ext-lst-xform.js";

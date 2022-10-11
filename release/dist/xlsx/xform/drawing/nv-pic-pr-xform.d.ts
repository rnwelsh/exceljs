export default NvPicPrXform;
declare class NvPicPrXform extends BaseXform {
    map: {
        'xdr:cNvPr': CNvPrXform;
        'xdr:cNvPicPr': CNvPicPrXform;
    };
    get tag(): string;
    render(xmlStream: any, model: any): void;
    parseOpen(node: any): boolean;
    parser: any;
    parseText(): void;
    parseClose(name: any): boolean;
}
import BaseXform from "../base-xform.js";
import CNvPrXform from "./c-nv-pr-xform.js";
import CNvPicPrXform from "./c-nv-pic-pr-xform.js";

export default PicXform;
declare class PicXform extends BaseXform {
    map: {
        'xdr:nvPicPr': NvPicPrXform;
        'xdr:blipFill': BlipFillXform;
        'xdr:spPr': StaticXform;
    };
    get tag(): string;
    prepare(model: any, options: any): void;
    render(xmlStream: any, model: any): void;
    parseOpen(node: any): boolean;
    parser: any;
    parseText(): void;
    parseClose(name: any): boolean;
}
import BaseXform from "../base-xform.js";
import NvPicPrXform from "./nv-pic-pr-xform.js";
import BlipFillXform from "./blip-fill-xform.js";
import StaticXform from "../static-xform.js";

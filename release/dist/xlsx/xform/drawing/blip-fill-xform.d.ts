export default BlipFillXform;
declare class BlipFillXform extends BaseXform {
    map: {
        'a:blip': BlipXform;
    };
    get tag(): string;
    render(xmlStream: any, model: any): void;
    parseOpen(node: any): boolean;
    parser: any;
    parseText(): void;
    parseClose(name: any): boolean;
}
import BaseXform from "../base-xform.js";
import BlipXform from "./blip-xform.js";

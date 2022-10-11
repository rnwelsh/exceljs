export default VmlNotesXform;
declare class VmlNotesXform extends BaseXform {
    map: {
        'v:shape': VmlShapeXform;
    };
    get tag(): string;
    render(xmlStream: any, model: any): void;
    parseOpen(node: any): boolean;
    parser: any;
    parseClose(name: any): boolean;
}
declare namespace VmlNotesXform {
    const DRAWING_ATTRIBUTES: {
        'xmlns:v': string;
        'xmlns:o': string;
        'xmlns:x': string;
    };
}
import BaseXform from "../base-xform.js";
import VmlShapeXform from "./vml-shape-xform.js";

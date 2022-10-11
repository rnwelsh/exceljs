export default SharedStringsXform;
declare class SharedStringsXform extends BaseXform {
    constructor(model: any);
    hash: any;
    rich: any;
    get sharedStringXform(): SharedStringXform;
    _sharedStringXform: SharedStringXform;
    get values(): any;
    get uniqueCount(): any;
    get count(): any;
    getString(index: any): any;
    add(value: any): any;
    addText(value: any): any;
    addRichText(value: any): any;
    render(xmlStream: any, model: any): void;
    parseOpen(node: any): boolean;
    parser: SharedStringXform;
    parseClose(name: any): boolean;
}
import BaseXform from "../base-xform.js";
import SharedStringXform from "./shared-string-xform.js";

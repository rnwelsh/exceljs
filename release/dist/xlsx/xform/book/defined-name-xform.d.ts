export default DefinedNamesXform;
declare class DefinedNamesXform extends BaseXform {
    render(xmlStream: any, model: any): void;
    parseOpen(node: any): boolean;
    _parsedName: any;
    _parsedLocalSheetId: any;
    _parsedText: any[];
    parseClose(): boolean;
}
import BaseXform from "../base-xform.js";

export default DataValidationsXform;
declare class DataValidationsXform extends BaseXform {
    get tag(): string;
    render(xmlStream: any, model: any): void;
    parseOpen(node: any): boolean;
    _address: any;
    _dataValidation: {
        type: any;
        formulae: any[];
    };
    _formula: any[];
    parseClose(name: any): boolean;
}
import BaseXform from "../base-xform.js";

export default DefinedNames;
declare class DefinedNames {
    matrixMap: {};
    getMatrix(name: any): any;
    add(locStr: any, name: any): void;
    addEx(location: any, name: any): void;
    remove(locStr: any, name: any): void;
    removeEx(location: any, name: any): void;
    removeAllNames(location: any): void;
    forEach(callback: any): void;
    getNames(addressStr: any): any[];
    getNamesEx(address: any): any[];
    _explore(matrix: any, cell: any): Range;
    getRanges(name: any, matrix: any): {
        name: any;
        ranges: any;
    };
    normaliseMatrix(matrix: any, sheetName: any): void;
    spliceRows(sheetName: any, start: any, numDelete: any, numInsert: any): void;
    spliceColumns(sheetName: any, start: any, numDelete: any, numInsert: any): void;
    set model(arg: any[]);
    get model(): any[];
}
import Range from "./range.js";

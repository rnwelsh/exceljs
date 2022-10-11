export default SharedStrings;
declare class SharedStrings {
    _values: any[];
    _totalRefs: number;
    _hash: any;
    get count(): number;
    get values(): any[];
    get totalRefs(): number;
    getString(index: any): any;
    add(value: any): any;
}

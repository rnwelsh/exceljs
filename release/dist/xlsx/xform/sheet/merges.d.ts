export default Merges;
declare class Merges {
    merges: {};
    add(merge: any): void;
    get mergeCells(): any[];
    reconcile(mergeCells: any, rows: any): void;
    getMasterAddress(address: any): any;
}

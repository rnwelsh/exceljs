export default Anchor;
declare class Anchor {
    static asInstance(model: any): any;
    constructor(worksheet: any, address: any, offset?: number);
    nativeCol: any;
    nativeColOff: any;
    nativeRow: any;
    nativeRowOff: any;
    set col(arg: any);
    get col(): any;
    set row(arg: any);
    get row(): any;
    worksheet: any;
    get colWidth(): number;
    get rowHeight(): number;
    set model(arg: {
        nativeCol: any;
        nativeColOff: any;
        nativeRow: any;
        nativeRowOff: any;
    });
    get model(): {
        nativeCol: any;
        nativeColOff: any;
        nativeRow: any;
        nativeRowOff: any;
    };
}

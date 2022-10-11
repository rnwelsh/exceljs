export default SheetRelsWriter;
declare class SheetRelsWriter {
    constructor(options: any);
    id: any;
    count: number;
    _hyperlinks: any[];
    _workbook: any;
    get stream(): any;
    _stream: any;
    get length(): number;
    each(fn: any): void;
    get hyperlinksProxy(): HyperlinksProxy;
    _hyperlinksProxy: HyperlinksProxy;
    addHyperlink(hyperlink: any): void;
    addMedia(media: any): string;
    addRelationship(rel: any): string;
    commit(): void;
    _writeOpen(): void;
    _writeRelationship(relationship: any): string;
    _writeClose(): void;
}
declare class HyperlinksProxy {
    constructor(sheetRelsWriter: any);
    writer: any;
    push(hyperlink: any): void;
}

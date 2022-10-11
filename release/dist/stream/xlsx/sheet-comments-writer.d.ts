export default SheetCommentsWriter;
declare class SheetCommentsWriter {
    constructor(worksheet: any, sheetRelsWriter: any, options: any);
    id: any;
    count: number;
    _worksheet: any;
    _workbook: any;
    _sheetRelsWriter: any;
    get commentsStream(): any;
    _commentsStream: any;
    get vmlStream(): any;
    _vmlStream: any;
    _addRelationships(): void;
    vmlRelId: any;
    _addCommentRefs(): void;
    _writeOpen(): void;
    _writeComment(comment: any, index: any): void;
    _writeClose(): void;
    addComments(comments: any): void;
    startedData: boolean;
    commit(): void;
}

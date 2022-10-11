export default CSV;
declare class CSV {
    constructor(workbook: any);
    workbook: any;
    worksheet: any;
    readFile(filename: any, options: any): Promise<any>;
    read(stream: any, options: any): Promise<any>;
    /**
     * @deprecated since version 4.0. You should use `CSV#read` instead. Please follow upgrade instruction: https://github.com/exceljs/exceljs/blob/master/UPGRADE-4.0.md
     */
    createInputStream(): void;
    write(stream: any, options: any): Promise<any>;
    writeFile(filename: any, options: any): Promise<any>;
    writeBuffer(options: any): Promise<any>;
}

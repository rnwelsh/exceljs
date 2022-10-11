export default HyperlinkReader;
declare class HyperlinkReader extends EventEmitter {
    constructor({ workbook, id, iterator, options }: {
        workbook: any;
        id: any;
        iterator: any;
        options: any;
    });
    workbook: any;
    id: any;
    iterator: any;
    options: any;
    get count(): any;
    each(fn: any): any;
    read(): Promise<void>;
    hyperlinks: {};
}
import { EventEmitter } from "events";

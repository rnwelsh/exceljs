export default ExcelJS;
declare namespace ExcelJS {
    export { Workbook };
    export { ModelContainer };
    export namespace stream {
        namespace xlsx {
            export { WorkbookWriter as WorkbookWRiter };
            export { WorkbookReader };
        }
    }
}
import Workbook from "./doc/workbook.js";
import ModelContainer from "./doc/modelcontainer.js";
import WorkbookWriter from "./stream/xlsx/workbook-writer.js";
import WorkbookReader from "./stream/xlsx/workbook-reader.js";

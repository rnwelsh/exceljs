import workbook from "./doc/workbook.js";
import modelcontainer from "./doc/modelcontainer.js";
// import workbookWriter from "./stream/xlsx/workbook-writer.js";
// import workbookReader from "./stream/xlsx/workbook-reader.js";
import enums from "./doc/enums.js";
const ExcelJS = {
    Workbook: workbook,
    ModelContainer: modelcontainer
};
Object.assign(ExcelJS, enums);
export default ExcelJS;

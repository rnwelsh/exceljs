import Workbook from './doc/workbook.js'
import ModelContainer from './doc/modelcontainer.js'
import WorkbookWriter from './stream/xlsx/workbook-writer.js'
import WorkbookReader from './stream/xlsx/workbook-reader.js'
import * as enums from './doc/enums.js'
      

const ExcelJS = {
  Workbook       : Workbook,
  ModelContainer : ModelContainer,
  stream: {
    xlsx: {
      WorkbookWRiter: WorkbookWriter,
      WorkbookReader: WorkbookReader,
    }
  }
}
Object.assign(ExcelJS, enums);

export default ExcelJS
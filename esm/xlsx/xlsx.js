// import { PassThrough } from "node:stream";
import {ZipWriter} from '../utils/zip-stream.js'
import StreamBuf from '../utils/stream-buf.js'
// import {} from "../utils/utils.js";
import XmlStream from '../utils/xml-stream.js'
// import { bufferToString } from "../utils/browser-buffer-decode.js";
import StylesXform from './xform/style/styles-xform.js'
import CoreXform from './xform/core/core-xform.js'
import SharedStringsXform from './xform/strings/shared-strings-xform.js'
import RelationshipsXform from './xform/core/relationships-xform.js'
import ContentTypesXform from './xform/core/content-types-xform.js'
import AppXform from './xform/core/app-xform.js'
import WorkbookXform from './xform/book/workbook-xform.js'
import WorksheetXform from './xform/sheet/worksheet-xform.js'
import DrawingXform from './xform/drawing/drawing-xform.js'
import TableXform from './xform/table/table-xform.js'
import PivotCacheRecordsXform from './xform/pivot-table/pivot-cache-records-xform.js'
import PivotCacheDefinitionXform from './xform/pivot-table/pivot-cache-definition-xform.js'
import PivotTableXform from './xform/pivot-table/pivot-table-xform.js'
import CommentsXform from './xform/comment/comments-xform.js'
import VmlNotesXform from './xform/comment/vml-notes-xform.js'
import theme1Xml from './xml/theme1.js'
import RelType from './rel-type.js'
// function fsReadFileAsync(filename, options) {
//   return new Promise((resolve, reject) => {
//   fs.readFile(filename, options, (error, data) => {
//   if (error) {
//   reject(error);
//   } else {
//   resolve(data);
//   }
//   });
//   });
// }
const now = new Date()
const defaultModel = {
  creator: 'ExcelJS',
  lastModifiedBy: 'ExcelJS',
  created: now,
  modified: now,
  useSharedStrings: true,
  useStyles: true,
  styles: '',
  drawings: [],
  commentRefs: [],
  tables: [],
}

export default class XLSX {
  RelType=RelType
  workbook
  constructor(workbook) {
    this.workbook = workbook
  }
  // ===============================================================================
  // Workbook
  // =========================================================================
  async addMedia(zip, model) {
    await Promise.all(
      model.media.map(async medium => {
        if (medium.type === 'image') {
          const filename = `xl/media/${medium.name}.${medium.extension}`
          // if (medium.filename) {
          //   const data = await fsReadFileAsync(medium.filename);
          //   return zip.append(data, { name: filename });
          // }
          if (medium.buffer) {
            return zip.append(medium.buffer, {name: filename})
          }
          if (medium.base64) {
            const dataimg64 = medium.base64
            const content = dataimg64.substring(dataimg64.indexOf(',') + 1)
            return zip.append(content, {
              name: filename,
              base64: true,
            })
          }
        }
        throw new Error('Unsupported media')
      })
    )
  }

  addDrawings(zip, model) {
    const drawingXform = new DrawingXform()
    const relsXform = new RelationshipsXform()
    model.worksheets.forEach(worksheet => {
      const {drawing} = worksheet
      if (drawing) {
        drawingXform.prepare(drawing, {})
        let xml = drawingXform.toXml(drawing)
        zip.append(xml, {name: `xl/drawings/${drawing.name}.xml`})
        xml = relsXform.toXml(drawing.rels)
        zip.append(xml, {
          name: `xl/drawings/_rels/${drawing.name}.xml.rels`,
        })
      }
    })
  }
  addTables(zip, model) {
    const tableXform = new TableXform()
    model.worksheets.forEach(worksheet => {
      const {tables} = worksheet
      tables.forEach(table => {
        tableXform.prepare(table, {})
        const tableXml = tableXform.toXml(table)
        zip.append(tableXml, {name: `xl/tables/${table.target}`})
      })
    })
  }
  async addContentTypes(zip, model) {
    const xform = new ContentTypesXform()
    const xml = xform.toXml(model)
    zip.append(xml, {name: '[Content_Types].xml'})
  }
  async addApp(zip, model) {
    const xform = new AppXform()
    const xml = xform.toXml(model)
    zip.append(xml, {name: 'docProps/app.xml'})
  }
  async addCore(zip, model) {
    const coreXform = new CoreXform()
    zip.append(coreXform.toXml(model), {name: 'docProps/core.xml'})
  }
  async addThemes(zip, model) {
    const themes = model.themes || {theme1: theme1Xml}
    Object.keys(themes).forEach(name => {
      const xml = themes[name]
      const path = `xl/theme/${name}.xml`
      zip.append(xml, {name: path})
    })
  }
  async addOfficeRels(zip,opts) {
    const xform = new RelationshipsXform()
    const xml = xform.toXml([
      {
        Id: 'rId1',
        Type: RelType.OfficeDocument,
        Target: 'xl/workbook.xml',
      },
      {
        Id: 'rId2',
        Type: RelType.CoreProperties,
        Target: 'docProps/core.xml',
      },
      {
        Id: 'rId3',
        Type: RelType.ExtenderProperties,
        Target: 'docProps/app.xml',
      },
    ])
    zip.append(xml, {name: '_rels/.rels'})
  }
  async addWorkbookRels(zip, model) {
    let count = 1
    const relationships = [
      {Id: `rId${count++}`, Type: RelType.Styles, Target: 'styles.xml'},
      {
        Id: `rId${count++}`,
        Type: RelType.Theme,
        Target: 'theme/theme1.xml',
      },
    ]
    if (model.sharedStrings.count) {
      relationships.push({
        Id: `rId${count++}`,
        Type: RelType.SharedStrings,
        Target: 'sharedStrings.xml',
      })
    }
    if ((model.pivotTables || []).length) {
      const pivotTable = model.pivotTables[0]
      pivotTable.rId = `rId${count++}`
      relationships.push({
        Id: pivotTable.rId,
        Type: RelType.PivotCacheDefinition,
        Target: 'pivotCache/pivotCacheDefinition1.xml',
      })
    }
    model.worksheets.forEach(worksheet => {
      worksheet.rId = `rId${count++}`
      relationships.push({
        Id: worksheet.rId,
        Type: RelType.Worksheet,
        Target: `worksheets/sheet${worksheet.id}.xml`,
      })
    })
    const xform = new RelationshipsXform()
    const xml = xform.toXml(relationships)
    zip.append(xml, {name: 'xl/_rels/workbook.xml.rels'})
  }
  async addSharedStrings(zip, model) {
    if (model.sharedStrings && model.sharedStrings.count) {
      zip.append(model.sharedStrings.xml, {
        name: 'xl/sharedStrings.xml',
      })
    }
  }
  async addStyles(zip, model) {
    const {xml} = model.styles
    if (xml) {
      zip.append(xml, {name: 'xl/styles.xml'})
    }
  }
  async addWorkbook(zip, model) {
    const xform = new WorkbookXform()
    zip.append(xform.toXml(model), {name: 'xl/workbook.xml'})
  }
  async addWorksheets(zip, model) {
    const worksheetXform = new WorksheetXform()
    const relationshipsXform = new RelationshipsXform()
    const commentsXform = new CommentsXform()
    const vmlNotesXform = new VmlNotesXform()

    model.worksheets.forEach(worksheet => {
      let xmlStream = new XmlStream()

      worksheetXform.render(xmlStream, worksheet)
      zip.append(xmlStream.xml, {
        name: `xl/worksheets/sheet${worksheet.id}.xml`,
      })

      if (worksheet.rels && worksheet.rels.length) {
        xmlStream = new XmlStream()
        relationshipsXform.render(xmlStream, worksheet.rels)
        zip.append(xmlStream.xml, {
          name: `xl/worksheets/_rels/sheet${worksheet.id}.xml.rels`,
        })
      }
      if (worksheet.comments.length > 0) {
        xmlStream = new XmlStream()
        commentsXform.render(xmlStream, worksheet)
        zip.append(xmlStream.xml, {
          name: `xl/comments${worksheet.id}.xml`,
        })
        xmlStream = new XmlStream()
        vmlNotesXform.render(xmlStream, worksheet)
        zip.append(xmlStream.xml, {
          name: `xl/drawings/vmlDrawing${worksheet.id}.vml`,
        })
      }
    })
  }
  addPivotTables(zip, model) {
    if (!model.pivotTables.length) return

    const pivotTable = model.pivotTables[0]

    const pivotCacheRecordsXform = new PivotCacheRecordsXform()
    const pivotCacheDefinitionXform = new PivotCacheDefinitionXform()
    const pivotTableXform = new PivotTableXform()
    const relsXform = new RelationshipsXform()

    let xml = pivotCacheRecordsXform.toXml(pivotTable)
    zip.append(xml, {name: 'xl/pivotCache/pivotCacheRecords1.xml'})
    xml = pivotCacheDefinitionXform.toXml(pivotTable)
    zip.append(xml, {name: 'xl/pivotCache/pivotCacheDefinition1.xml'})

    xml = relsXform.toXml([
      {
        Id: 'rId1',
        Type: RelType.PivotCacheRecords,
        Target: 'pivotCacheRecords1.xml',
      },
    ])
    zip.append(xml, {name: 'xl/pivotCache/_rels/pivotCacheDefinition1.xml.rels'})

    xml = pivotTableXform.toXml(pivotTable)
    zip.append(xml, {name: 'xl/pivotTables/pivotTable1.xml'})

    xml = relsXform.toXml([
      {
        Id: 'rId1',
        Type: RelType.PivotCacheDefinition,
        Target: '../pivotCache/pivotCacheDefinition1.xml',
      },
    ])
    zip.append(xml, {name: 'xl/pivotTables/_rels/pivotTable1.xml.rels'})
  }
  _finalize(zip) {
    return new Promise((resolve, reject) => {
      zip.on('finish', () => {
        resolve(this)
      })
      zip.on('error', reject)
      zip.finalize()
    })
  }
  prepareModel(model, options) {
    model = Object.assign(defaultModel, model)
    model.useSharedStrings = options.useSharedStrings ?? true
    model.useStyles = options.useStyles ?? true
    model.sharedStrings = new SharedStringsXform()
    model.styles = model.useStyles && new StylesXform(true)

    const workbookXform = new WorkbookXform()
    const worksheetXform = new WorksheetXform()
    workbookXform.prepare(model)

    const worksheetOptions = {
      sharedStrings: model.sharedStrings,
      styles: model.styles,
      date1904: model.properties.date1904,
      drawingsCount: 0,
      media: model.media,
      drawings: model.drawings,
      commentRefs: model.commentRefs,
    }
    model.worksheets.forEach(worksheet => {
      worksheet.tables.forEach((table,tableCount) => {
        table.target = `table${tableCount}.xml`
        table.id = tableCount
        model.tables.push(table)
      })
      worksheetXform.prepare(worksheet, worksheetOptions)
    })
    // TODO: workbook drawing list
  }
  /**
   * @param {Object} options
   * @param {any} options.zip
   */
  async write(stream, options) {
    options = options || {}
    const {model} = this.workbook
    const zip = new ZipWriter(options.zip)
    zip.pipe(stream)
    this.prepareModel(model, options)
    // render
    await this.addContentTypes(zip, model)
    await this.addOfficeRels(zip, model)
    await this.addWorkbookRels(zip, model)
    await this.addWorksheets(zip, model)
    await this.addSharedStrings(zip, model) // always after worksheets
    await this.addDrawings(zip, model)
    await this.addTables(zip, model)
    await this.addPivotTables(zip, model)
    await Promise.all([this.addThemes(zip, model), this.addStyles(zip, model)])
    await this.addMedia(zip, model)
    await Promise.all([this.addApp(zip, model), this.addCore(zip, model)])
    await this.addWorkbook(zip, model)
    return this._finalize(zip)
  }
  // writeFile(filename, options) {
  //   const stream = fs.createWriteStream(filename);
  //   return new Promise((resolve, reject) => {
  //   stream.on('finish', () => {
  //   resolve();
  //   });
  //   stream.on('error', error => {
  //   reject(error);
  //   });
  //   this.write(stream, options)
  //   .then(() => {
  //   stream.end();
  //   })
  //   .catch(err => {
  //   reject(err);
  //   });
  //   });
  // }
  async writeBuffer(options) {
    const stream = new StreamBuf()
    await this.write(stream, options)
    return stream.read()
  }
}

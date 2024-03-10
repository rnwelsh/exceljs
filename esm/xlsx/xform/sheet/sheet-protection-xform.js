import { some } from "../../../utils/under-dash.js"
import BaseXform from "../base-xform.js"
function booleanToXml(model, value) {
  return model ? value : undefined
}
function xmlToBoolean(value, equals) {
  return value === equals ? true : undefined
}
class SheetProtectionXform extends BaseXform {
  get tag() {
    return 'sheetProtection'
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    if (model) {
      const atts = {
        sheet: booleanToXml(model.sheet, '1'),
        selectLockedCells: model.selectLockedCells === false ? '1' : undefined,
        selectUnlockedCells: model.selectUnlockedCells === false ? '1' : undefined,
        formatCells: booleanToXml(model.formatCells, '0'),
        formatColumns: booleanToXml(model.formatColumns, '0'),
        formatRows: booleanToXml(model.formatRows, '0'),
        insertColumns: booleanToXml(model.insertColumns, '0'),
        insertRows: booleanToXml(model.insertRows, '0'),
        insertHyperlinks: booleanToXml(model.insertHyperlinks, '0'),
        deleteColumns: booleanToXml(model.deleteColumns, '0'),
        deleteRows: booleanToXml(model.deleteRows, '0'),
        sort: booleanToXml(model.sort, '0'),
        autoFilter: booleanToXml(model.autoFilter, '0'),
        pivotTables: booleanToXml(model.pivotTables, '0'),
      }
      if (model.sheet) {
        atts.algorithmName = model.algorithmName
        atts.hashValue = model.hashValue
        atts.saltValue = model.saltValue
        atts.spinCount = model.spinCount
        atts.objects = booleanToXml(model.objects === false, '1')
        atts.scenarios = booleanToXml(model.scenarios === false, '1')
      }
      if (some(atts, value => value !== undefined)) {
        xmlStream.lN(this.tag, atts)
      }
    }
  }
  parseOpen(node) {
    switch (node.name) {
      case this.tag:
        this.model = {
          sheet: xmlToBoolean(node.atts.sheet, '1'),
          objects: node.atts.objects === '1' ? false : undefined,
          scenarios: node.atts.scenarios === '1' ? false : undefined,
          selectLockedCells: node.atts.selectLockedCells === '1' ? false : undefined,
          selectUnlockedCells: node.atts.selectUnlockedCells === '1' ? false : undefined,
          formatCells: xmlToBoolean(node.atts.formatCells, '0'),
          formatColumns: xmlToBoolean(node.atts.formatColumns, '0'),
          formatRows: xmlToBoolean(node.atts.formatRows, '0'),
          insertColumns: xmlToBoolean(node.atts.insertColumns, '0'),
          insertRows: xmlToBoolean(node.atts.insertRows, '0'),
          insertHyperlinks: xmlToBoolean(node.atts.insertHyperlinks, '0'),
          deleteColumns: xmlToBoolean(node.atts.deleteColumns, '0'),
          deleteRows: xmlToBoolean(node.atts.deleteRows, '0'),
          sort: xmlToBoolean(node.atts.sort, '0'),
          autoFilter: xmlToBoolean(node.atts.autoFilter, '0'),
          pivotTables: xmlToBoolean(node.atts.pivotTables, '0'),
        }
        if (node.atts.algorithmName) {
          this.model.algorithmName = node.atts.algorithmName
          this.model.hashValue = node.atts.hashValue
          this.model.saltValue = node.atts.saltValue
          this.model.spinCount = parseInt(node.atts.spinCount, 10)
        }
        return true
      default:
        return false
    }
  }
  parseText() { }
  parseClose() {
    return false
  }
}
export default SheetProtectionXform

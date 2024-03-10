import { some } from "../../../utils/under-dash.js"
import BaseXform from "../base-xform.js"
class SheetFormatPropertiesXform extends BaseXform {
  get tag() {
    return 'sheetFormatPr'
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    if (model) {
      const atts = {
        defaultRowHeight: model.defaultRowHeight,
        outlineLevelRow: model.outlineLevelRow,
        outlineLevelCol: model.outlineLevelCol,
        'x14ac:dyDescent': model.dyDescent,
      }
      if (model.defaultColWidth) {
        atts.defaultColWidth = model.defaultColWidth
      }
      // default value for 'defaultRowHeight' is 15, this should not be 'custom'
      if (!model.defaultRowHeight || model.defaultRowHeight !== 15) {
        atts.customHeight = '1'
      }
      if (some(atts, value => value !== undefined)) {
        xmlStream.lN('sheetFormatPr', atts)
      }
    }
  }
  parseOpen(node) {
    if (node.name === 'sheetFormatPr') {
      this.model = {
        defaultRowHeight: parseFloat(node.atts.defaultRowHeight || '0'),
        dyDescent: parseFloat(node.atts['x14ac:dyDescent'] || '0'),
        outlineLevelRow: parseInt(node.atts.outlineLevelRow || '0', 10),
        outlineLevelCol: parseInt(node.atts.outlineLevelCol || '0', 10),
      }
      if (node.atts.defaultColWidth) {
        this.model.defaultColWidth = parseFloat(node.atts.defaultColWidth)
      }
      return true
    }
    return false
  }
  parseText() { }
  parseClose() {
    return false
  }
}
export default SheetFormatPropertiesXform

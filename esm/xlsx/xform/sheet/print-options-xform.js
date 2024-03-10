// import  from "../../../utils/under-dash.js";
import BaseXform from "../base-xform.js"
function booleanToXml(model) {
  return model ? '1' : undefined
}
class PrintOptionsXform extends BaseXform {
  get tag() {
    return 'printOptions'
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    if (model) {
      const atts = {
        headings: booleanToXml(model.showRowColHeaders),
        gridLines: booleanToXml(model.showGridLines),
        horizontalCentered: booleanToXml(model.horizontalCentered),
        verticalCentered: booleanToXml(model.verticalCentered),
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
          showRowColHeaders: node.atts.headings === '1',
          showGridLines: node.atts.gridLines === '1',
          horizontalCentered: node.atts.horizontalCentered === '1',
          verticalCentered: node.atts.verticalCentered === '1',
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
export default PrintOptionsXform

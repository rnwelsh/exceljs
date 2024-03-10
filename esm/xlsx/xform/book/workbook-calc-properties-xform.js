import BaseXform from "../base-xform.js"
class WorkbookCalcPropertiesXform extends BaseXform {
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    xmlStream.lN('calcPr', {
      calcId: 171027,
      fullCalcOnLoad: model.fullCalcOnLoad ? 1 : undefined,
    })
  }
  parseOpen(node) {
    if (node.name === 'calcPr') {
      this.model = {}
      return true
    }
    return false
  }
  parseText() { }
  parseClose() {
    return false
  }
}
export default WorkbookCalcPropertiesXform

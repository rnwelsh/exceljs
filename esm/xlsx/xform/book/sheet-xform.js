import BaseXform from "../base-xform.js"
class WorksheetXform extends BaseXform {
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    xmlStream.lN('sheet', {
      sheetId: model.id,
      name: model.name,
      state: model.state,
      'r:id': model.rId,
    })
  }
  parseOpen(node) {
    if (node.name === 'sheet') {
      this.model = {
        name: utils.xmlDecode(node.atts.name),
        id: parseInt(node.atts.sheetId, 10),
        state: node.atts.state,
        rId: node.atts['r:id'],
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
export default WorksheetXform

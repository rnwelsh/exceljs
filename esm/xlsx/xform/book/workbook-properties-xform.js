import BaseXform from "../base-xform.js"
class WorksheetPropertiesXform extends BaseXform {
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    xmlStream.lN('workbookPr', {
      date1904: model.date1904 ? 1 : undefined,
      defaultThemeVersion: 164011,
      filterPrivacy: 1,
    })
  }
  parseOpen(node) {
    if (node.name === 'workbookPr') {
      this.model = {
        date1904: node.atts.date1904 === '1',
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
export default WorksheetPropertiesXform

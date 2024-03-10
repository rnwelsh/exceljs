import BaseXform from "../base-xform.js"
class PageSetupPropertiesXform extends BaseXform {
  get tag() {
    return 'pageSetUpPr'
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    if (model && model.fitToPage) {
      xmlStream.lN(this.tag, {
        fitToPage: model.fitToPage ? '1' : undefined,
      })
      return true
    }
    return false
  }
  parseOpen(node) {
    if (node.name === this.tag) {
      this.model = {
        fitToPage: node.atts.fitToPage === '1',
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
export default PageSetupPropertiesXform

import BaseXform from "../base-xform.js"
class PageBreaksXform extends BaseXform {
  get tag() {
    return 'brk'
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    xmlStream.lN('brk', model)
  }
  parseOpen(node) {
    if (node.name === 'brk') {
      this.model = node.atts.ref
      return true
    }
    return false
  }
  parseText() { }
  parseClose() {
    return false
  }
}
export default PageBreaksXform

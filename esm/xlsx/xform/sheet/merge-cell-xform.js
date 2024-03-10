import BaseXform from "../base-xform.js"
class MergeCellXform extends BaseXform {
  get tag() {
    return 'mergeCell'
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    xmlStream.lN('mergeCell', { ref: model })
  }
  parseOpen(node) {
    if (node.name === 'mergeCell') {
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
export default MergeCellXform

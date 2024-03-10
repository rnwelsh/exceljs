import BaseXform from "../base-xform.js"
class DimensionXform extends BaseXform {
  get tag() {
    return 'dimension'
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    if (model) {
      xmlStream.lN('dimension', { ref: model })
    }
  }
  parseOpen(node) {
    if (node.name === 'dimension') {
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
export default DimensionXform

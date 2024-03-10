import BaseXform from "../base-xform.js"
class BooleanXform extends BaseXform {
  constructor(options) {
    super()
    this.tag = options.tag
    this.attr = options.attr
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    if (model) {
      xmlStream.oN(this.tag)
      xmlStream.cN()
    }
  }
  parseOpen(node) {
    if (node.name === this.tag) {
      this.model = true
    }
  }
  parseText() { }
  parseClose() {
    return false
  }
}
export default BooleanXform

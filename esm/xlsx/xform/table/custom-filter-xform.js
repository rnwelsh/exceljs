import BaseXform from "../base-xform.js"
class CustomFilterXform extends BaseXform {
  get tag() {
    return 'customFilter'
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    xmlStream.lN(this.tag, {
      val: model.val,
      operator: model.operator,
    })
  }
  parseOpen(node) {
    if (node.name === this.tag) {
      this.model = {
        val: node.atts.val,
        operator: node.atts.operator,
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
export default CustomFilterXform

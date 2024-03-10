import BaseXform from "../base-xform.js"
class FilterXform extends BaseXform {
  get tag() {
    return 'filter'
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    xmlStream.lN(this.tag, {
      val: model.val,
    })
  }
  parseOpen(node) {
    if (node.name === this.tag) {
      this.model = {
        val: node.atts.val,
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
export default FilterXform

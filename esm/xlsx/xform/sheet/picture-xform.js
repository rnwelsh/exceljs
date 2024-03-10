import BaseXform from "../base-xform.js"
class PictureXform extends BaseXform {
  get tag() {
    return 'picture'
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    if (model) {
      xmlStream.lN(this.tag, { 'r:id': model.rId })
    }
  }
  parseOpen(node) {
    switch (node.name) {
      case this.tag:
        this.model = {
          rId: node.atts['r:id'],
        }
        return true
      default:
        return false
    }
  }
  parseText() { }
  parseClose() {
    return false
  }
}
export default PictureXform

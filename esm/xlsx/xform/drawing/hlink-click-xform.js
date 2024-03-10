import BaseXform from "../base-xform.js"
class HLinkClickXform extends BaseXform {
  get tag() {
    return 'a:hlinkClick'
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    if (!(model.hyperlinks && model.hyperlinks.rId)) {
      return
    }
    xmlStream.lN(this.tag, {
      'xmlns:r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
      'r:id': model.hyperlinks.rId,
      tooltip: model.hyperlinks.tooltip,
    })
  }
  parseOpen(node) {
    switch (node.name) {
      case this.tag:
        this.model = {
          hyperlinks: {
            rId: node.atts['r:id'],
            tooltip: node.atts.tooltip,
          },
        }
        return true
      default:
        return true
    }
  }
  parseText() { }
  parseClose() {
    return false
  }
}
export default HLinkClickXform

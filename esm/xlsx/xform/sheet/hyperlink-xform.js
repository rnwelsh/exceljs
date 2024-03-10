import BaseXform from "../base-xform.js"
class HyperlinkXform extends BaseXform {
  get tag() {
    return 'hyperlink'
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    if (this.isInternalLink(model)) {
      xmlStream.lN('hyperlink', {
        ref: model.address,
        'r:id': model.rId,
        tooltip: model.tooltip,
        location: model.target,
      })
    }
    else {
      xmlStream.lN('hyperlink', {
        ref: model.address,
        'r:id': model.rId,
        tooltip: model.tooltip,
      })
    }
  }
  parseOpen(node) {
    if (node.name === 'hyperlink') {
      this.model = {
        address: node.atts.ref,
        rId: node.atts['r:id'],
        tooltip: node.atts.tooltip,
      }
      // This is an internal link
      if (node.atts.location) {
        this.model.target = node.atts.location
      }
      return true
    }
    return false
  }
  parseText() { }
  parseClose() {
    return false
  }
  isInternalLink(model) {
    // @example: Sheet2!D3, return true
    return model.target && /^[^!]+![a-zA-Z]+[\d]+$/.test(model.target)
  }
}
export default HyperlinkXform

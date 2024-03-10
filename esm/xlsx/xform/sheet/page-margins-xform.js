import { some } from "../../../utils/under-dash.js"
import BaseXform from "../base-xform.js"
class PageMarginsXform extends BaseXform {
  get tag() {
    return 'pageMargins'
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    if (model) {
      const atts = {
        left: model.left,
        right: model.right,
        top: model.top,
        bottom: model.bottom,
        header: model.header,
        footer: model.footer,
      }
      if (some(atts, value => value !== undefined)) {
        xmlStream.lN(this.tag, atts)
      }
    }
  }
  parseOpen(node) {
    switch (node.name) {
      case this.tag:
        this.model = {
          left: parseFloat(node.atts.left || 0.7),
          right: parseFloat(node.atts.right || 0.7),
          top: parseFloat(node.atts.top || 0.75),
          bottom: parseFloat(node.atts.bottom || 0.75),
          header: parseFloat(node.atts.header || 0.3),
          footer: parseFloat(node.atts.footer || 0.3),
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
export default PageMarginsXform

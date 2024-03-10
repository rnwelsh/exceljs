import { parseBoolean } from "../../../utils/utils.js"
import BaseXform from "../base-xform.js"
class ColXform extends BaseXform {
  get tag() {
    return 'col'
  }
  prepare(model, options) {
    const styleId = options.styles.addStyleModel(model.style || {})
    if (styleId) {
      model.styleId = styleId
    }
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    xmlStream.oN('col')
    xmlStream.addA('min', model.min)
    xmlStream.addA('max', model.max)
    if (model.width) {
      xmlStream.addA('width', model.width)
    }
    if (model.styleId) {
      xmlStream.addA('style', model.styleId)
    }
    if (model.hidden) {
      xmlStream.addA('hidden', '1')
    }
    if (model.bestFit) {
      xmlStream.addA('bestFit', '1')
    }
    if (model.outlineLevel) {
      xmlStream.addA('outlineLevel', model.outlineLevel)
    }
    if (model.collapsed) {
      xmlStream.addA('collapsed', '1')
    }
    xmlStream.addA('customWidth', '1')
    xmlStream.cN()
  }
  parseOpen(node) {
    if (node.name === 'col') {
      const model = (this.model = {
        min: parseInt(node.atts.min || '0', 10),
        max: parseInt(node.atts.max || '0', 10),
        width: node.atts.width === undefined
          ? undefined
          : parseFloat(node.atts.width || '0'),
      })
      if (node.atts.style) {
        model.styleId = parseInt(node.atts.style, 10)
      }
      if (parseBoolean(node.atts.hidden)) {
        model.hidden = true
      }
      if (parseBoolean(node.atts.bestFit)) {
        model.bestFit = true
      }
      if (node.atts.outlineLevel) {
        model.outlineLevel = parseInt(node.atts.outlineLevel, 10)
      }
      if (parseBoolean(node.atts.collapsed)) {
        model.collapsed = true
      }
      return true
    }
    return false
  }
  parseText() { }
  parseClose() {
    return false
  }
  reconcile(model, options) {
    // reconcile column styles
    if (model.styleId) {
      model.style = options.styles.getStyleModel(model.styleId)
    }
  }
}
export default ColXform

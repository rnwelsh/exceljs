import BaseXform from "../base-xform.js"
// Color encapsulates translation from color model to/from xlsx
class ColorXform extends BaseXform {
  constructor(name) {
    super()
    // this.name controls the xm node name
    this.name = name || 'color'
  }
  get tag() {
    return this.name
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    if (model) {
      xmlStream.oN(this.name)
      if (model.argb) {
        xmlStream.addA('rgb', model.argb)
      }
      else if (model.theme !== undefined) {
        xmlStream.addA('theme', model.theme)
        if (model.tint !== undefined) {
          xmlStream.addA('tint', model.tint)
        }
      }
      else if (model.indexed !== undefined) {
        xmlStream.addA('indexed', model.indexed)
      }
      else {
        xmlStream.addA('auto', '1')
      }
      xmlStream.cN()
      return true
    }
    return false
  }
  parseOpen(node) {
    if (node.name === this.name) {
      if (node.atts.rgb) {
        this.model = { argb: node.atts.rgb }
      }
      else if (node.atts.theme) {
        this.model = { theme: parseInt(node.atts.theme, 10) }
        if (node.atts.tint) {
          this.model.tint = parseFloat(node.atts.tint)
        }
      }
      else if (node.atts.indexed) {
        this.model = { indexed: parseInt(node.atts.indexed, 10) }
      }
      else {
        this.model = undefined
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
export default ColorXform

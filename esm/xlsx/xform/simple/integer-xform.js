import BaseXform from "../base-xform.js"
class IntegerXform extends BaseXform {
  constructor(options) {
    super()
    this.tag = options.tag
    this.attr = options.attr
    this.attrs = options.attrs
    // option to render zero
    this.zero = options.zero
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    // int is different to float in that zero is not rendered
    if (model || this.zero) {
      xmlStream.oN(this.tag)
      if (this.attrs) {
        xmlStream.addAs(this.attrs)
      }
      if (this.attr) {
        xmlStream.addA(this.attr, model)
      }
      else {
        xmlStream.writeText(model)
      }
      xmlStream.cN()
    }
  }
  parseOpen(node) {
    if (node.name === this.tag) {
      if (this.attr) {
        this.model = parseInt(node.atts[this.attr], 10)
      }
      else {
        this.text = []
      }
      return true
    }
    return false
  }
  parseText(text) {
    if (!this.attr) {
      this.text.push(text)
    }
  }
  parseClose() {
    if (!this.attr) {
      this.model = parseInt(this.text.join('') || 0, 10)
    }
    return false
  }
}
export default IntegerXform

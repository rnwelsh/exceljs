import BaseXform from "../base-xform.js"
class StringXform extends BaseXform {
  constructor(options) {
    super()
    this.tag = options.tag
    this.attr = options.attr
    this.attrs = options.attrs
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    if (model !== undefined) {
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
        this.model = node.atts[this.attr]
      }
      else {
        this.text = []
      }
    }
  }
  parseText(text) {
    if (!this.attr) {
      this.text.push(text)
    }
  }
  parseClose() {
    if (!this.attr) {
      this.model = this.text.join('')
    }
    return false
  }
}
export default StringXform

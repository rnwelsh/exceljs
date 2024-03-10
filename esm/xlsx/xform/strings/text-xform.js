import BaseXform from "../base-xform.js"
//   <t xml:space="preserve"> is </t>
class TextXform extends BaseXform {
  get tag() {
    return 't'
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    xmlStream.oN('t')
    if (/^\s|\n|\s$/.test(model)) {
      xmlStream.addA('xml:space', 'preserve')
    }
    xmlStream.writeText(model)
    xmlStream.cN()
  }
  get model() {
    return this._text
      .join('')
      .replace(/_x([0-9A-F]{4})_/g, ($0, $1) => String.fromCharCode(parseInt($1, 16)))
  }
  parseOpen(node) {
    switch (node.name) {
      case 't':
        this._text = []
        return true
      default:
        return false
    }
  }
  parseText(text) {
    this._text.push(text)
  }
  parseClose() {
    return false
  }
}
export default TextXform

import BaseXform from "../../base-xform.js"
class FormulaXform extends BaseXform {
  get tag() {
    return 'formula'
  }


  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    xmlStream.lN(this.tag, null, model)
  }
  parseOpen() {
    this.model = ''
  }
  parseText(text) {
    this.model += text
  }
  parseClose(name) {
    return name !== this.tag
  }
}
export default FormulaXform

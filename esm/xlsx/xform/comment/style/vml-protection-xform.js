import BaseXform from "../../base-xform.js"
class VmlProtectionXform extends BaseXform {
  constructor(model) {
    super()
    this._model = model
  }
  get tag() {
    return this._model && this._model.tag
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    xmlStream.lN(this.tag, null, model)
  }
  parseOpen(node) {
    switch (node.name) {
      case this.tag:
        this.text = ''
        return true
      default:
        return false
    }
  }
  parseText(text) {
    this.text = text
  }
  parseClose() {
    return false
  }
}
export default VmlProtectionXform

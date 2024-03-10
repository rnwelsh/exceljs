import BaseXform from "../base-xform.js"
class UnderlineXform extends BaseXform {
  constructor(model) {
    super()
    this.model = model
  }
  get tag() {
    return 'u'
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    model = model || this.model
    if (model === true) {
      xmlStream.lN('u')
    }
    else {
      const attr = UnderlineXform.atts[model]
      if (attr) {
        xmlStream.lN('u', attr)
      }
    }
  }
  parseOpen(node) {
    if (node.name === 'u') {
      this.model = node.atts.val || true
    }
  }
  parseText() { }
  parseClose() {
    return false
  }
}
UnderlineXform.atts = {
  single: {},
  double: { val: 'double' },
  singleAccounting: { val: 'singleAccounting' },
  doubleAccounting: { val: 'doubleAccounting' },
}
export default UnderlineXform

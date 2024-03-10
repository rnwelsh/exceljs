import BaseXform from "../base-xform.js"
class VmlTextboxXform extends BaseXform {
  get tag() {
    return 'v:textbox'
  }
  conversionUnit(value, multiple, unit) {
    return `${parseFloat(value) * multiple.toFixed(2)}${unit}`
  }
  reverseConversionUnit(inset) {
    return (inset || '').split(',').map(margin => {
      return Number(parseFloat(this.conversionUnit(parseFloat(margin), 0.1, '')).toFixed(2))
    })
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    const atts = {
      style: 'mso-direction-alt:auto',
    }
    if (model && model.note) {
      let { inset } = model.note && model.note.margins
      if (Array.isArray(inset)) {
        inset = inset
          .map(margin => {
            return this.conversionUnit(margin, 10, 'mm')
          })
          .join(',')
      }
      if (inset) {
        atts.inset = inset
      }
    }
    xmlStream.oN('v:textbox', atts)
    xmlStream.lN('div', { style: 'text-align:left' })
    xmlStream.cN()
  }
  parseOpen(node) {
    switch (node.name) {
      case this.tag:
        this.model = {
          inset: this.reverseConversionUnit(node.atts.inset),
        }
        return true
      default:
        return true
    }
  }
  parseText() { }
  parseClose(name) {
    switch (name) {
      case this.tag:
        return false
      default:
        return true
    }
  }
}
export default VmlTextboxXform

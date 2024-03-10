import BaseXform from "../base-xform.js"
const validation = {
  boolean(value, dflt) {
    if (value === undefined) {
      return dflt
    }
    return value
  },
}
// Protection encapsulates translation from style.protection model to/from xlsx
class ProtectionXform extends BaseXform {
  get tag() {
    return 'protection'
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    xmlStream.addRollback()
    xmlStream.oN('protection')
    let isValid = false
    function add(name, value) {
      if (value !== undefined) {
        xmlStream.addA(name, value)
        isValid = true
      }
    }
    add('locked', validation.boolean(model.locked, true) ? undefined : '0')
    add('hidden', validation.boolean(model.hidden, false) ? '1' : undefined)
    xmlStream.cN()
    if (isValid) {
      xmlStream.commit()
    }
    else {
      xmlStream.rollback()
    }
  }
  parseOpen(node) {
    const model = {
      locked: !(node.atts.locked === '0'),
      hidden: node.atts.hidden === '1',
    }
    // only want to record models that differ from defaults
    const isSignificant = !model.locked || model.hidden
    this.model = isSignificant ? model : null
  }
  parseText() { }
  parseClose() {
    return false
  }
}
export default ProtectionXform

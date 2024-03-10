import BaseXform from "../base-xform.js"
const isDefined = attr => typeof attr !== 'undefined'
class OutlinePropertiesXform extends BaseXform {
  get tag() {
    return 'outlinePr'
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    if (model && (isDefined(model.summaryBelow) || isDefined(model.summaryRight))) {
      xmlStream.lN(this.tag, {
        summaryBelow: isDefined(model.summaryBelow) ? Number(model.summaryBelow) : undefined,
        summaryRight: isDefined(model.summaryRight) ? Number(model.summaryRight) : undefined,
      })
      return true
    }
    return false
  }
  parseOpen(node) {
    if (node.name === this.tag) {
      this.model = {
        summaryBelow: isDefined(node.atts.summaryBelow)
          ? Boolean(Number(node.atts.summaryBelow))
          : undefined,
        summaryRight: isDefined(node.atts.summaryRight)
          ? Boolean(Number(node.atts.summaryRight))
          : undefined,
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
export default OutlinePropertiesXform

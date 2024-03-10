import BaseXform from "../../base-xform.js"
class CfvoXform extends BaseXform {
  get tag() {
    return 'cfvo'
  }


  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    xmlStream.lN(this.tag, {
      type: model.type,
      val: model.value,
    })
  }
  parseOpen(node) {
    this.model = {
      type: node.atts.type,
      value: BaseXform.toFloatValue(node.atts.val),
    }
  }
  parseClose(name) {
    return name !== this.tag
  }
}
export default CfvoXform

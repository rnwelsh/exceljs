import BaseXform from "../../base-xform.js"
class CfIconExtXform extends BaseXform {
  get tag() {
    return 'x14:cfIcon'
  }


  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    xmlStream.lN(this.tag, {
      iconSet: model.iconSet,
      iconId: model.iconId,
    })
  }
  parseOpen({ atts }) {
    this.model = {
      iconSet: atts.iconSet,
      iconId: BaseXform.toIntValue(atts.iconId),
    }
  }
  parseClose(name) {
    return name !== this.tag
  }
}
export default CfIconExtXform

import BaseXform from "../../base-xform.js"
import CompositeXform from "../../composite-xform.js"
import CfvoXform from "./cfvo-xform.js"
class IconSetXform extends CompositeXform {
  constructor() {
    super()
    this.map = {
      cfvo: (this.cfvoXform = new CfvoXform()),
    }
  }
  get tag() {
    return 'iconSet'
  }


  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    xmlStream.oN(this.tag, {
      iconSet: BaseXform.toStringAttribute(model.iconSet, '3TrafficLights'),
      reverse: BaseXform.toBoolAttribute(model.reverse, false),
      showValue: BaseXform.toBoolAttribute(model.showValue, true),
    })
    model.cfvo.forEach(cfvo => {
      this.cfvoXform.render(xmlStream, cfvo)
    })
    xmlStream.cN()
  }
  createNewModel({ atts }) {
    return {
      iconSet: BaseXform.toStringValue(atts.iconSet, '3TrafficLights'),
      reverse: BaseXform.toBoolValue(atts.reverse),
      showValue: BaseXform.toBoolValue(atts.showValue),
      cfvo: [],
    }
  }
  onParserClose(name, parser) {
    this.model[name].push(parser.model)
  }
}
export default IconSetXform

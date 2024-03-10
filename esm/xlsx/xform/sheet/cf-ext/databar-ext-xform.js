import BaseXform from "../../base-xform.js"
import CompositeXform from "../../composite-xform.js"
import ColorXform from "../../style/color-xform.js"
import CfvoExtXform from "./cfvo-ext-xform.js"
class DatabarExtXform extends CompositeXform {
  constructor() {
    super()
    this.map = {
      'x14:cfvo': (this.cfvoXform = new CfvoExtXform()),
      'x14:borderColor': (this.borderColorXform = new ColorXform('x14:borderColor')),
      'x14:negativeBorderColor': (this.negativeBorderColorXform = new ColorXform('x14:negativeBorderColor')),
      'x14:negativeFillColor': (this.negativeFillColorXform = new ColorXform('x14:negativeFillColor')),
      'x14:axisColor': (this.axisColorXform = new ColorXform('x14:axisColor')),
    }
  }
  static isExt(rule) {
    // not all databars need ext
    // TODO: refine this
    return !rule.gradient
  }
  get tag() {
    return 'x14:dataBar'
  }


  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    xmlStream.oN(this.tag, {
      minLength: BaseXform.toIntAttribute(model.minLength, 0, true),
      maxLength: BaseXform.toIntAttribute(model.maxLength, 100, true),
      border: BaseXform.toBoolAttribute(model.border, false),
      gradient: BaseXform.toBoolAttribute(model.gradient, true),
      negativeBarColorSameAsPositive: BaseXform.toBoolAttribute(model.negativeBarColorSameAsPositive, true),
      negativeBarBorderColorSameAsPositive: BaseXform.toBoolAttribute(model.negativeBarBorderColorSameAsPositive, true),
      axisPosition: BaseXform.toAttribute(model.axisPosition, 'auto'),
      direction: BaseXform.toAttribute(model.direction, 'leftToRight'),
    })
    model.cfvo.forEach(cfvo => {
      this.cfvoXform.render(xmlStream, cfvo)
    })
    this.borderColorXform.render(xmlStream, model.borderColor)
    this.negativeBorderColorXform.render(xmlStream, model.negativeBorderColor)
    this.negativeFillColorXform.render(xmlStream, model.negativeFillColor)
    this.axisColorXform.render(xmlStream, model.axisColor)
    xmlStream.cN()
  }
  createNewModel({ atts }) {
    return {
      cfvo: [],
      minLength: BaseXform.toIntValue(atts.minLength, 0),
      maxLength: BaseXform.toIntValue(atts.maxLength, 100),
      border: BaseXform.toBoolValue(atts.border, false),
      gradient: BaseXform.toBoolValue(atts.gradient, true),
      negativeBarColorSameAsPositive: BaseXform.toBoolValue(atts.negativeBarColorSameAsPositive, true),
      negativeBarBorderColorSameAsPositive: BaseXform.toBoolValue(atts.negativeBarBorderColorSameAsPositive, true),
      axisPosition: BaseXform.toStringValue(atts.axisPosition, 'auto'),
      direction: BaseXform.toStringValue(atts.direction, 'leftToRight'),
    }
  }
  onParserClose(name, parser) {
    const [, prop] = name.split(':')
    switch (prop) {
      case 'cfvo':
        this.model.cfvo.push(parser.model)
        break
      default:
        this.model[prop] = parser.model
        break
    }
  }
}
export default DatabarExtXform

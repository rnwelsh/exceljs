import CompositeXform from "../../composite-xform.js"
import CfRuleExtXform from "./cf-rule-ext-xform.js"
import ConditionalFormattingExtXform from "./conditional-formatting-ext-xform.js"
class ConditionalFormattingsExtXform extends CompositeXform {
  constructor() {
    super()
    this.map = {
      'x14:conditionalFormatting': (this.cfXform = new ConditionalFormattingExtXform()),
    }
  }
  get tag() {
    return 'x14:conditionalFormattings'
  }
  hasContent(model) {
    if (model.hasExtContent === undefined) {
      model.hasExtContent = model.some(cf => cf.rules.some(CfRuleExtXform.isExt))
    }
    return model.hasExtContent
  }
  prepare(model, options) {
    model.forEach(cf => {
      this.cfXform.prepare(cf, options)
    })
  }


  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    if (this.hasContent(model)) {
      xmlStream.oN(this.tag)
      model.forEach(cf => this.cfXform.render(xmlStream, cf))
      xmlStream.cN()
    }
  }
  createNewModel() {
    return []
  }
  onParserClose(name, parser) {
    // model is array of conditional formatting objects
    this.model.push(parser.model)
  }
}
export default ConditionalFormattingsExtXform

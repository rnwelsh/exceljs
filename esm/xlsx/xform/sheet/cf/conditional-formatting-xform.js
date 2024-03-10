import CompositeXform from "../../composite-xform.js"
import CfRuleXform from "./cf-rule-xform.js"
class ConditionalFormattingXform extends CompositeXform {
  constructor() {
    super()
    this.map = {
      cfRule: new CfRuleXform(),
    }
  }
  get tag() {
    return 'conditionalFormatting'
  }


  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    // if there are no primitive rules, exit now
    if (!model.rules.some(CfRuleXform.isPrimitive)) {
      return
    }
    xmlStream.oN(this.tag, { sqref: model.ref })
    model.rules.forEach(rule => {
      if (CfRuleXform.isPrimitive(rule)) {
        rule.ref = model.ref
        this.map.cfRule.render(xmlStream, rule)
      }
    })
    xmlStream.cN()
  }
  createNewModel({ atts }) {
    return {
      ref: atts.sqref,
      rules: [],
    }
  }
  onParserClose(name, parser) {
    this.model.rules.push(parser.model)
  }
}
export default ConditionalFormattingXform

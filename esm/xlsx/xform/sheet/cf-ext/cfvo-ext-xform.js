import CompositeXform from "../../composite-xform.js"
import FExtXform from "./f-ext-xform.js"
class CfvoExtXform extends CompositeXform {
  constructor() {
    super()
    this.map = {
      'xm:f': (this.fExtXform = new FExtXform()),
    }
  }
  get tag() {
    return 'x14:cfvo'
  }


  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    xmlStream.oN(this.tag, {
      type: model.type,
    })
    if (model.value !== undefined) {
      this.fExtXform.render(xmlStream, model.value)
    }
    xmlStream.cN()
  }
  createNewModel(node) {
    return {
      type: node.atts.type,
    }
  }
  onParserClose(name, parser) {
    switch (name) {
      case 'xm:f':
        this.model.value = parser.model ? parseFloat(parser.model) : 0
        break
    }
  }
}
export default CfvoExtXform

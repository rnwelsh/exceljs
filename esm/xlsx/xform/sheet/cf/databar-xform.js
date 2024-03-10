import CompositeXform from "../../composite-xform.js"
import ColorXform from "../../style/color-xform.js"
import CfvoXform from "./cfvo-xform.js"
class DatabarXform extends CompositeXform {
  constructor() {
    super()
    this.map = {
      cfvo: (this.cfvoXform = new CfvoXform()),
      color: (this.colorXform = new ColorXform()),
    }
  }
  get tag() {
    return 'dataBar'
  }


  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    xmlStream.oN(this.tag)
    model.cfvo.forEach(cfvo => {
      this.cfvoXform.render(xmlStream, cfvo)
    })
    this.colorXform.render(xmlStream, model.color)
    xmlStream.cN()
  }
  createNewModel() {
    return {
      cfvo: [],
    }
  }
  onParserClose(name, parser) {
    switch (name) {
      case 'cfvo':
        this.model.cfvo.push(parser.model)
        break
      case 'color':
        this.model.color = parser.model
        break
    }
  }
}
export default DatabarXform

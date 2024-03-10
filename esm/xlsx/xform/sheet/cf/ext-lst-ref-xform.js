import BaseXform from "../../base-xform.js"
import CompositeXform from "../../composite-xform.js"
class X14IdXform extends BaseXform {
  get tag() {
    return 'x14:id'
  }


  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    xmlStream.lN(this.tag, null, model)
  }
  parseOpen() {
    this.model = ''
  }
  parseText(text) {
    this.model += text
  }
  parseClose(name) {
    return name !== this.tag
  }
}
class ExtXform extends CompositeXform {
  constructor() {
    super()
    this.map = {
      'x14:id': (this.idXform = new X14IdXform()),
    }
  }
  get tag() {
    return 'ext'
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    xmlStream.oN(this.tag, {
      uri: '{B025F937-C7B1-47D3-B67F-A62EFF666E3E}',
      'xmlns:x14': 'http://schemas.microsoft.com/office/spreadsheetml/2009/9/main',
    })
    this.idXform.render(xmlStream, model.x14Id)
    xmlStream.cN()
  }
  createNewModel() {
    return {}
  }
  onParserClose(name, parser) {
    this.model.x14Id = parser.model
  }
}
class ExtLstRefXform extends CompositeXform {
  constructor() {
    super()
    this.map = {
      ext: new ExtXform(),
    }
  }
  get tag() {
    return 'extLst'
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    xmlStream.oN(this.tag)
    this.map.ext.render(xmlStream, model)
    xmlStream.cN()
  }
  createNewModel() {
    return {}
  }
  onParserClose(name, parser) {
    Object.assign(this.model, parser.model)
  }
}
export default ExtLstRefXform

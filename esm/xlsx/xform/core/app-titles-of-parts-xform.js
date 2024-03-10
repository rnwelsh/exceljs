import BaseXform from "../base-xform.js"
class AppTitlesOfPartsXform extends BaseXform {
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    xmlStream.oN('TitlesOfParts')
    xmlStream.oN('vt:vector', { size: model.length, baseType: 'lpstr' })
    model.forEach(sheet => {
      xmlStream.lN('vt:lpstr', undefined, sheet.name)
    })
    xmlStream.cN()
    xmlStream.cN()
  }
  parseOpen(node) {
    // no parsing
    return node.name === 'TitlesOfParts'
  }
  parseText() { }
  parseClose(name) {
    return name !== 'TitlesOfParts'
  }
}
export default AppTitlesOfPartsXform

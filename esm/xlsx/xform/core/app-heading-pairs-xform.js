import BaseXform from "../base-xform.js"
class AppHeadingPairsXform extends BaseXform {
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    xmlStream.oN('HeadingPairs')
    xmlStream.oN('vt:vector', { size: 2, baseType: 'variant' })
    xmlStream.oN('vt:variant')
    xmlStream.lN('vt:lpstr', undefined, 'Worksheets')
    xmlStream.cN()
    xmlStream.oN('vt:variant')
    xmlStream.lN('vt:i4', undefined, model.length)
    xmlStream.cN()
    xmlStream.cN()
    xmlStream.cN()
  }
  parseOpen(node) {
    // no parsing
    return node.name === 'HeadingPairs'
  }
  parseText() { }
  parseClose(name) {
    return name !== 'HeadingPairs'
  }
}
export default AppHeadingPairsXform

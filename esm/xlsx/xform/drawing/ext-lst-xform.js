import BaseXform from "../base-xform.js"
class ExtLstXform extends BaseXform {
  get tag() {
    return 'a:extLst'
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream) {
    xmlStream.oN(this.tag)
    xmlStream.oN('a:ext', {
      uri: '{FF2B5EF4-FFF2-40B4-BE49-F238E27FC236}',
    })
    xmlStream.lN('a16:creationId', {
      'xmlns:a16': 'http://schemas.microsoft.com/office/drawing/2014/main',
      id: '{00000000-0008-0000-0000-000002000000}',
    })
    xmlStream.cN()
    xmlStream.cN()
  }
  parseOpen(node) {
    switch (node.name) {
      case this.tag:
        return true
      default:
        return true
    }
  }
  parseText() { }
  parseClose(name) {
    switch (name) {
      case this.tag:
        return false
      default:
        // unprocessed internal nodes
        return true
    }
  }
}
export default ExtLstXform

import BaseXform from "../base-xform.js"
class CNvPicPrXform extends BaseXform {
  get tag() {
    return 'xdr:cNvPicPr'
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream) {
    xmlStream.oN(this.tag)
    xmlStream.lN('a:picLocks', {
      noChangeAspect: '1',
    })
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
export default CNvPicPrXform

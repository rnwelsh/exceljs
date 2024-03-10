import BaseXform from "../base-xform.js"
class BlipXform extends BaseXform {
  get tag() {
    return 'a:blip'
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    xmlStream.lN(this.tag, {
      'xmlns:r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
      'r:embed': model.rId,
      cstate: 'print',
    })
    // TODO: handle children (e.g. a:extLst=>a:ext=>a14:useLocalDpi
  }
  parseOpen(node) {
    switch (node.name) {
      case this.tag:
        this.model = {
          rId: node.atts['r:embed'],
        }
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
export default BlipXform

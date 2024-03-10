import BaseXform from "../base-xform.js"
class TableColumnXform extends BaseXform {
  get tag() {
    return 'tableColumn'
  }
  prepare(model, options) {
    model.id = options.index + 1
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    xmlStream.lN(this.tag, {
      id: model.id.toString(),
      name: model.name,
      totalsRowLabel: model.totalsRowLabel,
      totalsRowFunction: model.totalsRowFunction,
      dxfId: model.dxfId,
    })
    return true
  }
  parseOpen(node) {
    if (node.name === this.tag) {
      const { atts } = node
      this.model = {
        name: atts.name,
        totalsRowLabel: atts.totalsRowLabel,
        totalsRowFunction: atts.totalsRowFunction,
        dxfId: atts.dxfId,
      }
      return true
    }
    return false
  }
  parseText() { }
  parseClose() {
    return false
  }
}
export default TableColumnXform

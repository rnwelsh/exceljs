import BaseXform from "../base-xform.js"
class TableStyleInfoXform extends BaseXform {
  get tag() {
    return 'tableStyleInfo'
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    xmlStream.lN(this.tag, {
      name: model.theme ? model.theme : undefined,
      showFirstColumn: model.showFirstColumn ? '1' : '0',
      showLastColumn: model.showLastColumn ? '1' : '0',
      showRowStripes: model.showRowStripes ? '1' : '0',
      showColumnStripes: model.showColumnStripes ? '1' : '0',
    })
    return true
  }
  parseOpen(node) {
    if (node.name === this.tag) {
      const { atts } = node
      this.model = {
        theme: atts.name ? atts.name : null,
        showFirstColumn: atts.showFirstColumn === '1',
        showLastColumn: atts.showLastColumn === '1',
        showRowStripes: atts.showRowStripes === '1',
        showColumnStripes: atts.showColumnStripes === '1',
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
export default TableStyleInfoXform

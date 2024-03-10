import BaseXform from "../base-xform.js"
class RelationshipXform extends BaseXform {
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    xmlStream.lN('Relationship', model)
  }
  parseOpen(node) {
    switch (node.name) {
      case 'Relationship':
        this.model = node.atts
        return true
      default:
        return false
    }
  }
  parseText() { }
  parseClose() {
    return false
  }
}
export default RelationshipXform

import BaseXform from "../base-xform.js"
class WorkbookPivotCacheXform extends BaseXform {
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    xmlStream.lN('pivotCache', {
      cacheId: model.cacheId,
      'r:id': model.rId,
    })
  }
  parseOpen(node) {
    if (node.name === 'pivotCache') {
      this.model = {
        cacheId: node.atts.cacheId,
        rId: node.atts['r:id'],
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
export default WorkbookPivotCacheXform

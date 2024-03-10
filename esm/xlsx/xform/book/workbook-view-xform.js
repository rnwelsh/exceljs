import BaseXform from "../base-xform.js"
class WorkbookViewXform extends BaseXform {
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    const atts = {
      xWindow: model.x || 0,
      yWindow: model.y || 0,
      windowWidth: model.width || 12000,
      windowHeight: model.height || 24000,
      firstSheet: model.firstSheet,
      activeTab: model.activeTab,
    }
    if (model.visibility && model.visibility !== 'visible') {
      atts.visibility = model.visibility
    }
    xmlStream.lN('workbookView', atts)
  }
  parseOpen(node) {
    if (node.name === 'workbookView') {
      const model = (this.model = {})
      const addS = function (name, value, dflt) {
        const s = value !== undefined ? (model[name] = value) : dflt
        if (s !== undefined) {
          model[name] = s
        }
      }
      const addN = function (name, value, dflt) {
        const n = value !== undefined ? (model[name] = parseInt(value, 10)) : dflt
        if (n !== undefined) {
          model[name] = n
        }
      }
      addN('x', node.atts.xWindow, 0)
      addN('y', node.atts.yWindow, 0)
      addN('width', node.atts.windowWidth, 25000)
      addN('height', node.atts.windowHeight, 10000)
      addS('visibility', node.atts.visibility, 'visible')
      addN('activeTab', node.atts.activeTab, undefined)
      addN('firstSheet', node.atts.firstSheet, undefined)
      return true
    }
    return false
  }
  parseText() { }
  parseClose() {
    return false
  }
}
export default WorkbookViewXform

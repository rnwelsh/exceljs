import { getAddress } from "../../../utils/col-cache.js"
import BaseXform from "../base-xform.js"
const VIEW_STATES = {
  frozen: 'frozen',
  frozenSplit: 'frozen',
  split: 'split',
}
class SheetViewXform extends BaseXform {
  get tag() {
    return 'sheetView'
  }
  prepare(model) {
    switch (model.state) {
      case 'frozen':
      case 'split':
        break
      default:
        model.state = 'normal'
        break
    }
  }


  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    xmlStream.oN('sheetView', {
      workbookViewId: model.workbookViewId || 0,
    })
    const add = function (name, value, included) {
      if (included) {
        xmlStream.addA(name, value)
      }
    }
    add('rightToLeft', '1', model.rightToLeft === true)
    add('tabSelected', '1', model.tabSelected)
    add('showRuler', '0', model.showRuler === false)
    add('showRowColHeaders', '0', model.showRowColHeaders === false)
    add('showGridLines', '0', model.showGridLines === false)
    add('zoomScale', model.zoomScale, model.zoomScale)
    add('zoomScaleNormal', model.zoomScaleNormal, model.zoomScaleNormal)
    add('view', model.style, model.style)
    let topLeftCell
    let xSplit
    let ySplit
    let activePane
    switch (model.state) {
      case 'frozen':
        xSplit = model.xSplit || 0
        ySplit = model.ySplit || 0
        topLeftCell = model.topLeftCell || getAddress(ySplit + 1, xSplit + 1).address
        activePane =
          (model.xSplit && model.ySplit && 'bottomRight') ||
          (model.xSplit && 'topRight') ||
          'bottomLeft'
        xmlStream.lN('pane', {
          xSplit: model.xSplit || undefined,
          ySplit: model.ySplit || undefined,
          topLeftCell,
          activePane,
          state: 'frozen',
        })
        xmlStream.lN('selection', {
          pane: activePane,
          activeCell: model.activeCell,
          sqref: model.activeCell,
        })
        break
      case 'split':
        if (model.activePane === 'topLeft') {
          model.activePane = undefined
        }
        xmlStream.lN('pane', {
          xSplit: model.xSplit || undefined,
          ySplit: model.ySplit || undefined,
          topLeftCell: model.topLeftCell,
          activePane: model.activePane,
        })
        xmlStream.lN('selection', {
          pane: model.activePane,
          activeCell: model.activeCell,
          sqref: model.activeCell,
        })
        break
      case 'normal':
        if (model.activeCell) {
          xmlStream.lN('selection', {
            activeCell: model.activeCell,
            sqref: model.activeCell,
          })
        }
        break
      default:
        break
    }
    xmlStream.cN()
  }
  parseOpen(node) {
    switch (node.name) {
      case 'sheetView':
        this.sheetView = {
          workbookViewId: parseInt(node.atts.workbookViewId, 10),
          rightToLeft: node.atts.rightToLeft === '1',
          tabSelected: node.atts.tabSelected === '1',
          showRuler: !(node.atts.showRuler === '0'),
          showRowColHeaders: !(node.atts.showRowColHeaders === '0'),
          showGridLines: !(node.atts.showGridLines === '0'),
          zoomScale: parseInt(node.atts.zoomScale || '100', 10),
          zoomScaleNormal: parseInt(node.atts.zoomScaleNormal || '100', 10),
          style: node.atts.view,
        }
        this.pane = undefined
        this.selections = {}
        return true
      case 'pane':
        this.pane = {
          xSplit: parseInt(node.atts.xSplit || '0', 10),
          ySplit: parseInt(node.atts.ySplit || '0', 10),
          topLeftCell: node.atts.topLeftCell,
          activePane: node.atts.activePane || 'topLeft',
          state: node.atts.state,
        }
        return true
      case 'selection': {
        const name = node.atts.pane || 'topLeft'
        this.selections[name] = {
          pane: name,
          activeCell: node.atts.activeCell,
        }
        return true
      }
      default:
        return false
    }
  }
  parseText() { }
  parseClose(name) {
    let model
    let selection
    switch (name) {
      case 'sheetView':
        if (this.sheetView && this.pane) {
          model = this.model = {
            workbookViewId: this.sheetView.workbookViewId,
            rightToLeft: this.sheetView.rightToLeft,
            state: VIEW_STATES[this.pane.state] || 'split',
            xSplit: this.pane.xSplit,
            ySplit: this.pane.ySplit,
            topLeftCell: this.pane.topLeftCell,
            showRuler: this.sheetView.showRuler,
            showRowColHeaders: this.sheetView.showRowColHeaders,
            showGridLines: this.sheetView.showGridLines,
            zoomScale: this.sheetView.zoomScale,
            zoomScaleNormal: this.sheetView.zoomScaleNormal,
          }
          if (this.model.state === 'split') {
            model.activePane = this.pane.activePane
          }
          selection = this.selections[this.pane.activePane]
          if (selection && selection.activeCell) {
            model.activeCell = selection.activeCell
          }
          if (this.sheetView.style) {
            model.style = this.sheetView.style
          }
        }
        else {
          model = this.model = {
            workbookViewId: this.sheetView.workbookViewId,
            rightToLeft: this.sheetView.rightToLeft,
            state: 'normal',
            showRuler: this.sheetView.showRuler,
            showRowColHeaders: this.sheetView.showRowColHeaders,
            showGridLines: this.sheetView.showGridLines,
            zoomScale: this.sheetView.zoomScale,
            zoomScaleNormal: this.sheetView.zoomScaleNormal,
          }
          selection = this.selections.topLeft
          if (selection && selection.activeCell) {
            model.activeCell = selection.activeCell
          }
          if (this.sheetView.style) {
            model.style = this.sheetView.style
          }
        }
        return false
      default:
        return true
    }
  }
  reconcile() { }
}
export default SheetViewXform

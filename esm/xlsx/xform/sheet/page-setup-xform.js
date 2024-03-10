import { some } from "../../../utils/under-dash.js"
import BaseXform from "../base-xform.js"
function booleanToXml(model) {
  return model ? '1' : undefined
}
function pageOrderToXml(model) {
  switch (model) {
    case 'overThenDown':
      return model
    default:
      return undefined
  }
}
function cellCommentsToXml(model) {
  switch (model) {
    case 'atEnd':
    case 'asDisplyed':
      return model
    default:
      return undefined
  }
}
function errorsToXml(model) {
  switch (model) {
    case 'dash':
    case 'blank':
    case 'NA':
      return model
    default:
      return undefined
  }
}
function pageSizeToModel(value) {
  return value !== undefined ? parseInt(value, 10) : undefined
}
class PageSetupXform extends BaseXform {
  get tag() {
    return 'pageSetup'
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    if (model) {
      const atts = {
        paperSize: model.paperSize,
        orientation: model.orientation,
        horizontalDpi: model.horizontalDpi,
        verticalDpi: model.verticalDpi,
        pageOrder: pageOrderToXml(model.pageOrder),
        blackAndWhite: booleanToXml(model.blackAndWhite),
        draft: booleanToXml(model.draft),
        cellComments: cellCommentsToXml(model.cellComments),
        errors: errorsToXml(model.errors),
        scale: model.scale,
        fitToWidth: model.fitToWidth,
        fitToHeight: model.fitToHeight,
        firstPageNumber: model.firstPageNumber,
        useFirstPageNumber: booleanToXml(model.firstPageNumber),
        usePrinterDefaults: booleanToXml(model.usePrinterDefaults),
        copies: model.copies,
      }
      if (some(atts, value => value !== undefined)) {
        xmlStream.lN(this.tag, atts)
      }
    }
  }
  parseOpen(node) {
    switch (node.name) {
      case this.tag:
        this.model = {
          paperSize: pageSizeToModel(node.atts.paperSize),
          orientation: node.atts.orientation || 'portrait',
          horizontalDpi: parseInt(node.atts.horizontalDpi || '4294967295', 10),
          verticalDpi: parseInt(node.atts.verticalDpi || '4294967295', 10),
          pageOrder: node.atts.pageOrder || 'downThenOver',
          blackAndWhite: node.atts.blackAndWhite === '1',
          draft: node.atts.draft === '1',
          cellComments: node.atts.cellComments || 'None',
          errors: node.atts.errors || 'displayed',
          scale: parseInt(node.atts.scale || '100', 10),
          fitToWidth: parseInt(node.atts.fitToWidth || '1', 10),
          fitToHeight: parseInt(node.atts.fitToHeight || '1', 10),
          firstPageNumber: parseInt(node.atts.firstPageNumber || '1', 10),
          useFirstPageNumber: node.atts.useFirstPageNumber === '1',
          usePrinterDefaults: node.atts.usePrinterDefaults === '1',
          copies: parseInt(node.atts.copies || '1', 10),
        }
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
export default PageSetupXform

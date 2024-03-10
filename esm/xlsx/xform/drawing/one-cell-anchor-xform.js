import BaseCellAnchorXform from "./base-cell-anchor-xform.js"
import StaticXform from "../static-xform.js"
import CellPositionXform from "./cell-position-xform.js"
import ExtXform from "./ext-xform.js"
import PicXform from "./pic-xform.js"
class OneCellAnchorXform extends BaseCellAnchorXform {
  constructor() {
    super()
    this.map = {
      'xdr:from': new CellPositionXform({ tag: 'xdr:from' }),
      'xdr:ext': new ExtXform({ tag: 'xdr:ext' }),
      'xdr:pic': new PicXform(),
      'xdr:clientData': new StaticXform({ tag: 'xdr:clientData' }),
    }
  }
  get tag() {
    return 'xdr:oneCellAnchor'
  }
  prepare(model, options) {
    this.map['xdr:pic'].prepare(model.picture, options)
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    xmlStream.oN(this.tag, { editAs: model.range.editAs || 'oneCell' })
    this.map['xdr:from'].render(xmlStream, model.range.tl)
    this.map['xdr:ext'].render(xmlStream, model.range.ext)
    this.map['xdr:pic'].render(xmlStream, model.picture)
    this.map['xdr:clientData'].render(xmlStream, {})
    xmlStream.cN()
  }
  parseClose(name) {
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        this.parser = undefined
      }
      return true
    }
    switch (name) {
      case this.tag:
        this.model.range.tl = this.map['xdr:from'].model
        this.model.range.ext = this.map['xdr:ext'].model
        this.model.picture = this.map['xdr:pic'].model
        return false
      default:
        // could be some unrecognised tags
        return true
    }
  }
  reconcile(model, options) {
    model.medium = this.reconcilePicture(model.picture, options)
  }
}
export default OneCellAnchorXform

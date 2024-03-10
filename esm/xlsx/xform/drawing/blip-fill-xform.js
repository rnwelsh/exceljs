import BaseXform from "../base-xform.js"
import BlipXform from "./blip-xform.js"
class BlipFillXform extends BaseXform {
  constructor() {
    super()
    this.map = {
      'a:blip': new BlipXform(),
    }
  }
  get tag() {
    return 'xdr:blipFill'
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    xmlStream.oN(this.tag)
    this.map['a:blip'].render(xmlStream, model)
    // TODO: options for this + parsing
    xmlStream.oN('a:stretch')
    xmlStream.lN('a:fillRect')
    xmlStream.cN()
    xmlStream.cN()
  }
  parseOpen(node) {
    if (this.parser) {
      this.parser.parseOpen(node)
      return true
    }
    switch (node.name) {
      case this.tag:
        this.reset()
        break
      default:
        this.parser = this.map[node.name]
        if (this.parser) {
          this.parser.parseOpen(node)
        }
        break
    }
    return true
  }
  parseText() { }
  parseClose(name) {
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        this.parser = undefined
      }
      return true
    }
    switch (name) {
      case this.tag:
        this.model = this.map['a:blip'].model
        return false
      default:
        return true
    }
  }
}
export default BlipFillXform

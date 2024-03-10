import BaseXform from "../base-xform.js"
/** https://en.wikipedia.org/wiki/Office_Open_XML_file_formats#DrawingML */
const EMU_PER_PIXEL_AT_96_DPI = 9525
class ExtXform extends BaseXform {
  constructor(options) {
    super()
    this.tag = options.tag
    this.map = {}
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    xmlStream.oN(this.tag)
    const width = Math.floor(model.width * EMU_PER_PIXEL_AT_96_DPI)
    const height = Math.floor(model.height * EMU_PER_PIXEL_AT_96_DPI)
    xmlStream.addA('cx', width)
    xmlStream.addA('cy', height)
    xmlStream.cN()
  }
  parseOpen(node) {
    if (node.name === this.tag) {
      this.model = {
        width: parseInt(node.atts.cx || '0', 10) / EMU_PER_PIXEL_AT_96_DPI,
        height: parseInt(node.atts.cy || '0', 10) / EMU_PER_PIXEL_AT_96_DPI,
      }
      return true
    }
    return false
  }
  parseText( /* text */) { }
  parseClose( /* name */) {
    return false
  }
}
export default ExtXform

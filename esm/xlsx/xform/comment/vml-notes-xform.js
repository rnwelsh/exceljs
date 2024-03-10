import XmlStream from "../../../utils/xml-stream.js"
import BaseXform from "../base-xform.js"
import VmlShapeXform from "./vml-shape-xform.js"
// This class is (currently) single purposed to insert the triangle
// drawing icons on commented cells
class VmlNotesXform extends BaseXform {
  constructor() {
    super()
    this.map = {
      'v:shape': new VmlShapeXform(),
    }
  }
  get tag() {
    return 'xml'
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    xmlStream.openXml(XmlStream.StdDocAttributes)
    xmlStream.oN(this.tag, VmlNotesXform.DRAWING_ATTRIBUTES)
    xmlStream.oN('o:shapelayout', { 'v:ext': 'edit' })
    xmlStream.lN('o:idmap', { 'v:ext': 'edit', data: 1 })
    xmlStream.cN()
    xmlStream.oN('v:shapetype', {
      id: '_x0000_t202',
      coordsize: '21600,21600',
      'o:spt': 202,
      path: 'm,l,21600r21600,l21600,xe',
    })
    xmlStream.lN('v:stroke', { joinstyle: 'miter' })
    xmlStream.lN('v:path', { gradientshapeok: 't', 'o:connecttype': 'rect' })
    xmlStream.cN()
    model.comments.forEach((item, index) => {
      this.map['v:shape'].render(xmlStream, item, index)
    })
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
        this.model = {
          comments: [],
        }
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
  parseText(text) {
    if (this.parser) {
      this.parser.parseText(text)
    }
  }
  parseClose(name) {
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        this.model.comments.push(this.parser.model)
        this.parser = undefined
      }
      return true
    }
    switch (name) {
      case this.tag:
        return false
      default:
        // could be some unrecognised tags
        return true
    }
  }
  reconcile(model, options) {
    model.anchors.forEach(anchor => {
      if (anchor.br) {
        this.map['xdr:twoCellAnchor'].reconcile(anchor, options)
      }
      else {
        this.map['xdr:oneCellAnchor'].reconcile(anchor, options)
      }
    })
  }
}
VmlNotesXform.DRAWING_ATTRIBUTES = {
  'xmlns:v': 'urn:schemas-microsoft-com:vml',
  'xmlns:o': 'urn:schemas-microsoft-com:office:office',
  'xmlns:x': 'urn:schemas-microsoft-com:office:excel',
}
export default VmlNotesXform

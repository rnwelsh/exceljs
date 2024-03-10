import BaseXform from "../base-xform.js"
import { parseBoolean } from "../../../utils/utils.js"
import CellXform from "./cell-xform.js"
class RowXform extends BaseXform {
  constructor(options) {
    super()
    this.maxItems = options && options.maxItems
    this.map = {
      c: new CellXform(),
    }
  }
  get tag() {
    return 'row'
  }
  prepare(model, options) {
    const styleId = options.styles.addStyleModel(model.style)
    if (styleId) {
      model.styleId = styleId
    }
    const cellXform = this.map.c
    model.cells.forEach(cellModel => {
      cellXform.prepare(cellModel, options)
    })
  }

  /** @param {XmlStream} xmlStream */
  render(xmlStream, model, options) {
    xmlStream.oN('row')
    xmlStream.addA('r', model.number)
    if (model.height) {
      xmlStream.addA('ht', model.height)
      xmlStream.addA('customHeight', '1')
    }
    if (model.hidden) {
      xmlStream.addA('hidden', '1')
    }
    if (model.min > 0 && model.max > 0 && model.min <= model.max) {
      xmlStream.addA('spans', `${model.min}:${model.max}`)
    }
    if (model.styleId) {
      xmlStream.addA('s', model.styleId)
      xmlStream.addA('customFormat', '1')
    }
    xmlStream.addA('x14ac:dyDescent', '0.25')
    if (model.outlineLevel) {
      xmlStream.addA('outlineLevel', model.outlineLevel)
    }
    if (model.collapsed) {
      xmlStream.addA('collapsed', '1')
    }
    const cellXform = this.map.c
    model.cells.forEach(cellModel => {
      cellXform.render(xmlStream, cellModel, options)
    })
    xmlStream.cN()
  }
  parseOpen(node) {
    if (this.parser) {
      this.parser.parseOpen(node)
      return true
    }
    if (node.name === 'row') {
      this.numRowsSeen += 1
      const spans = node.atts.spans
        ? node.atts.spans.split(':').map(span => parseInt(span, 10))
        : [undefined, undefined]
      const model = (this.model = {
        number: parseInt(node.atts.r, 10),
        min: spans[0],
        max: spans[1],
        cells: [],
      })
      if (node.atts.s) {
        model.styleId = parseInt(node.atts.s, 10)
      }
      if (parseBoolean(node.atts.hidden)) {
        model.hidden = true
      }
      if (parseBoolean(node.atts.bestFit)) {
        model.bestFit = true
      }
      if (node.atts.ht) {
        model.height = parseFloat(node.atts.ht)
      }
      if (node.atts.outlineLevel) {
        model.outlineLevel = parseInt(node.atts.outlineLevel, 10)
      }
      if (parseBoolean(node.atts.collapsed)) {
        model.collapsed = true
      }
      return true
    }
    this.parser = this.map[node.name]
    if (this.parser) {
      this.parser.parseOpen(node)
      return true
    }
    return false
  }
  parseText(text) {
    if (this.parser) {
      this.parser.parseText(text)
    }
  }
  parseClose(name) {
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        this.model.cells.push(this.parser.model)
        if (this.maxItems && this.model.cells.length > this.maxItems) {
          throw new Error(`Max column count (${this.maxItems}) exceeded`)
        }
        this.parser = undefined
      }
      return true
    }
    return false
  }
  reconcile(model, options) {
    model.style = model.styleId ? options.styles.getStyleModel(model.styleId) : {}
    if (model.styleId !== undefined) {
      model.styleId = undefined
    }
    const cellXform = this.map.c
    model.cells.forEach(cellModel => {
      cellXform.reconcile(cellModel, options)
    })
  }
}
export default RowXform

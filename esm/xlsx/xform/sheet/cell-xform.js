import { dateToExcel, excelToDate, xmlDecode, isDateFmt } from "../../../utils/utils.js"
import BaseXform from "../base-xform.js"
import Range from "../../../doc/range.js"
import { ValueType } from "../../../doc/enums.js"
import RichTextXform from "../strings/rich-text-xform.js"
function getValueType(v) {
  if (v === null || v === undefined) {
    return ValueType.Null
  }
  if (v instanceof String || typeof v === 'string') {
    return ValueType.String
  }
  if (typeof v === 'number') {
    return ValueType.Number
  }
  if (typeof v === 'boolean') {
    return ValueType.Boolean
  }
  if (v instanceof Date) {
    return ValueType.Date
  }
  if (v.text && v.hyperlink) {
    return ValueType.Hyperlink
  }
  if (v.formula) {
    return ValueType.Formula
  }
  if (v.error) {
    return ValueType.Error
  }
  throw new Error('I could not understand type of value')
}
function getEffectiveCellType(cell) {
  switch (cell.type) {
    case ValueType.Formula:
      return getValueType(cell.result)
    default:
      return cell.type
  }
}
class CellXform extends BaseXform {
  constructor() {
    super()
    this.richTextXForm = new RichTextXform()
  }
  get tag() {
    return 'c'
  }
  prepare(model, options) {
    const styleId = options.styles.addStyleModel(model.style || {}, getEffectiveCellType(model))
    if (styleId) {
      model.styleId = styleId
    }
    // if (model.comment) {
    //     options.comments.push({ ...model.comment, ref: model.address });
    // }
    switch (model.type) {
      case ValueType.String:
      case ValueType.RichText:
        if (options.sharedStrings) {
          model.ssId = options.sharedStrings.add(model.value)
        }
        break
      case ValueType.Date:
        if (options.date1904) {
          model.date1904 = true
        }
        break
      case ValueType.Hyperlink:
        if (options.sharedStrings && model.text !== undefined && model.text !== null) {
          model.ssId = options.sharedStrings.add(model.text)
        }
        options.hyperlinks.push({
          address: model.address,
          target: model.hyperlink,
          tooltip: model.tooltip,
        })
        break
      case ValueType.Merge:
        options.merges.add(model)
        break
      case ValueType.Formula:
        if (options.date1904) {
          // in case valueType is date
          model.date1904 = true
        }
        if (model.shareType === 'shared') {
          model.si = options.siFormulae++
        }
        if (model.formula) {
          options.formulae[model.address] = model
        }
        else if (model.sharedFormula) {
          const master = options.formulae[model.sharedFormula]
          if (!master) {
            throw new Error(`Shared Formula master must exist above and or left of clone for cell ${model.address}`)
          }
          if (master.si === undefined) {
            master.shareType = 'shared'
            master.si = options.siFormulae++
            master.range = new Range(master.address, model.address)
          }
          else if (master.range) {
            master.range.expandToAddress(model.address)
          }
          model.si = master.si
        }
        break
      default:
        break
    }
  }


  renderFormula(xmlStream, model) {
    let attrs = null
    switch (model.shareType) {
      case 'shared':
        attrs = {
          t: 'shared',
          ref: model.ref || model.range.range,
          si: model.si,
        }
        break
      case 'array':
        attrs = {
          t: 'array',
          ref: model.ref,
        }
        break
      default:
        if (model.si !== undefined) {
          attrs = {
            t: 'shared',
            si: model.si,
          }
        }
        break
    }
    switch (getValueType(model.result)) {
      case ValueType.Null: // ?
        xmlStream.leafNode('f', attrs, model.formula)
        break
      case ValueType.String:
        // oddly, formula results don't ever use shared strings
        xmlStream.addAttribute('t', 'str')
        xmlStream.leafNode('f', attrs, model.formula)
        xmlStream.leafNode('v', null, model.result)
        break
      case ValueType.Number:
        xmlStream.leafNode('f', attrs, model.formula)
        xmlStream.leafNode('v', null, model.result)
        break
      case ValueType.Boolean:
        xmlStream.addAttribute('t', 'b')
        xmlStream.leafNode('f', attrs, model.formula)
        xmlStream.leafNode('v', null, model.result ? 1 : 0)
        break
      case ValueType.Error:
        xmlStream.addAttribute('t', 'e')
        xmlStream.leafNode('f', attrs, model.formula)
        xmlStream.leafNode('v', null, model.result.error)
        break
      case ValueType.Date:
        xmlStream.leafNode('f', attrs, model.formula)
        xmlStream.leafNode('v', null, dateToExcel(model.result, model.date1904))
        break
      // case ValueType.Hyperlink: // ??
      // case ValueType.Formula:
      default:
        throw new Error('I could not understand type of value')
    }
  }


  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    if (model.type === ValueType.Null && !model.styleId) {
      // if null and no style, exit
      return
    }
    xmlStream.oN('c')
    xmlStream.addA('r', model.address)
    if (model.styleId) {
      xmlStream.addA('s', model.styleId)
    }
    switch (model.type) {
      case ValueType.Null:
        break
      case ValueType.Number:
        xmlStream.lN('v', null, model.value)
        break
      case ValueType.Boolean:
        xmlStream.addA('t', 'b')
        xmlStream.lN('v', null, model.value ? '1' : '0')
        break
      case ValueType.Error:
        xmlStream.addA('t', 'e')
        xmlStream.lN('v', null, model.value.error)
        break
      case ValueType.String:
      case ValueType.RichText:
        if (model.ssId !== undefined) {
          xmlStream.addA('t', 's')
          xmlStream.lN('v', null, model.ssId)
        }
        else if (model.value && model.value.richText) {
          xmlStream.addA('t', 'inlineStr')
          xmlStream.oN('is')
          model.value.richText.forEach(text => {
            this.richTextXForm.render(xmlStream, text)
          })
          xmlStream.cN('is')
        }
        else {
          xmlStream.addA('t', 'str')
          xmlStream.lN('v', null, model.value)
        }
        break
      case ValueType.Date:
        xmlStream.lN('v', null, dateToExcel(model.value, model.date1904))
        break
      case ValueType.Hyperlink:
        if (model.ssId !== undefined) {
          xmlStream.addA('t', 's')
          xmlStream.lN('v', null, model.ssId)
        }
        else {
          xmlStream.addA('t', 'str')
          xmlStream.lN('v', null, model.text)
        }
        break
      case ValueType.Formula:
        this.renderFormula(xmlStream, model)
        break
      case ValueType.Merge:
        // nothing to add
        break
      default:
        break
    }
    xmlStream.cN() // </c>
  }
  parseOpen(node) {
    if (this.parser) {
      this.parser.parseOpen(node)
      return true
    }
    switch (node.name) {
      case 'c':
        // const address = col ache.decodeAddress(node.atts.r);
        this.model = {
          address: node.atts.r,
        }
        this.t = node.atts.t
        if (node.atts.s) {
          this.model.styleId = parseInt(node.atts.s, 10)
        }
        return true
      case 'f':
        this.currentNode = 'f'
        this.model.si = node.atts.si
        this.model.shareType = node.atts.t
        this.model.ref = node.atts.ref
        return true
      case 'v':
        this.currentNode = 'v'
        return true
      case 't':
        this.currentNode = 't'
        return true
      case 'r':
        this.parser = this.richTextXForm
        this.parser.parseOpen(node)
        return true
      default:
        return false
    }
  }
  parseText(text) {
    if (this.parser) {
      this.parser.parseText(text)
      return
    }
    switch (this.currentNode) {
      case 'f':
        this.model.formula = this.model.formula ? this.model.formula + text : text
        break
      case 'v':
      case 't':
        if (this.model.value && this.model.value.richText) {
          this.model.value.richText.text = this.model.value.richText.text
            ? this.model.value.richText.text + text
            : text
        }
        else {
          this.model.value = this.model.value ? this.model.value + text : text
        }
        break
      default:
        break
    }
  }
  parseClose(name) {
    switch (name) {
      case 'c': {
        const { model } = this
        // first guess on cell type
        if (model.formula || model.shareType) {
          model.type = ValueType.Formula
          if (model.value) {
            if (this.t === 'str') {
              model.result = xmlDecode(model.value)
            }
            else if (this.t === 'b') {
              model.result = parseInt(model.value, 10) !== 0
            }
            else if (this.t === 'e') {
              model.result = { error: model.value }
            }
            else {
              model.result = parseFloat(model.value)
            }
            model.value = undefined
          }
        }
        else if (model.value !== undefined) {
          switch (this.t) {
            case 's':
              model.type = ValueType.String
              model.value = parseInt(model.value, 10)
              break
            case 'str':
              model.type = ValueType.String
              model.value = xmlDecode(model.value)
              break
            case 'inlineStr':
              model.type = ValueType.String
              break
            case 'b':
              model.type = ValueType.Boolean
              model.value = parseInt(model.value, 10) !== 0
              break
            case 'e':
              model.type = ValueType.Error
              model.value = { error: model.value }
              break
            default:
              model.type = ValueType.Number
              model.value = parseFloat(model.value)
              break
          }
        }
        else if (model.styleId) {
          model.type = ValueType.Null
        }
        else {
          model.type = ValueType.Merge
        }
        return false
      }
      case 'f':
      case 'v':
      case 'is':
        this.currentNode = undefined
        return true
      case 't':
        if (this.parser) {
          this.parser.parseClose(name)
          return true
        }
        this.currentNode = undefined
        return true
      case 'r':
        this.model.value = this.model.value || {}
        this.model.value.richText = this.model.value.richText || []
        this.model.value.richText.push(this.parser.model)
        this.parser = undefined
        this.currentNode = undefined
        return true
      default:
        if (this.parser) {
          this.parser.parseClose(name)
          return true
        }
        return false
    }
  }
  reconcile(model, options) {
    const style = model.styleId && options.styles && options.styles.getStyleModel(model.styleId)
    if (style) {
      model.style = style
    }
    if (model.styleId !== undefined) {
      model.styleId = undefined
    }
    switch (model.type) {
      case ValueType.String:
        if (typeof model.value === 'number') {
          if (options.sharedStrings) {
            model.value = options.sharedStrings.getString(model.value)
          }
        }
        if (model.value.richText) {
          model.type = ValueType.RichText
        }
        break
      case ValueType.Number:
        if (style && isDateFmt(style.numFmt)) {
          model.type = ValueType.Date
          model.value = excelToDate(model.value, options.date1904)
        }
        break
      case ValueType.Formula:
        if (model.result !== undefined && style && isDateFmt(style.numFmt)) {
          model.result = excelToDate(model.result, options.date1904)
        }
        if (model.shareType === 'shared') {
          if (model.ref) {
            // master
            options.formulae[model.si] = model.address
          }
          else {
            // slave
            model.sharedFormula = options.formulae[model.si]
            delete model.shareType
          }
          delete model.si
        }
        break
      default:
        break
    }
    // look for hyperlink
    const hyperlink = options.hyperlinkMap[model.address]
    if (hyperlink) {
      if (model.type === ValueType.Formula) {
        model.text = model.result
        model.result = undefined
      }
      else {
        model.text = model.value
        model.value = undefined
      }
      model.type = ValueType.Hyperlink
      model.hyperlink = hyperlink
    }
    // const comment = options.commentsMap && options.commentsMap[model.address];
    // if (comment) {
    //     model.comment = comment;
    // }
  }
}
export default CellXform

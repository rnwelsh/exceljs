import { ReadingOrder } from "../../../doc/enums.js"
import { validInt, parseBoolean } from "../../../utils/utils.js"
import BaseXform from "../base-xform.js"
const validation = {
  horizontalValues: [
    'left',
    'center',
    'right',
    'fill',
    'centerContinuous',
    'distributed',
    'justify',
  ].reduce((p, v) => {
    p[v] = true
    return p
  }, {}),
  horizontal(value) {
    return this.horizontalValues[value] ? value : undefined
  },
  verticalValues: ['top', 'middle', 'bottom', 'distributed', 'justify'].reduce((p, v) => {
    p[v] = true
    return p
  }, {}),
  vertical(value) {
    if (value === 'middle')
      return 'center'
    return this.verticalValues[value] ? value : undefined
  },
  wrapText(value) {
    return value ? true : undefined
  },
  shrinkToFit(value) {
    return value ? true : undefined
  },
  textRotation(value) {
    switch (value) {
      case 'vertical':
        return value
      default:
        value = validInt(value)
        return value >= -90 && value <= 90 ? value : undefined
    }
  },
  indent(value) {
    value = validInt(value)
    return Math.max(0, value)
  },
  readingOrder(value) {
    switch (value) {
      case 'ltr':
        return ReadingOrder.LeftToRight
      case 'rtl':
        return ReadingOrder.RightToLeft
      default:
        return undefined
    }
  },
}
const textRotationXform = {
  toXml(textRotation) {
    textRotation = validation.textRotation(textRotation)
    if (textRotation) {
      if (textRotation === 'vertical') {
        return 255
      }
      const tr = Math.round(textRotation)
      if (tr >= 0 && tr <= 90) {
        return tr
      }
      if (tr < 0 && tr >= -90) {
        return 90 - tr
      }
    }
    return undefined
  },
  toModel(textRotation) {
    const tr = validInt(textRotation)
    if (tr !== undefined) {
      if (tr === 255) {
        return 'vertical'
      }
      if (tr >= 0 && tr <= 90) {
        return tr
      }
      if (tr > 90 && tr <= 180) {
        return 90 - tr
      }
    }
    return undefined
  },
}
// Alignment encapsulates translation from style.alignment model to/from xlsx
class AlignmentXform extends BaseXform {
  get tag() {
    return 'alignment'
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    xmlStream.addRollback()
    xmlStream.oN('alignment')
    let isValid = false
    function add(name, value) {
      if (value) {
        xmlStream.addA(name, value)
        isValid = true
      }
    }
    add('horizontal', validation.horizontal(model.horizontal))
    add('vertical', validation.vertical(model.vertical))
    add('wrapText', validation.wrapText(model.wrapText) ? '1' : false)
    add('shrinkToFit', validation.shrinkToFit(model.shrinkToFit) ? '1' : false)
    add('indent', validation.indent(model.indent))
    add('textRotation', textRotationXform.toXml(model.textRotation))
    add('readingOrder', validation.readingOrder(model.readingOrder))
    xmlStream.cN()
    if (isValid) {
      xmlStream.commit()
    }
    else {
      xmlStream.rollback()
    }
  }
  parseOpen(node) {
    const model = {}
    let valid = false
    function add(truthy, name, value) {
      if (truthy) {
        model[name] = value
        valid = true
      }
    }
    add(node.atts.horizontal, 'horizontal', node.atts.horizontal)
    add(node.atts.vertical, 'vertical', node.atts.vertical === 'center' ? 'middle' : node.atts.vertical)
    add(node.atts.wrapText, 'wrapText', parseBoolean(node.atts.wrapText))
    add(node.atts.shrinkToFit, 'shrinkToFit', parseBoolean(node.atts.shrinkToFit))
    add(node.atts.indent, 'indent', parseInt(node.atts.indent, 10))
    add(node.atts.textRotation, 'textRotation', textRotationXform.toModel(node.atts.textRotation))
    add(node.atts.readingOrder, 'readingOrder', node.atts.readingOrder === '2' ? 'rtl' : 'ltr')
    this.model = valid ? model : null
  }
  parseText() { }
  parseClose() {
    return false
  }
}
export default AlignmentXform

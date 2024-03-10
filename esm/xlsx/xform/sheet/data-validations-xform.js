import { map, strcmp, keyBy, isEqual } from "../../../utils/under-dash.js"
import { dateToExcel, excelToDate, parseBoolean } from "../../../utils/utils.js"
import { encodeAddress, decodeEx } from "../../../utils/col-cache.js"
import BaseXform from "../base-xform.js"
import Range from "../../../doc/range.js"
function assign(definedName, atts, name, defaultValue) {
  const value = atts[name]
  if (value !== undefined) {
    definedName[name] = value
  }
  else if (defaultValue !== undefined) {
    definedName[name] = defaultValue
  }
}
function assignBool(definedName, atts, name, defaultValue) {
  const value = atts[name]
  if (value !== undefined) {
    definedName[name] = parseBoolean(value)
  }
  else if (defaultValue !== undefined) {
    definedName[name] = defaultValue
  }
}
function optimiseDataValidations(model) {
  // Squeeze alike data validations together into rectangular ranges
  // to reduce file size and speed up Excel load time
  const dvList = map(model, (dataValidation, address) => ({
    address,
    dataValidation,
    marked: false,
  })).sort((a, b) => strcmp(a.address, b.address))
  const dvMap = keyBy(dvList, 'address')
  const matchCol = (addr, height, col) => {
    for (let i = 0; i < height; i++) {
      const otherAddress = encodeAddress(addr.row + i, col)
      if (!model[otherAddress] || !isEqual(model[addr.address], model[otherAddress])) {
        return false
      }
    }
    return true
  }
  return dvList
    .map(dv => {
      if (!dv.marked) {
        const addr = decodeEx(dv.address)
        if (addr.dimensions) {
          dvMap[addr.dimensions].marked = true
          return {
            ...dv.dataValidation,
            sqref: dv.address,
          }
        }
        // iterate downwards - finding matching cells
        let height = 1
        let otherAddress = encodeAddress(addr.row + height, addr.col)
        while (model[otherAddress] && isEqual(dv.dataValidation, model[otherAddress])) {
          height++
          otherAddress = encodeAddress(addr.row + height, addr.col)
        }
        // iterate rightwards...
        let width = 1
        while (matchCol(addr, height, addr.col + width)) {
          width++
        }
        // mark all included addresses
        for (let i = 0; i < height; i++) {
          for (let j = 0; j < width; j++) {
            otherAddress = encodeAddress(addr.row + i, addr.col + j)
            dvMap[otherAddress].marked = true
          }
        }
        if (height > 1 || width > 1) {
          const bottom = addr.row + (height - 1)
          const right = addr.col + (width - 1)
          return {
            ...dv.dataValidation,
            sqref: `${dv.address}:${encodeAddress(bottom, right)}`,
          }
        }
        return {
          ...dv.dataValidation,
          sqref: dv.address,
        }
      }
      return null
    })
    .filter(Boolean)
}
class DataValidationsXform extends BaseXform {
  get tag() {
    return 'dataValidations'
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    const optimizedModel = optimiseDataValidations(model)
    if (optimizedModel.length) {
      xmlStream.oN('dataValidations', { count: optimizedModel.length })
      optimizedModel.forEach(value => {
        xmlStream.oN('dataValidation')
        if (value.type !== 'any') {
          xmlStream.addA('type', value.type)
          if (value.operator && value.type !== 'list' && value.operator !== 'between') {
            xmlStream.addA('operator', value.operator)
          }
          if (value.allowBlank) {
            xmlStream.addA('allowBlank', '1')
          }
        }
        if (value.showInputMessage) {
          xmlStream.addA('showInputMessage', '1')
        }
        if (value.promptTitle) {
          xmlStream.addA('promptTitle', value.promptTitle)
        }
        if (value.prompt) {
          xmlStream.addA('prompt', value.prompt)
        }
        if (value.showErrorMessage) {
          xmlStream.addA('showErrorMessage', '1')
        }
        if (value.errorStyle) {
          xmlStream.addA('errorStyle', value.errorStyle)
        }
        if (value.errorTitle) {
          xmlStream.addA('errorTitle', value.errorTitle)
        }
        if (value.error) {
          xmlStream.addA('error', value.error)
        }
        xmlStream.addA('sqref', value.sqref);
        (value.formulae || []).forEach((formula, index) => {
          xmlStream.oN(`formula${index + 1}`)
          if (value.type === 'date') {
            xmlStream.writeText(dateToExcel(new Date(formula)))
          }
          else {
            xmlStream.writeText(formula)
          }
          xmlStream.cN()
        })
        xmlStream.cN()
      })
      xmlStream.cN()
    }
  }
  parseOpen(node) {
    switch (node.name) {
      case 'dataValidations':
        this.model = {}
        return true
      case 'dataValidation': {
        this._address = node.atts.sqref
        const dataValidation = { type: node.atts.type || 'any', formulae: [] }
        if (node.atts.type) {
          assignBool(dataValidation, node.atts, 'allowBlank')
        }
        assignBool(dataValidation, node.atts, 'showInputMessage')
        assignBool(dataValidation, node.atts, 'showErrorMessage')
        switch (dataValidation.type) {
          case 'any':
          case 'list':
          case 'custom':
            break
          default:
            assign(dataValidation, node.atts, 'operator', 'between')
            break
        }
        assign(dataValidation, node.atts, 'promptTitle')
        assign(dataValidation, node.atts, 'prompt')
        assign(dataValidation, node.atts, 'errorStyle')
        assign(dataValidation, node.atts, 'errorTitle')
        assign(dataValidation, node.atts, 'error')
        this._dataValidation = dataValidation
        return true
      }
      case 'formula1':
      case 'formula2':
        this._formula = []
        return true
      default:
        return false
    }
  }
  parseText(text) {
    if (this._formula) {
      this._formula.push(text)
    }
  }
  parseClose(name) {
    switch (name) {
      case 'dataValidations':
        return false
      case 'dataValidation': {
        if (!this._dataValidation.formulae || !this._dataValidation.formulae.length) {
          delete this._dataValidation.formulae
          delete this._dataValidation.operator
        }
        // The four known cases: 1. E4:L9 N4:U9  2.E4 L9  3. N4:U9  4. E4
        const list = this._address.split(/\s+/g) || []
        list.forEach(addr => {
          if (addr.includes(':')) {
            const range = new Range(addr)
            range.forEachAddress(address => {
              this.model[address] = this._dataValidation
            })
          }
          else {
            this.model[addr] = this._dataValidation
          }
        })
        return true
      }
      case 'formula1':
      case 'formula2': {
        let formula = this._formula.join('')
        switch (this._dataValidation.type) {
          case 'whole':
          case 'textLength':
            formula = parseInt(formula, 10)
            break
          case 'decimal':
            formula = parseFloat(formula)
            break
          case 'date':
            formula = excelToDate(parseFloat(formula))
            break
          default:
            break
        }
        this._dataValidation.formulae.push(formula)
        this._formula = undefined
        return true
      }
      default:
        return true
    }
  }
}
export default DataValidationsXform

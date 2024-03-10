import BaseXform from "../base-xform.js"
class DateXform extends BaseXform {
  constructor(options) {
    super()
    this.tag = options.tag
    this.attr = options.attr
    this.attrs = options.attrs
    this._format =
      options.format ||
      function (dt) {
        try {
          if (Number.isNaN(dt.getTime()))
            return ''
          return dt.toISOString()
        }
        catch (e) {
          return ''
        }
      }
    this._parse =
      options.parse ||
      function (str) {
        return new Date(str)
      }
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    if (model) {
      xmlStream.oN(this.tag)
      if (this.attrs) {
        xmlStream.addAs(this.attrs)
      }
      if (this.attr) {
        xmlStream.addA(this.attr, this._format(model))
      }
      else {
        xmlStream.writeText(this._format(model))
      }
      xmlStream.cN()
    }
  }
  parseOpen(node) {
    if (node.name === this.tag) {
      if (this.attr) {
        this.model = this._parse(node.atts[this.attr])
      }
      else {
        this.text = []
      }
    }
  }
  parseText(text) {
    if (!this.attr) {
      this.text.push(text)
    }
  }
  parseClose() {
    if (!this.attr) {
      this.model = this._parse(this.text.join(''))
    }
    return false
  }
}
export default DateXform

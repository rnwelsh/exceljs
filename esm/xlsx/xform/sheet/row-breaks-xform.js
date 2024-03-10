import PageBreaksXform from "./page-breaks-xform.js"
import ListXform from "../list-xform.js"
'use strict'
class RowBreaksXform extends ListXform {
  constructor() {
    const options = {
      tag: 'rowBreaks',
      count: true,
      childXform: new PageBreaksXform(),
    }
    super(options)
  }
  // get tag() { return 'rowBreaks'; }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    if (model && model.length) {
      xmlStream.oN(this.tag, this.$)
      if (this.count) {
        xmlStream.addA(this.$count, model.length)
        xmlStream.addA('manualBreakCount', model.length)
      }
      const { childXform } = this
      model.forEach(childModel => {
        childXform.render(xmlStream, childModel)
      })
      xmlStream.cN()
    }
    else if (this.empty) {
      xmlStream.lN(this.tag)
    }
  }
}
export default RowBreaksXform

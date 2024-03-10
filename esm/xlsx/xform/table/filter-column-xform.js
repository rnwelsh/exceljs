import BaseXform from "../base-xform.js"
import ListXform from "../list-xform.js"
import CustomFilterXform from "./custom-filter-xform.js"
import FilterXform from "./filter-xform.js"
class FilterColumnXform extends BaseXform {
  constructor() {
    super()
    this.map = {
      customFilters: new ListXform({
        tag: 'customFilters',
        count: false,
        empty: true,
        childXform: new CustomFilterXform(),
      }),
      filters: new ListXform({
        tag: 'filters',
        count: false,
        empty: true,
        childXform: new FilterXform(),
      }),
    }
  }
  get tag() {
    return 'filterColumn'
  }
  prepare(model, options) {
    model.colId = options.index.toString()
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    if (model.customFilters) {
      xmlStream.oN(this.tag, {
        colId: model.colId,
        hiddenButton: model.filterButton ? '0' : '1',
      })
      this.map.customFilters.render(xmlStream, model.customFilters)
      xmlStream.cN()
      return true
    }
    xmlStream.lN(this.tag, {
      colId: model.colId,
      hiddenButton: model.filterButton ? '0' : '1',
    })
    return true
  }
  parseOpen(node) {
    if (this.parser) {
      this.parser.parseOpen(node)
      return true
    }
    const { atts } = node
    switch (node.name) {
      case this.tag:
        this.model = {
          filterButton: atts.hiddenButton === '0',
        }
        return true
      default:
        this.parser = this.map[node.name]
        if (this.parser) {
          this.parseOpen(node)
          return true
        }
        throw new Error(`Unexpected xml node in parseOpen: ${JSON.stringify(node)}`)
    }
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
        this.model.customFilters = this.map.customFilters.model
        return false
      default:
        // could be some unrecognised tags
        return true
    }
  }
}
export default FilterColumnXform

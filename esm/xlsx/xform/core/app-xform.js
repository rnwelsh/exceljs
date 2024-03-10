import XmlStream from "../../../utils/xml-stream.js"
import BaseXform from "../base-xform.js"
import StringXform from "../simple/string-xform.js"
import AppHeadingPairsXform from "./app-heading-pairs-xform.js"
import AppTitleOfPartsXform from "./app-titles-of-parts-xform.js"
class AppXform extends BaseXform {
  constructor() {
    super()
    this.map = {
      Company: new StringXform({ tag: 'Company' }),
      Manager: new StringXform({ tag: 'Manager' }),
      HeadingPairs: new AppHeadingPairsXform(),
      TitleOfParts: new AppTitleOfPartsXform(),
    }
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    xmlStream.openXml(XmlStream.StdDocAttributes)
    xmlStream.oN('Properties', AppXform.PROPERTY_ATTRIBUTES)
    xmlStream.lN('Application', undefined, 'Microsoft Excel')
    xmlStream.lN('DocSecurity', undefined, '0')
    xmlStream.lN('ScaleCrop', undefined, 'false')
    this.map.HeadingPairs.render(xmlStream, model.worksheets)
    this.map.TitleOfParts.render(xmlStream, model.worksheets)
    this.map.Company.render(xmlStream, model.company || '')
    this.map.Manager.render(xmlStream, model.manager)
    xmlStream.lN('LinksUpToDate', undefined, 'false')
    xmlStream.lN('SharedDoc', undefined, 'false')
    xmlStream.lN('HyperlinksChanged', undefined, 'false')
    xmlStream.lN('AppVersion', undefined, '16.0300')
    xmlStream.cN()
  }
  parseOpen(node) {
    if (this.parser) {
      this.parser.parseOpen(node)
      return true
    }
    switch (node.name) {
      case 'Properties':
        return true
      default:
        this.parser = this.map[node.name]
        if (this.parser) {
          this.parser.parseOpen(node)
          return true
        }
        // there's a lot we don't bother to parse
        return false
    }
  }
  parseText(text) {
    if (this.parser) {
      this.parser.parseText(text)
    }
  }
  parseClose(name) {
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        this.parser = undefined
      }
      return true
    }
    switch (name) {
      case 'Properties':
        this.model = {
          worksheets: this.map.TitleOfParts.model,
          company: this.map.Company.model,
          manager: this.map.Manager.model,
        }
        return false
      default:
        return true
    }
  }
}
AppXform.DateFormat = function (dt) {
  return dt.toISOString().replace(/[.]\d{3,6}/, '')
}
AppXform.DateAttrs = { 'xsi:type': 'dcterms:W3CDTF' }
AppXform.PROPERTY_ATTRIBUTES = {
  xmlns: 'http://schemas.openxmlformats.org/officeDocument/2006/extended-properties',
  'xmlns:vt': 'http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes',
}
export default AppXform

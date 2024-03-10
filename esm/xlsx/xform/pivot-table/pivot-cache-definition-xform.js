import BaseXform from "../base-xform.js"
import CacheField from "./cache-field.js"
import XmlStream from "../../../utils/xml-stream.js"
class PivotCacheDefinitionXform extends BaseXform {
  constructor() {
    super()
    this.map = {}
  }
  prepare(model) {
    // TK
  }
  get tag() {
    // http://www.datypic.com/sc/ooxml/e-ssml_pivotCacheDefinition.html
    return 'pivotCacheDefinition'
  }
  /** @param {XmlStream} xmlStream */
  render(xmlStream, model) {
    const { sourceSheet, cacheFields } = model
    xmlStream.openXml(XmlStream.StdDocAttributes)
    xmlStream.oN(this.tag, {
      ...PivotCacheDefinitionXform.PIVOT_CACHE_DEFINITION_ATTRIBUTES,
      'r:id': 'rId1',
      refreshOnLoad: '1',
      refreshedBy: 'Author',
      refreshedDate: '45125.026046874998',
      createdVersion: '8',
      refreshedVersion: '8',
      minRefreshableVersion: '3',
      recordCount: cacheFields.length + 1,
    })
    xmlStream.oN('cacheSource', { type: 'worksheet' })
    xmlStream.lN('worksheetSource', {
      ref: sourceSheet.dimensions.shortRange,
      sheet: sourceSheet.name,
    })
    xmlStream.cN()
    xmlStream.oN('cacheFields', { count: cacheFields.length })
    // Note: keeping this pretty-printed for now to ease debugging.
    xmlStream.writeXml(cacheFields.map(cacheField => new CacheField(cacheField).render()).join('\n    '))
    xmlStream.cN()
    xmlStream.cN()
  }
  parseOpen(node) {
    // TK
  }
  parseText(text) {
    // TK
  }
  parseClose(name) {
    // TK
  }
  reconcile(model, options) {
    // TK
  }
}
PivotCacheDefinitionXform.PIVOT_CACHE_DEFINITION_ATTRIBUTES = {
  xmlns: 'http://schemas.openxmlformats.org/spreadsheetml/2006/main',
  'xmlns:r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
  'xmlns:mc': 'http://schemas.openxmlformats.org/markup-compatibility/2006',
  'mc:Ignorable': 'xr',
  'xmlns:xr': 'http://schemas.microsoft.com/office/spreadsheetml/2014/revision',
}
export default PivotCacheDefinitionXform

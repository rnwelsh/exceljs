import * as _ from '../../../utils/under-dash.js';
import BaseXform from '../base-xform.js';

function booleanToXml(model) {
  return model ? '1' : undefined;
}

class PrintOptionsXform extends BaseXform {
  get tag() {
    return 'printOptions';
  }

  render(xmlStream, model) {
    if (model) {
      const attributes = {
        headings: booleanToXml(model.showRowColHeaders),
        gridLines: booleanToXml(model.showGridLines),
        horizontalCentered: booleanToXml(model.horizontalCentered),
        verticalCentered: booleanToXml(model.verticalCentered),
      };
      if (_.some(attributes, value => value !== undefined)) {
        xmlStream.leafNode(this.tag, attributes);
      }
    }
  }

  parseOpen(node) {
    switch (node.name) {
      case this.tag:
        this.model = {
          showRowColHeaders: node.attributes.headings === '1',
          showGridLines: node.attributes.gridLines === '1',
          horizontalCentered: node.attributes.horizontalCentered === '1',
          verticalCentered: node.attributes.verticalCentered === '1',
        };
        return true;
      default:
        return false;
    }
  }

  parseText() {}

  parseClose() {
    return false;
  }
}

export default PrintOptionsXform;

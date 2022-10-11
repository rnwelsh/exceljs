import BaseXform from '../../base-xform.js';

class FormulaXform extends BaseXform {
  get tag() {
    return 'formula';
  }

  render(xmlStream, model) {
    xmlStream.leafNode(this.tag, null, model);
  }

  parseOpen() {
    this.model = '';
  }

  parseText(text) {
    this.model += text;
  }

  parseClose(name) {
    return name !== this.tag;
  }
}

export default FormulaXform;

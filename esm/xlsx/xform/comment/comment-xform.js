import RichTextXform from "../strings/rich-text-xform.js";
import BaseXform from "../base-xform.js";
/**
  <comment ref="B1" authorId="0">
    <text>
      <r>
        <rPr>
          <b/>
          <sz val="9"/>
          <rFont val="宋体"/>
          <charset val="134"/>
        </rPr>
        <t>51422:</t>
      </r>
      <r>
        <rPr>
          <sz val="9"/>
          <rFont val="宋体"/>
          <charset val="134"/>
        </rPr>
        <t xml:space="preserve">&#10;test</t>
      </r>
    </text>
  </comment>
 */
class CommentXform extends BaseXform {
    constructor(model) {
        super();
        this.model = model;
    }
    static get tag() {
        return 'r';
    }
    static get richTextXform() {
        if (!this._richTextXform) {
            this._richTextXform = new RichTextXform();
        }
        return this._richTextXform;
    }
    static render(xmlStream, model) {
        model = model || this.model;
        xmlStream.openNode('comment', {
            ref: model.ref,
            authorId: 0,
        });
        xmlStream.openNode('text');
        if (model && model.note && model.note.texts) {
            model.note.texts.forEach(text => {
                this.richTextXform.render(xmlStream, text);
            });
        }
        xmlStream.closeNode();
        xmlStream.closeNode();
    }
    static parseOpen(node) {
        if (this.parser) {
            this.parser.parseOpen(node);
            return true;
        }
        switch (node.name) {
            case 'comment':
                this.model = {
                    type: 'note',
                    note: {
                        texts: [],
                    },
                    ...node.attributes,
                };
                return true;
            case 'r':
                this.parser = this.richTextXform;
                this.parser.parseOpen(node);
                return true;
            default:
                return false;
        }
    }
    static parseText(text) {
        if (this.parser) {
            this.parser.parseText(text);
        }
    }
    static parseClose(name) {
        switch (name) {
            case 'comment':
                return false;
            case 'r':
                this.model.note.texts.push(this.parser.model);
                this.parser = undefined;
                return true;
            default:
                if (this.parser) {
                    this.parser.parseClose(name);
                }
                return true;
        }
    }
}
export default CommentXform;

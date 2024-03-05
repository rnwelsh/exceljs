import ColorXform from "./color-xform.js";
import BooleanXform from "../simple/boolean-xform.js";
import IntegerXform from "../simple/integer-xform.js";
import StringXform from "../simple/string-xform.js";
import UnderlineXform from "./underline-xform.js";
import { each } from "../../../utils/under-dash.js";
import BaseXform from "../base-xform.js";
'use strict';
// Font encapsulates translation from font model to xlsx
class FontXform extends BaseXform {
    constructor(options) {
        super();
        this.options = options || FontXform.OPTIONS;
        this.map = {
            b: { prop: 'bold', xform: new BooleanXform({ tag: 'b', attr: 'val' }) },
            i: { prop: 'italic', xform: new BooleanXform({ tag: 'i', attr: 'val' }) },
            u: { prop: 'underline', xform: new UnderlineXform() },
            charset: { prop: 'charset', xform: new IntegerXform({ tag: 'charset', attr: 'val' }) },
            color: { prop: 'color', xform: new ColorXform() },
            condense: { prop: 'condense', xform: new BooleanXform({ tag: 'condense', attr: 'val' }) },
            extend: { prop: 'extend', xform: new BooleanXform({ tag: 'extend', attr: 'val' }) },
            family: { prop: 'family', xform: new IntegerXform({ tag: 'family', attr: 'val' }) },
            outline: { prop: 'outline', xform: new BooleanXform({ tag: 'outline', attr: 'val' }) },
            vertAlign: { prop: 'vertAlign', xform: new StringXform({ tag: 'vertAlign', attr: 'val' }) },
            scheme: { prop: 'scheme', xform: new StringXform({ tag: 'scheme', attr: 'val' }) },
            shadow: { prop: 'shadow', xform: new BooleanXform({ tag: 'shadow', attr: 'val' }) },
            strike: { prop: 'strike', xform: new BooleanXform({ tag: 'strike', attr: 'val' }) },
            sz: { prop: 'size', xform: new IntegerXform({ tag: 'sz', attr: 'val' }) },
        };
        this.map[this.options.fontNameTag] = {
            prop: 'name',
            xform: new StringXform({ tag: this.options.fontNameTag, attr: 'val' }),
        };
    }
    get tag() {
        return this.options.tagName;
    }
    render(xmlStream, model) {
        const { map } = this;
        xmlStream.openNode(this.options.tagName);
        each(this.map, (defn, tag) => {
            map[tag].xform.render(xmlStream, model[defn.prop]);
        });
        xmlStream.closeNode();
    }
    parseOpen(node) {
        if (this.parser) {
            this.parser.parseOpen(node);
            return true;
        }
        if (this.map[node.name]) {
            this.parser = this.map[node.name].xform;
            return this.parser.parseOpen(node);
        }
        switch (node.name) {
            case this.options.tagName:
                this.model = {};
                return true;
            default:
                return false;
        }
    }
    parseText(text) {
        if (this.parser) {
            this.parser.parseText(text);
        }
    }
    parseClose(name) {
        if (this.parser && !this.parser.parseClose(name)) {
            const item = this.map[name];
            if (this.parser.model) {
                this.model[item.prop] = this.parser.model;
            }
            this.parser = undefined;
            return true;
        }
        switch (name) {
            case this.options.tagName:
                return false;
            default:
                return true;
        }
    }
}
FontXform.OPTIONS = {
    tagName: 'font',
    fontNameTag: 'name',
};
export default FontXform;

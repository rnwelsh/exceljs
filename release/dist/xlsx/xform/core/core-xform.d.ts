export default CoreXform;
declare class CoreXform extends BaseXform {
    map: {
        'dc:creator': StringXform;
        'dc:title': StringXform;
        'dc:subject': StringXform;
        'dc:description': StringXform;
        'dc:identifier': StringXform;
        'dc:language': StringXform;
        'cp:keywords': StringXform;
        'cp:category': StringXform;
        'cp:lastModifiedBy': StringXform;
        'cp:lastPrinted': DateXform;
        'cp:revision': IntegerXform;
        'cp:version': StringXform;
        'cp:contentStatus': StringXform;
        'cp:contentType': StringXform;
        'dcterms:created': DateXform;
        'dcterms:modified': DateXform;
    };
    render(xmlStream: any, model: any): void;
    parseOpen(node: any): boolean;
    parser: any;
    parseClose(name: any): boolean;
}
declare namespace CoreXform {
    function DateFormat(dt: any): any;
    const DateAttrs: {
        'xsi:type': string;
    };
    const CORE_PROPERTY_ATTRIBUTES: {
        'xmlns:cp': string;
        'xmlns:dc': string;
        'xmlns:dcterms': string;
        'xmlns:dcmitype': string;
        'xmlns:xsi': string;
    };
}
import BaseXform from "../base-xform.js";
import StringXform from "../simple/string-xform.js";
import DateXform from "../simple/date-xform.js";
import IntegerXform from "../simple/integer-xform.js";

export default AppXform;
declare class AppXform extends BaseXform {
    map: {
        Company: StringXform;
        Manager: StringXform;
        HeadingPairs: AppHeadingPairsXform;
        TitleOfParts: AppTitleOfPartsXform;
    };
    render(xmlStream: any, model: any): void;
    parseOpen(node: any): boolean;
    parser: any;
    parseClose(name: any): boolean;
}
declare namespace AppXform {
    function DateFormat(dt: any): any;
    const DateAttrs: {
        'xsi:type': string;
    };
    const PROPERTY_ATTRIBUTES: {
        xmlns: string;
        'xmlns:vt': string;
    };
}
import BaseXform from "../base-xform.js";
import StringXform from "../simple/string-xform.js";
import AppHeadingPairsXform from "./app-heading-pairs-xform.js";
import AppTitleOfPartsXform from "./app-titles-of-parts-xform.js";

export default SheetPropertiesXform;
declare class SheetPropertiesXform extends BaseXform {
    map: {
        tabColor: ColorXform;
        pageSetUpPr: PageSetupPropertiesXform;
        outlinePr: OutlinePropertiesXform;
    };
    get tag(): string;
    render(xmlStream: any, model: any): void;
    parseOpen(node: any): boolean;
    parser: any;
    parseText(text: any): boolean;
    parseClose(name: any): boolean;
}
import BaseXform from "../base-xform.js";
import ColorXform from "../style/color-xform.js";
import PageSetupPropertiesXform from "./page-setup-properties-xform.js";
import OutlinePropertiesXform from "./outline-properties-xform.js";

export default WorkbookXform;
declare class WorkbookXform extends BaseXform {
    map: {
        fileVersion: StaticXform;
        workbookPr: WorkbookPropertiesXform;
        bookViews: ListXform;
        sheets: ListXform;
        definedNames: ListXform;
        calcPr: WorkbookCalcPropertiesXform;
    };
    prepare(model: any): void;
    render(xmlStream: any, model: any): void;
    parseOpen(node: any): boolean;
    parser: any;
    parseClose(name: any): boolean;
    reconcile(model: any): void;
}
declare namespace WorkbookXform {
    const WORKBOOK_ATTRIBUTES: {
        xmlns: string;
        'xmlns:r': string;
        'xmlns:mc': string;
        'mc:Ignorable': string;
        'xmlns:x15': string;
    };
    namespace STATIC_XFORMS {
        const fileVersion: StaticXform;
    }
}
import BaseXform from "../base-xform.js";
import StaticXform from "../static-xform.js";
import WorkbookPropertiesXform from "./workbook-properties-xform.js";
import ListXform from "../list-xform.js";
import WorkbookCalcPropertiesXform from "./workbook-calc-properties-xform.js";

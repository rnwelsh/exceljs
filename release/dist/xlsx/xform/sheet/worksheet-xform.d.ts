export default WorkSheetXform;
declare class WorkSheetXform extends BaseXform {
    constructor(options: any);
    map: {
        sheetPr: SheetPropertiesXform;
        dimension: DimensionXform;
        sheetViews: ListXform;
        sheetFormatPr: SheetFormatPropertiesXform;
        cols: ListXform;
        sheetData: ListXform;
        autoFilter: AutoFilterXform;
        mergeCells: ListXform;
        rowBreaks: RowBreaksXform;
        hyperlinks: ListXform;
        pageMargins: PageMarginsXform;
        dataValidations: DataValidationsXform;
        pageSetup: PageSetupXform;
        headerFooter: HeaderFooterXform;
        printOptions: PrintOptionsXform;
        picture: PictureXform;
        drawing: DrawingXform;
        sheetProtection: SheetProtectionXform;
        tableParts: ListXform;
        conditionalFormatting: ConditionalFormattingsXform;
        extLst: ExtListXform;
    };
    prepare(model: any, options: any): void;
    preImageId: any;
    render(xmlStream: any, model: any): void;
    parseOpen(node: any): boolean;
    parser: any;
    parseClose(name: any): boolean;
}
declare namespace WorkSheetXform {
    const WORKSHEET_ATTRIBUTES: {
        xmlns: string;
        'xmlns:r': string;
        'xmlns:mc': string;
        'mc:Ignorable': string;
        'xmlns:x14ac': string;
    };
}
import BaseXform from "../base-xform.js";
import SheetPropertiesXform from "./sheet-properties-xform.js";
import DimensionXform from "./dimension-xform.js";
import ListXform from "../list-xform.js";
import SheetFormatPropertiesXform from "./sheet-format-properties-xform.js";
import AutoFilterXform from "./auto-filter-xform.js";
import RowBreaksXform from "./row-breaks-xform.js";
import PageMarginsXform from "./page-margins-xform.js";
import DataValidationsXform from "./data-validations-xform.js";
import PageSetupXform from "./page-setup-xform.js";
import HeaderFooterXform from "./header-footer-xform.js";
import PrintOptionsXform from "./print-options-xform.js";
import PictureXform from "./picture-xform.js";
import DrawingXform from "./drawing-xform.js";
import SheetProtectionXform from "./sheet-protection-xform.js";
import ConditionalFormattingsXform from "./cf/conditional-formattings-xform.js";
import ExtListXform from "./ext-lst-xform.js";

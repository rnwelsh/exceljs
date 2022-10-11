export default SheetViewXform;
declare class SheetViewXform extends BaseXform {
    get tag(): string;
    prepare(model: any): void;
    render(xmlStream: any, model: any): void;
    parseOpen(node: any): boolean;
    sheetView: {
        workbookViewId: number;
        rightToLeft: boolean;
        tabSelected: boolean;
        showRuler: boolean;
        showRowColHeaders: boolean;
        showGridLines: boolean;
        zoomScale: number;
        zoomScaleNormal: number;
        style: any;
    };
    pane: {
        xSplit: number;
        ySplit: number;
        topLeftCell: any;
        activePane: any;
        state: any;
    };
    selections: {};
    parseText(): void;
    parseClose(name: any): boolean;
    reconcile(): void;
}
import BaseXform from "../base-xform.js";

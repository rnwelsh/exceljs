export default CfRuleXform;
declare class CfRuleXform extends CompositeXform {
    static isPrimitive(rule: any): boolean;
    map: {
        dataBar: DatabarXform;
        extLst: ExtLstRefXform;
        formula: FormulaXform;
        colorScale: ColorScaleXform;
        iconSet: IconSetXform;
    };
    databarXform: DatabarXform;
    extLstRefXform: ExtLstRefXform;
    formulaXform: FormulaXform;
    colorScaleXform: ColorScaleXform;
    iconSetXform: IconSetXform;
    get tag(): string;
    render(xmlStream: any, model: any): void;
    renderExpression(xmlStream: any, model: any): void;
    renderCellIs(xmlStream: any, model: any): void;
    renderTop10(xmlStream: any, model: any): void;
    renderAboveAverage(xmlStream: any, model: any): void;
    renderDataBar(xmlStream: any, model: any): void;
    renderColorScale(xmlStream: any, model: any): void;
    renderIconSet(xmlStream: any, model: any): void;
    renderText(xmlStream: any, model: any): void;
    renderTimePeriod(xmlStream: any, model: any): void;
    createNewModel({ attributes }: {
        attributes: any;
    }): {
        dxfId: any;
        priority: any;
        timePeriod: any;
        percent: any;
        bottom: any;
        rank: any;
        aboveAverage: any;
        type: any;
        operator: any;
    };
}
import CompositeXform from "../../composite-xform.js";
import DatabarXform from "./databar-xform.js";
import ExtLstRefXform from "./ext-lst-ref-xform.js";
import FormulaXform from "./formula-xform.js";
import ColorScaleXform from "./color-scale-xform.js";
import IconSetXform from "./icon-set-xform.js";

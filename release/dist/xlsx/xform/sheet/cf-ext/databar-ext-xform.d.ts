export default DatabarExtXform;
declare class DatabarExtXform extends CompositeXform {
    static isExt(rule: any): boolean;
    map: {
        'x14:cfvo': CfvoExtXform;
        'x14:borderColor': ColorXform;
        'x14:negativeBorderColor': ColorXform;
        'x14:negativeFillColor': ColorXform;
        'x14:axisColor': ColorXform;
    };
    cfvoXform: CfvoExtXform;
    borderColorXform: ColorXform;
    negativeBorderColorXform: ColorXform;
    negativeFillColorXform: ColorXform;
    axisColorXform: ColorXform;
    get tag(): string;
    render(xmlStream: any, model: any): void;
    createNewModel({ attributes }: {
        attributes: any;
    }): {
        cfvo: any[];
        minLength: any;
        maxLength: any;
        border: any;
        gradient: any;
        negativeBarColorSameAsPositive: any;
        negativeBarBorderColorSameAsPositive: any;
        axisPosition: any;
        direction: any;
    };
}
import CompositeXform from "../../composite-xform.js";
import CfvoExtXform from "./cfvo-ext-xform.js";
import ColorXform from "../../style/color-xform.js";

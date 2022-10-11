export default CfRuleExtXform;
declare class CfRuleExtXform extends CompositeXform {
    static isExt(rule: any): boolean;
    map: {
        'x14:dataBar': DatabarExtXform;
        'x14:iconSet': IconSetExtXform;
    };
    databarXform: DatabarExtXform;
    iconSetXform: IconSetExtXform;
    get tag(): string;
    prepare(model: any): void;
    render(xmlStream: any, model: any): void;
    renderDataBar(xmlStream: any, model: any): void;
    renderIconSet(xmlStream: any, model: any): void;
    createNewModel({ attributes }: {
        attributes: any;
    }): {
        type: any;
        x14Id: any;
        priority: any;
    };
}
import CompositeXform from "../../composite-xform.js";
import DatabarExtXform from "./databar-ext-xform.js";
import IconSetExtXform from "./icon-set-ext-xform.js";

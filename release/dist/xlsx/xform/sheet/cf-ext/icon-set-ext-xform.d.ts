export default IconSetExtXform;
declare class IconSetExtXform extends CompositeXform {
    map: {
        'x14:cfvo': CfvoExtXform;
        'x14:cfIcon': CfIconExtXform;
    };
    cfvoXform: CfvoExtXform;
    cfIconXform: CfIconExtXform;
    get tag(): string;
    render(xmlStream: any, model: any): void;
    createNewModel({ attributes }: {
        attributes: any;
    }): {
        cfvo: any[];
        iconSet: any;
        reverse: any;
        showValue: any;
    };
}
import CompositeXform from "../../composite-xform.js";
import CfvoExtXform from "./cfvo-ext-xform.js";
import CfIconExtXform from "./cf-icon-ext-xform.js";

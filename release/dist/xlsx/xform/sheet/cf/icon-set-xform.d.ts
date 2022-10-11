export default IconSetXform;
declare class IconSetXform extends CompositeXform {
    map: {
        cfvo: CfvoXform;
    };
    cfvoXform: CfvoXform;
    get tag(): string;
    render(xmlStream: any, model: any): void;
    createNewModel({ attributes }: {
        attributes: any;
    }): {
        iconSet: any;
        reverse: any;
        showValue: any;
        cfvo: any[];
    };
}
import CompositeXform from "../../composite-xform.js";
import CfvoXform from "./cfvo-xform.js";

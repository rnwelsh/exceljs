export default DatabarXform;
declare class DatabarXform extends CompositeXform {
    map: {
        cfvo: CfvoXform;
        color: ColorXform;
    };
    cfvoXform: CfvoXform;
    colorXform: ColorXform;
    get tag(): string;
    render(xmlStream: any, model: any): void;
    createNewModel(): {
        cfvo: any[];
    };
}
import CompositeXform from "../../composite-xform.js";
import CfvoXform from "./cfvo-xform.js";
import ColorXform from "../../style/color-xform.js";

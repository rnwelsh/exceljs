export default CfvoExtXform;
declare class CfvoExtXform extends CompositeXform {
    map: {
        'xm:f': FExtXform;
    };
    fExtXform: FExtXform;
    get tag(): string;
    render(xmlStream: any, model: any): void;
    createNewModel(node: any): {
        type: any;
    };
}
import CompositeXform from "../../composite-xform.js";
import FExtXform from "./f-ext-xform.js";

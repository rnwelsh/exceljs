export default ConditionalFormattingXform;
declare class ConditionalFormattingXform extends CompositeXform {
    map: {
        cfRule: CfRuleXform;
    };
    get tag(): string;
    render(xmlStream: any, model: any): void;
    createNewModel({ attributes }: {
        attributes: any;
    }): {
        ref: any;
        rules: any[];
    };
}
import CompositeXform from "../../composite-xform.js";
import CfRuleXform from "./cf-rule-xform.js";

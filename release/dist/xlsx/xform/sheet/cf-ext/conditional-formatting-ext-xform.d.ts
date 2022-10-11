export default ConditionalFormattingExtXform;
declare class ConditionalFormattingExtXform extends CompositeXform {
    map: {
        'xm:sqref': SqRefExtXform;
        'x14:cfRule': CfRuleExtXform;
    };
    sqRef: SqRefExtXform;
    cfRule: CfRuleExtXform;
    get tag(): string;
    prepare(model: any, options: any): void;
    render(xmlStream: any, model: any): void;
    createNewModel(): {
        rules: any[];
    };
}
import CompositeXform from "../../composite-xform.js";
import SqRefExtXform from "./sqref-ext-xform.js";
import CfRuleExtXform from "./cf-rule-ext-xform.js";

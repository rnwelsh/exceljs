export default ConditionalFormattingsExtXform;
declare class ConditionalFormattingsExtXform extends CompositeXform {
    map: {
        'x14:conditionalFormatting': ConditionalFormattingExtXform;
    };
    cfXform: ConditionalFormattingExtXform;
    get tag(): string;
    hasContent(model: any): any;
    prepare(model: any, options: any): void;
    render(xmlStream: any, model: any): void;
    createNewModel(): any[];
}
import CompositeXform from "../../composite-xform.js";
import ConditionalFormattingExtXform from "./conditional-formatting-ext-xform.js";

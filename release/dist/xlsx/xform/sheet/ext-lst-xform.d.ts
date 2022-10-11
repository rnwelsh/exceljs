export default ExtLstXform;
declare class ExtLstXform extends CompositeXform {
    map: {
        ext: ExtXform;
    };
    ext: ExtXform;
    get tag(): string;
    prepare(model: any, options: any): void;
    hasContent(model: any): any;
    render(xmlStream: any, model: any): void;
    createNewModel(): {};
}
import CompositeXform from "../composite-xform.js";
declare class ExtXform extends CompositeXform {
    map: {
        'x14:conditionalFormattings': ConditionalFormattingsExt;
    };
    conditionalFormattings: ConditionalFormattingsExt;
    get tag(): string;
    hasContent(model: any): any;
    prepare(model: any, options: any): void;
    render(xmlStream: any, model: any): void;
    createNewModel(): {};
}
import ConditionalFormattingsExt from "./cf-ext/conditional-formattings-ext-xform.js";

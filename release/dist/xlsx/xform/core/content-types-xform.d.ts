export default ContentTypesXform;
declare class ContentTypesXform extends BaseXform {
    render(xmlStream: any, model: any): void;
    parseOpen(): boolean;
    parseText(): void;
    parseClose(): boolean;
}
declare namespace ContentTypesXform {
    namespace PROPERTY_ATTRIBUTES {
        const xmlns: string;
    }
}
import BaseXform from "../base-xform.js";

export default ExtLstRefXform;
declare class ExtLstRefXform extends CompositeXform {
    map: {
        ext: ExtXform;
    };
    get tag(): string;
    render(xmlStream: any, model: any): void;
    createNewModel(): {};
}
import CompositeXform from "../../composite-xform.js";
declare class ExtXform extends CompositeXform {
    map: {
        'x14:id': X14IdXform;
    };
    idXform: X14IdXform;
    get tag(): string;
    render(xmlStream: any, model: any): void;
    createNewModel(): {};
}
declare class X14IdXform extends BaseXform {
    get tag(): string;
    render(xmlStream: any, model: any): void;
    parseOpen(): void;
    parseClose(name: any): boolean;
}
import BaseXform from "../../base-xform.js";

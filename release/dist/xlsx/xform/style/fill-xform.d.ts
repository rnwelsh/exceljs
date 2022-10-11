export default FillXform;
declare class FillXform extends BaseXform {
    map: {
        patternFill: PatternFillXform;
        gradientFill: GradientFillXform;
    };
    get tag(): string;
    render(xmlStream: any, model: any): void;
    parseOpen(node: any): boolean;
    parser: any;
    parseClose(name: any): boolean;
    validStyle(value: any): any;
}
declare namespace FillXform {
    export const validPatternValues: {};
    export { StopXform };
    export { PatternFillXform };
    export { GradientFillXform };
}
import BaseXform from "../base-xform.js";
declare class PatternFillXform extends BaseXform {
    map: {
        fgColor: ColorXform;
        bgColor: ColorXform;
    };
    get name(): string;
    get tag(): string;
    render(xmlStream: any, model: any): void;
    parseOpen(node: any): boolean;
    parser: any;
    parseClose(name: any): boolean;
}
declare class GradientFillXform extends BaseXform {
    map: {
        stop: StopXform;
    };
    get name(): string;
    get tag(): string;
    render(xmlStream: any, model: any): void;
    parseOpen(node: any): boolean;
    parser: StopXform;
    parseClose(name: any): boolean;
}
declare class StopXform extends BaseXform {
    map: {
        color: ColorXform;
    };
    get tag(): string;
    render(xmlStream: any, model: any): void;
    parseOpen(node: any): boolean;
    parser: ColorXform;
    parseText(): void;
    parseClose(name: any): boolean;
}
import ColorXform from "./color-xform.js";

export default BaseXform;
declare class BaseXform {
    static toAttribute(value: any, dflt: any, always?: boolean): any;
    static toStringAttribute(value: any, dflt: any, always?: boolean): any;
    static toStringValue(attr: any, dflt: any): any;
    static toBoolAttribute(value: any, dflt: any, always?: boolean): any;
    static toBoolValue(attr: any, dflt: any): any;
    static toIntAttribute(value: any, dflt: any, always?: boolean): any;
    static toIntValue(attr: any, dflt: any): any;
    static toFloatAttribute(value: any, dflt: any, always?: boolean): any;
    static toFloatValue(attr: any, dflt: any): any;
    prepare(): void;
    render(): void;
    parseOpen(node: any): void;
    parseText(text: any): void;
    parseClose(name: any): void;
    reconcile(model: any, options: any): void;
    reset(): void;
    model: any;
    mergeModel(obj: any): void;
    parse(saxParser: any): Promise<any>;
    parseStream(stream: any): Promise<any>;
    get xml(): string;
    toXml(model: any): string;
}

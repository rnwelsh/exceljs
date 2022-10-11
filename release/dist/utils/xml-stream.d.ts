export function pushAttribute(xml: any, name: any, value: any): void;
export function pushAttributes(xml: any, attributes: any): void;
export default XmlStream;
declare class XmlStream {
    _xml: any[];
    _stack: any[];
    _rollbacks: any[];
    get tos(): any;
    get cursor(): number;
    openXml(docAttributes: any): void;
    openNode(name: any, attributes: any): void;
    leaf: any;
    open: any;
    addAttribute(name: any, value: any): void;
    addAttributes(attrs: any): void;
    writeText(text: any): void;
    writeXml(xml: any): void;
    closeNode(): void;
    leafNode(name: any, attributes: any, text: any): void;
    closeAll(): void;
    addRollback(): number;
    commit(): void;
    rollback(): void;
    get xml(): string;
}
declare namespace XmlStream {
    namespace StdDocAttributes {
        const version: string;
        const encoding: string;
        const standalone: string;
    }
}

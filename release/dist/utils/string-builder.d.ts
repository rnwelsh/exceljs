export default StringBuilder;
declare class StringBuilder {
    get length(): number;
    toString(): string;
    reset(position: any): void;
    _buf: any[];
    addText(text: any): void;
    addStringBuf(inBuf: any): void;
}

export default StringBuf;
declare class StringBuf {
    constructor(options: any);
    _buf: Buffer;
    _encoding: any;
    _inPos: number;
    _buffer: Buffer;
    get length(): number;
    get capacity(): number;
    get buffer(): Buffer;
    toBuffer(): Buffer;
    reset(position: any): void;
    _grow(min: any): void;
    addText(text: any): void;
    addStringBuf(inBuf: any): void;
}

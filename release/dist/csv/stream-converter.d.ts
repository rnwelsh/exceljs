export default StreamConverter;
declare class StreamConverter {
    constructor(inner: any, options: any);
    inner: any;
    innerEncoding: any;
    outerEncoding: any;
    innerBOM: any;
    outerBOM: any;
    writeStarted: boolean;
    convertInwards(data: any): any;
    convertOutwards(data: any): any;
    addListener(event: any, handler: any): void;
    removeListener(event: any, handler: any): void;
    write(data: any, encoding: any, callback: any): void;
    read(): void;
    pipe(destination: any, options: any): void;
    close(): void;
    on(type: any, callback: any): StreamConverter;
    once(type: any, callback: any): void;
    end(chunk: any, encoding: any, callback: any): void;
    emit(type: any, value: any): void;
}

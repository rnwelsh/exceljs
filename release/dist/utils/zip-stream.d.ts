export default ZipWriter;
declare class ZipWriter {
    constructor(options: any);
    options: any;
    zip: JSZip;
    stream: StreamBuf;
    append(data: any, options: any): void;
    finalize(): Promise<void>;
    read(size: any): any;
    setEncoding(encoding: any): any;
    pause(): any;
    resume(): any;
    isPaused(): any;
    pipe(destination: any, options: any): any;
    unpipe(destination: any): any;
    unshift(chunk: any): any;
    wrap(stream: any): any;
}
import JSZip from "jszip";
import StreamBuf from "./stream-buf.js";

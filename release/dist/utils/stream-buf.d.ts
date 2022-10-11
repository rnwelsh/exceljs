export default StreamBuf;
declare class StreamBuf {
    constructor(options: any);
    bufSize: any;
    buffers: any[];
    batch: any;
    corked: boolean;
    inPos: number;
    outPos: number;
    pipes: any[];
    paused: boolean;
    encoding: any;
}

export default StutteredPipe;
declare class StutteredPipe {
    constructor(readable: any, writable: any, options: any);
    readable: any;
    writable: any;
    bufSize: any;
    autoPause: any;
    paused: boolean;
    eod: boolean;
    scheduled: any;
    pause(): void;
    resume(): void;
    _schedule(): void;
}

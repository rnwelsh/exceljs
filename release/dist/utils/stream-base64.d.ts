export default StreamBase64;
declare class StreamBase64 {
    pipes: any[];
    write(): boolean;
    cork(): void;
    uncork(): void;
    end(): void;
    read(): void;
    setEncoding(encoding: any): void;
    encoding: any;
    pause(): void;
    resume(): void;
    isPaused(): void;
    pipe(destination: any): void;
    unpipe(destination: any): void;
    unshift(): void;
    wrap(): void;
}

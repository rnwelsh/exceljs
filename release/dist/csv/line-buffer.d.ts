export default LineBuffer;
declare class LineBuffer extends EventEmitter {
    constructor(options: any);
    encoding: any;
    buffer: any;
    corked: boolean;
    queue: any[];
    write(chunk: any): boolean;
    cork(): void;
    uncork(): void;
    setDefaultEncoding(): void;
    end(): void;
    _flush(): void;
}
import { EventEmitter } from "events";

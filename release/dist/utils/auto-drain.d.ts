export default AutoDrain;
declare class AutoDrain extends EventEmitter {
    write(chunk: any): void;
    end(): void;
}
import { EventEmitter } from "events";

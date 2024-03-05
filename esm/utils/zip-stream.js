import events from "events";
import JSZip from "jszip";
import StreamBuf from "./stream-buf.js";
import { stringToBuffer } from "./browser-buffer-encode.js";
// =============================================================================
// The ZipWriter class
// Packs streamed data into an output zip stream
export class ZipWriter extends events.EventEmitter {
    constructor(options) {
        super();
        this.options = Object.assign({
            type: 'nodebuffer',
            compression: 'DEFLATE',
        }, options);
        this.zip = new JSZip();
        this.stream = new StreamBuf();
    }
    append(data, options) {
        if (options.hasOwnProperty('base64') && options.base64) {
            this.zip.file(options.name, data, { base64: true });
        }
        else {
            data = stringToBuffer(data);
            //// https://www.npmjs.com/package/process
            //// if (process.browser && typeof data === 'string') {
            ////     // use TextEncoder in browser
            //// }
            this.zip.file(options.name, data);
        }
    }
    async finalize() {
        const content = await this.zip.generateAsync(this.options);
        this.stream.end(content);
        this.emit('finish');
    }
    // ==========================================================================
    // Stream.Readable interface
    read(size) {
        return this.stream.read(size);
    }
    setEncoding(encoding) {
        return this.stream.setEncoding(encoding);
    }
    pause() {
        return this.stream.pause();
    }
    resume() {
        return this.stream.resume();
    }
    isPaused() {
        return this.stream.isPaused();
    }
    pipe(destination, options) {
        return this.stream.pipe(destination, options);
    }
    unpipe(destination) {
        return this.stream.unpipe(destination);
    }
    unshift(chunk) {
        return this.stream.unshift(chunk);
    }
    wrap(stream) {
        return this.stream.wrap(stream);
    }
}
export default {
    ZipWriter
};

import StreamBuf from "./stream-buf.js"
import { stringToBuffer } from "./browser-buffer-encode.js"
import { Zip, AsyncZipDeflate } from 'fflate'
import {EventEmitter} from 'node:events'

export class ZipWriter extends EventEmitter {
  constructor(options) {
    super()
    this.options = Object.assign({
      type: 'nodebuffer',
      compression: 'DEFLATE',
    }, options)
    this.zip = new Zip()
    this.stream = new StreamBuf()
  }
  append(data, options) {
    data = stringToBuffer(data)
    const file = new AsyncZipDeflate(options.name)
    this.zip.add(file)
    file.push(data, true)
  }
  async finalize() {
    // const content = this.zip
    this.stream.end(this.zip)
    this.emit('finish')
  }



  // ==========================================================================
  // Stream.Readable interface
  read(size) {
    return this.stream.read(size)
  }
  setEncoding(encoding) {
    return this.stream.setEncoding(encoding)
  }
  pause() {
    return this.stream.pause()
  }
  resume() {
    return this.stream.resume()
  }
  isPaused() {
    return this.stream.isPaused()
  }
  pipe(destination, options) {
    return this.stream.pipe(destination, options)
  }
  unpipe(destination) {
    return this.stream.unpipe(destination)
  }
  unshift(chunk) {
    return this.stream.unshift(chunk)
  }
  wrap(stream) {
    return this.stream.wrap(stream)
  }
}
// export default {
//     ZipWriter
// };

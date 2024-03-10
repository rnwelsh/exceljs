
export default class Buffer extends Uint8Array {

  static TE = new TextEncoder()
  static alloc(size) {
    return new Buffer(size)
  }
  /** @param {Buffer} target
   *  @param {Number} [targetOffset]
   *  @param {Number} [offset]
   *  @param {length} [offset]
   */
  copy(target, targetOffset = 0, offset = 0, length=this.length) {
    return target.set(this.subarray(offset, offset + length), targetOffset)
  }
  static toBuf(data) {
    return Buffer.TE.encode(data)
  }
  static concat(buffers) {
    return Uint8Array.from(buffers)
  }
  write(text,startIndex=0,encoding='utf8') {
    const textArr = Buffer.TE.encode(text)
    const textLen = textArr.length
    for (let i = 0; i < textLen; i++) {
      this[startIndex+i] = textArr[i]
    }
    return textLen
  }

}



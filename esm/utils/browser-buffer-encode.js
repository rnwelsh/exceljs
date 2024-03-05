import { Buffer } from "node:buffer";
const textEncoder = new TextEncoder('utf-8');
export const stringToBuffer = str => typeof str !== 'string' ? str : Buffer.from(textEncoder.encode(str).buffer);
export default { stringToBuffer };

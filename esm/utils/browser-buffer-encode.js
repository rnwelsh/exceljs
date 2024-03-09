const textEncoder = new TextEncoder('utf-8');
export const stringToBuffer = str => typeof str !== 'string' ? str : textEncoder.encode(str).buffer;
export default { stringToBuffer };

const textDecoder = new TextDecoder('utf-8');
export const bufferToString = (chunk) => typeof chunk === 'string' ? chunk : textDecoder.decode(chunk);
export default { bufferToString };

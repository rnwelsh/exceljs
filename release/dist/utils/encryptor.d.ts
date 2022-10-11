export default Encryptor;
declare namespace Encryptor {
    /**
     * Calculate a hash of the concatenated buffers with the given algorithm.
     * @param {string} algorithm - The hash algorithm.
     * @returns {Buffer} The hash
     */
    function hash(algorithm: string, ...buffers: any[]): Buffer;
    /**
     * Calculate a hash of the concatenated buffers with the given algorithm.
     * @param {string} algorithm - The hash algorithm.
     * @returns {Buffer} The hash
     */
    function hash(algorithm: string, ...buffers: any[]): Buffer;
    /**
     * Convert a password into an encryption key
     * @param {string} password - The password
     * @param {string} hashAlgorithm - The hash algoritm
     * @param {string} saltValue - The salt value
     * @param {number} spinCount - The spin count
     * @param {number} keyBits - The length of the key in bits
     * @param {Buffer} blockKey - The block key
     * @returns {Buffer} The encryption key
     */
    function convertPasswordToHash(password: string, hashAlgorithm: string, saltValue: string, spinCount: number): Buffer;
    /**
     * Convert a password into an encryption key
     * @param {string} password - The password
     * @param {string} hashAlgorithm - The hash algoritm
     * @param {string} saltValue - The salt value
     * @param {number} spinCount - The spin count
     * @param {number} keyBits - The length of the key in bits
     * @param {Buffer} blockKey - The block key
     * @returns {Buffer} The encryption key
     */
    function convertPasswordToHash(password: string, hashAlgorithm: string, saltValue: string, spinCount: number): Buffer;
    /**
     * Generates cryptographically strong pseudo-random data.
     * @param size The size argument is a number indicating the number of bytes to generate.
     */
    function randomBytes(size: any): Buffer;
    /**
     * Generates cryptographically strong pseudo-random data.
     * @param size The size argument is a number indicating the number of bytes to generate.
     */
    function randomBytes(size: any): Buffer;
}

const dotProduct = require('./dot-product');
const magnitude = require('./magnitude');

/**
 * Calculates the cosine similarity of two vectors.
 * @param {number[]} a
 * @param {number[]} b
 * @returns {number}
 * @throws {Error} - The parameter must be an array.
 * @throws {Error} - The array must not be empty.
 * @throws {Error} - Array elements must be numbers.
 * @throws {Error} - The arrays must have the same length.
 * @example
 * cosineSimilarity([1, 2, 3], [1, 2, 3]); // 1
 * cosineSimilarity([1, 2, 3], [4, 5, 6]); // 0.9746318461970762
 * */

const cosineSimilarity = (a, b) => {
    return dotProduct(a, b) / (magnitude(a) * magnitude(b));
}

module.exports = cosineSimilarity;
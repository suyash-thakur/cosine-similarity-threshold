const  isArr = require('./validate/is-array');

//**
// * Calculates the dot product of two vectors.
// * @param {number[]} a 
// * @param {number[]} b
// * @returns {number}
// */

const dotProduct = (a, b) => { 
    if (!isArr(a) || !isArr(b)) throw new Error('The parameter must be an array');
    const vec_1 = Array.from(a);
    const vec_2 = Array.from(b);
    if (vec_1.length === 0 || vec_2.length === 0) throw new Error('The array must not be empty');
    if (vec_1.length !== vec_2.length) throw new Error('The arrays must have the same length');

    let sum = 0;
    for (let i = 0; i < vec_1.length; i++) {

        if (typeof vec_1[i] !== 'number' || isNaN(vec_1[i]) || typeof vec_2[i] !== 'number' || isNaN(vec_2[i])) { 
            throw new Error('Array elements must be numbers');
        }

        sum += vec_1[i] *= vec_2[i]
    }
    return sum;
}

module.exports = dotProduct;
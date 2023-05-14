const isArr = require('./validate/is-array');

//**
// * Calculates the magnitude of a vector
// * @param {Array} v
// * @returns {number}
//  */

const magnitude = (v) => {

  if (!isArr(v)) throw new Error('The parameter must be an array');

  if (v.length === 0) {
    throw new Error('The array must not be empty');
  }

  let sum = 0;
  for (let i = 0; i < v.length; i++) {

    if (typeof v[i] !== 'number' || isNaN(v[i])) {
      throw new Error('Array elements must be numbers');
    }

    sum += v[i] * v[i];
  }
  return Math.sqrt(sum);
}

module.exports = magnitude;
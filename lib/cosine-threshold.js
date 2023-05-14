const isArr = require('./validate/is-array');
const cosineSimilarity = require('./cosine-similarity');
const calculateThreshold = require('./calculate-threshold');
const normalize = require('./normalize');

/**
 * Calculates the cosine similarity threshold.
 * @param {Array} dataPoints
 * @param {Object} [options]
 * @param {boolean} [options.normalize=false] - Normalize the data points.
 * @param {string} [options.type='median'] - The type of threshold to calculate.
 * @returns {number}
 * @throws {Error} - The parameter must be an array.
 * @throws {Error} - The array must not be empty.
 * @throws {Error} - Each data point must be a number.
 * @example
 * const dataPoints = [1, 2, 3, 4, 5];
 * const threshold = calculateCosineThreshold(dataPoints);
 * console.log(threshold); // 0.99
 * */

const calculateCosineThreshold = (dataPoints, options = {
  normalize: false,
  type: 'median'
}) => {
  if (!isArr(dataPoints)) {
    throw new Error('The parameter must be an array');
  }
  if (dataPoints.length === 0) {
    throw new Error('The array must not be empty');
  }
  
  if (options.normalize) {
    const normalizedArray = [];
    for (let i = 0; i < dataPoints.length; i++) {
      if (!isArr(dataPoints[i])) {
        throw new Error('Each data point must be an array');
      }
      const normalized = normalize(dataPoints[i]);
      normalizedArray.push(normalized);
    }
    dataPoints = normalizedArray;
  }


  const similarities = [];
  for (let i = 0; i < dataPoints.length; i++) {
    if (!isArr(dataPoints[i])) { 
      throw new Error('Each data point must be an array');
    }
    for (let j = i + 1; j < dataPoints.length; j++) {
      if (!isArr(dataPoints[j])) { 
        throw new Error('Each data point must be an array');
      }
      const similarity = cosineSimilarity(dataPoints[i], dataPoints[j]);
      similarities.push(similarity);
    }
  }
 
  const threshold = calculateThreshold(similarities, options);
  return threshold;
}

module.exports = calculateCosineThreshold;

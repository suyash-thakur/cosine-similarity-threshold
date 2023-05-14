const kmeans = require('node-kmeans');
const cosineSimilarity = require('./cosine-similarity');
const calculateThreshold = require('./calculate-threshold');
const normalize = require('./normalize');
const isArr = require('./validate/is-array');


/**
  * Calculates the cosine similarity threshold using K-means clustering.
  * @param {Array} dataPoints 
  * @param {number} clusterCount 
  * @param {Object} options 
  * @param {boolean} options.normalize - Normalize the data points.
  * @param {string} options.type - The type of threshold to calculate.
  * @returns {number}
  * @throws {Error} - Invalid cluster count.
  * @throws {Error} - The parameter must be an array.
  * @throws {Error} - The array must not be empty.
  * @throws {Error} - Array elements must be numbers.
  * @example
  * const dataPoints = [
  *   [1, 2, 3],
  *   [4, 5, 6],
  *   [7, 8, 9],
  *   [10, 11, 12],
  *   [13, 14, 15]
  * ];
  * const threshold = calculateKMeansThreshold(dataPoints, 5);
  * console.log(threshold); // 0.9999999999999999
**/
async function calculateKMeansThreshold(dataPoints, clusterCount = 5, options = {
  normalize: false,
  type: 'median'
}) {
  if (!isArr(dataPoints)) throw new Error('The parameter must be an array');
  if (dataPoints.length === 0) throw new Error('The array must not be empty');

  
  if (options.normalize) { 
    const normalizedArray = [];
    let data = [];
    for (let i = 0; i < dataPoints.length; i++) {
      if (!isArr(dataPoints[i])) {
        throw new Error('Each data point must be an array');
      }
      const normalized = normalize(dataPoints[i]);
      normalizedArray.push(normalized);
    }
    data = normalizedArray;
  } else {
    data = dataPoints;
  }

  if (typeof clusterCount !== 'number' || clusterCount <= 0) {
    throw new Error('Invalid cluster count. Expected a positive number.');
  }

  let clusters = [];

   await kmeans.clusterize(data, { k: clusterCount }, (err, res) => { 
    if (err) throw new Error(err);
    clusters = res;
  });


  const similarities = [];
 // Calculate the pairwise cosine similarity using cluster centroids
  for (let i = 0; i < clusters.length; i++) {
  for (let j = i + 1; j < clusters.length; j++) {
    const similarity = cosineSimilarity(clusters[i].centroid, clusters[j].centroid);
    similarities.push(similarity);

  }
}

  const threshold = calculateThreshold(similarities, options);

  return threshold;
}

module.exports = calculateKMeansThreshold;

const isArr = require('./validate/is-array');

/**
 * Calculates the threshold of a set of similarities
 * @param {number[]} similarities
 * @param {Object} opts
 * @param {string} opts.type - The type of threshold to calculate. Possible values are 'median', 'mean', 'min', 'percentile'
 * @param {number} opts.percentile - The percentile to use when calculating the threshold. Only used when type is 'percentile'
 * @param {number} opts.deviation - The number of standard deviations to use when calculating the threshold. Only used when type is 'mean'
 * @returns {number}
 * @throws {Error}
 * @example
 * const similarities = [0.1, 0.2, 0.3, 0.4, 0.5];
 * const threshold = calculateThreshold(similarities, { type: 'median' });
 * console.log(threshold); // 0.3
 * 
 * */
const calculateThreshold = (similarities, opts = {
    type: 'median',
    percentile: 75,
    deviation: 1
}) => {
    const { type, percentile, deviation } = opts;
    const sortedSimilarities = Array.from(similarities.sort((a, b) => b - a));
    if (!isArr(similarities)) {
        throw new Error('Similarities must be an array');
    }
    if (similarities.length === 0) {
        throw new Error('Similarities array must not be empty');
    }
    if (type === 'percentile' && (typeof percentile !== 'number' || percentile < 0 || percentile > 100)) { 
        throw new Error('Percentile must be a number between 0 and 100');
    }
    if (type === 'deviation' && (typeof deviation !== 'number' || deviation < 0)) {
        throw new Error('Deviation must be a positive number');
    }

    switch (type) {
        case 'median':
            const thresholdIndex = Math.floor(sortedSimilarities.length / 2);
            console
            return sortedSimilarities[thresholdIndex];
        case 'mean':
            const sum = sortedSimilarities.reduce((acc, curr) => acc + curr, 0);
            return sum / sortedSimilarities.length;
        case 'min':
            return sortedSimilarities[sortedSimilarities.length - 1];
        case 'max':
            return sortedSimilarities[0];
        case 'percentile':
            const percentileIndex = Math.floor(sortedSimilarities.length * (percentile / 100));
            return sortedSimilarities[percentileIndex];
        case 'deviation':
            const mean = sortedSimilarities.reduce((acc, curr) => acc + curr, 0) / sortedSimilarities.length;
            const variance = sortedSimilarities.reduce((acc, curr) => acc + Math.pow(curr - mean, 2), 0) / sortedSimilarities.length;
            const standardDeviation = Math.sqrt(variance);
            return mean + (standardDeviation * deviation);
        default:
            throw new Error('Invalid threshold type');
    }
}

module.exports = calculateThreshold;
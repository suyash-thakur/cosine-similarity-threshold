# Cosine Similarity Threshold

A library for calculating cosine similarity thresholds dynamically.



## Installation

Install cosine-similarity-threshold

```bash
  npm install cosine-similarity-threshold
```
    
## Usage/Examples

```javascript
const { cosineSimilarity, cosineThreshold, kMeansThreshold } = require('cosine-similarity-threshold');

// Calculate cosine similarity between two vectors
const a = [1, 2, 3];
const b = [4, 5, 6];
const similarity = cosineSimilarity(a, b);
console.log(similarity); // Output: 0.9746318461970762

// Calculate cosine similarity threshold
const dataPoints = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [10, 11, 12],
  [13, 14, 15]
];
const threshold = cosineThreshold(dataPoints);
console.log(threshold); // Output: 0.9999999999999999

// Calculate cosine similarity threshold using K-means clustering
const threshold = await kMeansThreshold(dataPoints, 5);
console.log(threshold); // Output: 0.9999999999999999
```

## API

### cosineSimilarity(a, b)

Calculates the cosine similarity between two vectors `a` and `b`.

- `a`: An array representing the first vector.
- `b`: An array representing the second vector.
- Returns: A number representing the cosine similarity between the vectors.


### cosineThreshold(dataPoints)

Calculates the cosine similarity threshold for a set of data points.

- `dataPoints`: An array of data points, where each data point is represented by an array of numbers.
- `options` (optional): An object specifying additional options:
    - `normalize`: A boolean indicating whether to normalize the data points. Default: `false`.
    - `type`: The type of threshold to calculate. Possible values: `'median'` (default), `'mean'`, `'min'`, `'max'`, `'percentile'`, `'deviation'`.
    - `percentile`: The percentile to use when calculating the threshold. Only used when type is `'percentile'`.
    - `deviation`: The number of standard deviations to use when calculating the threshold. Only used when type is `'deviation'`.
- Returns: A number representing the cosine similarity between the vectors.

 The calculation of the cosine similarity threshold in the cosineThreshold function involves the following steps:

    1. Calculate the pairwise cosine similarity between all pairs of data points.
    2. Store the similarity values in an array.
    3. Apply the specified threshold calculation type (median, mean, min, or max) to the similarity array.
    4. Return the calculated threshold value.

### kMeansThreshold(dataPoints, clusterCount, options)
Calculates the cosine similarity threshold using K-means clustering.

- `dataPoints`: An array of data points, where each data point is represented by an array of numbers.
- `clusterCount`: The number of clusters to form. Default value is `5`.
- `options` (optional): An object specifying additional options:
    - `normalize`: A boolean indicating whether to normalize the data points. Default: `false`.
    - `type`: The type of threshold to calculate. Possible values: `'median'` (default), `'mean'`, `'min'`, `'max'`, `'percentile'`, `'deviation'`.
    - `percentile`: The percentile to use when calculating the threshold. Only used when type is `'percentile'`.
    - `deviation`: The number of standard deviations to use when calculating the threshold. Only used when type is `'deviation'`.
- Returns: A number representing the cosine similarity between the vectors.

The calculation of the cosine similarity threshold in the kMeansThreshold function is similar to cosineThreshold, but it involves additional steps due to the K-means clustering process:

    1. If normalize option is true, normalize the data points using a normalization function.
    2. Perform K-means clustering on the data points with the specified clusterCount.
    3. Calculate the pairwise cosine similarity between the cluster centroids.
    4. Store the similarity values in an array.
    5. Apply the specified threshold calculation type (median, mean, min, or max) to the similarity array.
    6. Return the calculated threshold value.

## Error Handling

The library throws errors in the following cases:

- The parameter must be an array.
- The array must not be empty.
- Array elements must be numbers.
- The arrays must have the same length.
- Invalid cluster count. Expected a positive number.
- Each data point must be an array.
- All the elements must have the same dimension.
- Similarities must be an array.
- Similarities array must not be empty.
- Percentile must be a number between 0 and 100.
- Deviation must be a positive number.
- Invalid threshold type.
Please handle these errors appropriately when using the library.


## License

[MIT](https://choosealicense.com/licenses/mit/)


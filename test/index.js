const should = require('should');
const { cosineSimilarity, cosineThreshold, kMeansThreshold } = require('../index');

describe('cosine-similarity', () => {
  it('should calculate the cosine similarity of two vectors', () => {
    const a = [1, 2, 3];
    const b = [1, 2, 3];
    const similarity = cosineSimilarity(a, b);
    similarity.should.be.a.Number().and.equal(1);
  });

  it('should calculate the cosine similarity of two different vectors', () => {
    const a = [1, 2, 3];
    const b = [4, 5, 6];
    const similarity = cosineSimilarity(a, b);
    similarity.should.be.a.Number();
    similarity.should.be.approximately(0.9746318461970762, 0.0001);
  });

  it('should throw an error if the first parameter is not an array', () => {
    (() => {
      cosineSimilarity('invalid', [1, 2, 3]);
    }).should.throw('The parameter must be an array');
  });

  it('should throw an error if the second parameter is not an array', () => {
    (() => {
      cosineSimilarity([1, 2, 3], 'invalid');
    }).should.throw('The parameter must be an array');
  });

  it('should throw an error if the first array is empty', () => {
    (() => {
      cosineSimilarity([], [1, 2, 3]);
    }).should.throw('The array must not be empty');
  });

  it('should throw an error if the second array is empty', () => {
    (() => {
      cosineSimilarity([1, 2, 3], []);
    }).should.throw('The array must not be empty');
  });

  it('should throw an error if the first array elements are not numbers', () => {
    (() => {
      cosineSimilarity([1, 2, 'invalid'], [1, 2, 3]);
    }).should.throw('Array elements must be numbers');
  });

  it('should throw an error if the second array elements are not numbers', () => {
    (() => {
      cosineSimilarity([1, 2, 3], [1, 2, 'invalid']);
    }).should.throw('Array elements must be numbers');
  });

  it('should throw an error if the arrays have different lengths', () => {
    (() => {
      cosineSimilarity([1, 2, 3], [1, 2, 3, 4]);
    }).should.throw('The arrays must have the same length');
  });
}
);

describe('cosineThreshold', () => {
  it('should calculate the cosine similarity threshold', () => {
    const dataPoints = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]];
    const threshold = cosineThreshold(dataPoints);
    threshold.should.be.approximately(0.9746318461970762, 0.0001);
  });

  it('should normalize the data points and calculate the threshold', () => {
    const dataPoints = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]];
    const options = { normalize: true, type: 'median' };
    const threshold = cosineThreshold(dataPoints, options);
    threshold.should.be.approximately(0.9746318461970762, 0.0001);
  });

  it('should throw an error if the parameter is not an array', () => {
    (() => cosineThreshold('not an array')).should.throw('The parameter must be an array');
  });

  it('should throw an error if the array is empty', () => {
    (() => cosineThreshold([])).should.throw('The array must not be empty');
  });

  it('should throw an error if each data point is not an array', () => {
    const dataPoints = [[1, 2, 3], 'not an array', [7, 8, 9]];
    (() => cosineThreshold(dataPoints)).should.throw('Each data point must be an array');
  });
});


describe('k-means-threshold', async() => {
  it('should calculate the cosine similarity threshold using K-means clustering', async () => {
    const dataPoints = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12], [13, 14, 15]];
    const threshold = await kMeansThreshold(dataPoints, 3);
    threshold.should.be.a.Number();
  });

  it('should normalize the data points and calculate the threshold', async () => {
    const dataPoints = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12], [13, 14, 15]];
    const options = { normalize: true, type: 'min' };
    const threshold = await kMeansThreshold(dataPoints, 3, options);
    threshold.should.be.a.Number(); 
  });

  it('should throw an error if the parameter is not an array', async () => {
    await kMeansThreshold('not an array', 3).should.be.rejectedWith('The parameter must be an array');
    
  });

  it('should throw an error if the array is empty', async () => {
    await kMeansThreshold([], 3).should.be.rejectedWith('The array must not be empty');
  });

  it('should throw an error if each data point is not an array', async () => {
    const dataPoints = [[1, 2, 3], 'not an array', [7, 8, 9]];
    await kMeansThreshold(dataPoints, 3).should.be.rejectedWith('All the elements must have the same dimension');
  });

  it('should throw an error if the cluster count is not a positive number', async () => {
    const dataPoints = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12], [13, 14, 15]];
    await kMeansThreshold(dataPoints, -1).should.be.rejectedWith('Invalid cluster count. Expected a positive number.');
  });
}
);


const isArr = require('./validate/is-array');
const magnitude = require('./magnitude');

const normalize = (v) => { 
    if (!isArr(v)) throw new Error('The parameter must be an array');
    if (v.length === 0) throw new Error('The array must not be empty');
    return v.map((x) => {
        if (typeof x !== 'number' || isNaN(x)) throw new Error('Array elements must be numbers');
        return x / magnitude(v);
    });
}

module.exports = normalize;
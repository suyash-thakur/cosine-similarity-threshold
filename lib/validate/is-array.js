/**
    * Function to check if value is an array
    * @param {any} value
    * @returns {boolean}
*/

const isArray = (value) => {
    return Object.prototype.toString.call(value) === '[object Array]';
};

module.exports = isArray;

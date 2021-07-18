/**
 * Random integer generator
 * @param max
 * @returns {number}
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

/**
 * Convert partial value and total value to percentage
 * @param partialValue
 * @param totalValue
 * @returns {number}
 */
function convertToPercentage(partialValue, totalValue) {
    let number = (100 * partialValue) / totalValue;
    return Math.round((number + Number.EPSILON) * 100) / 100;
}

export {getRandomInt, convertToPercentage};

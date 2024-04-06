const reverse = (string) => {
  return string.split("").reverse().join("");
};

const average = (array) => {
  const reducer = (sum, item) => {
    return sum + item;
  };

  return array.length === 0
    ? 0 // return 0 if the array size is 0
    : array.reduce(reducer, 0) / array.length; // do the average calc if there's elements in the array
};

module.exports = {
  reverse,
  average,
};

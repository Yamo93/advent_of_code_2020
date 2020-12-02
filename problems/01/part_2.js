const solve = (input) => {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
      for (let k = 0; k < input.length; k++) {
        let first = input[i];
        let second = input[j];
        let third = input[k];

        if (first + second + third === 2020) {
          return {
            first,
            second,
            third,
            multiplied: first * second * third,
          };
        }
      }
    }
  }

  return {};
};

module.exports = { solve };

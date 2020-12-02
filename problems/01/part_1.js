const solve = (input) => {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
      let first = input[i];
      let second = input[j];

      if (first + second === 2020) {
        return {
          first,
          second,
          multiplied: first * second,
        };
      }
    }
  }

  return {};
};

module.exports = { solve };

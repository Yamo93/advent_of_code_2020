const solve = (input) => {
  let counter = 0;

  for (let i = 0; i < input.length; i++) {
    const chunks = input[i].split(' ');
    const [range, letter, password] = chunks;
    const letterToMatch = letter[0];
    const [lowestLetter, highestLetter] = range.split('-');
    const firstPosition = password[lowestLetter - 1];
    const secondPosition = password[highestLetter - 1];

    const neitherContainsLetter = letterToMatch !== firstPosition && letterToMatch !== secondPosition;
    const bothContainLetter = letterToMatch === firstPosition && letterToMatch === secondPosition;

    if (neitherContainsLetter) {
      continue;
    }
    
    if (bothContainLetter) {
      continue;
    }
    
    counter++;
  }

  return 'Amount of valid passwords: ' + counter;
}

module.exports = { solve }
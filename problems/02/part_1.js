const solve = (input) => {
  let counter = 0;
  
  input.forEach(entry => {
    const chunks = entry.split(' ');
    const [range, letterToMatch, password] = chunks;
    const [lowestLetter, highestLetter] = range.split('-');
    const occurrences = password.split('').reduce((acc, current) => {
      if (current === letterToMatch[0]) {
        return acc + 1;
      }
      return acc;
    }, 0);

    const occursWithinRange = occurrences >= lowestLetter && occurrences <= highestLetter;
    if (occursWithinRange) {
      counter++;
    }
  })
  return 'Amount of valid passwords: ' + counter
}

module.exports = { solve }
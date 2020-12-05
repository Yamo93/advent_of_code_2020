const decodeCharacters = (lowestRange, highestRange, lowerHalfChar, higherHalfChar) => {
  return (rowCode) => {
    let updatedLowestRange = lowestRange, updatedHighestRange = highestRange;
    for (let i = 0; i < rowCode.length; i++) {
      let character = rowCode[i];
      let difference = (updatedHighestRange - updatedLowestRange) / 2;
      if (character === lowerHalfChar) { // Lower half
        // Update highest
        updatedHighestRange -= Math.ceil(difference);
      }
      if (character === higherHalfChar) { // Upper half
        // Update lowest
        updatedLowestRange += Math.ceil(difference);
      }
    }
  
    let lastRowCharacter = rowCode[rowCode.length - 1];
    if (lastRowCharacter === lowerHalfChar) {
      return updatedLowestRange;
    }
    return updatedHighestRange;
  };
};

const generateSeatId = (decodedRow, decodedColumn) => {
  const seatId = (decodedRow * 8) + decodedColumn;
  return seatId;
};

const findMySeat = (seatIds) => {
  const sortedSeatIds = seatIds.sort((a, b) => a - b);
  for (let i = 0; i < sortedSeatIds.length; i++) {
    let currentSeatId = sortedSeatIds[i];
    let previousSeatId = sortedSeatIds[i - 1];
    if (!previousSeatId) continue;
    if (currentSeatId - previousSeatId === 2) {
      return currentSeatId - 1;
    }
  }
};

const lowestRowRange = 0;
const highestRowRange = 127;
const lowestColumnRange = 0;
const highestColumnRange = 7;
const decodeRow = decodeCharacters(lowestRowRange, highestRowRange, 'F', 'B');
const decodeColumn = decodeCharacters(lowestColumnRange, highestColumnRange, 'L', 'R');
const seatIds = [];

const solve = (seatCodes) => {
  const dividedSeatCodes = seatCodes.map(code => [code.slice(0, 7), code.slice(7)]);
  for (let i = 0; i < dividedSeatCodes.length; i++) {
    const [rowCode, columnCode] = dividedSeatCodes[i];
    const decodedRow = decodeRow(rowCode);
    const decodedColumn = decodeColumn(columnCode);
    const generatedSeatId = generateSeatId(decodedRow, decodedColumn);
    seatIds.push(generatedSeatId);
  }

  const mySeat = findMySeat(seatIds);
  return mySeat;
}

module.exports = { solve }
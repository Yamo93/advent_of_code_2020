const isTree = (char) => {
  if (!char) return false;
  return char === '#';
}

const isOpenSquare = (char) => {
  if (!char) return false;
  return char === '.';
}

const solve = (rows) => {
  const trees = [];
  const currentPosition = {
    zeroBasedRow: 0,
    zeroBasedPosition: 0
  };
  const positionsToJump = 3;
  const rowsToJump = 1;
  const twoDimensionalArray = rows.map(row => [...row]);
  const maximumPosition = twoDimensionalArray.length * positionsToJump;
  console.log('maximumPosition', maximumPosition);
  for (i = 0; i < twoDimensionalArray.length; i++) {
    currentPosition.zeroBasedPosition = currentPosition.zeroBasedPosition + positionsToJump;
    currentPosition.zeroBasedRow = i + rowsToJump;
    let newPositionAfterSlope;
    let upcomingRow = twoDimensionalArray[currentPosition.zeroBasedRow];
    if (upcomingRow && upcomingRow[currentPosition.zeroBasedPosition]) {
      newPositionAfterSlope = upcomingRow[currentPosition.zeroBasedPosition];
    }
    
    if (upcomingRow && !upcomingRow[currentPosition.zeroBasedPosition]) {
      currentPosition.zeroBasedPosition = currentPosition.zeroBasedPosition + positionsToJump % upcomingRow.length;
      newPositionAfterSlope = upcomingRow[currentPosition.zeroBasedPosition];
    }

    if (isTree(newPositionAfterSlope)) {
      trees.push(newPositionAfterSlope);
      upcomingRow[currentPosition.zeroBasedPosition] = 'X';
    }

    if (isOpenSquare(newPositionAfterSlope)) {
      upcomingRow[currentPosition.zeroBasedPosition] = 'O';
    }
  }

  console.log(twoDimensionalArray.map(row => row.join('')));
  return 'Amount of trees: ' + trees.length;
}

module.exports = { solve }
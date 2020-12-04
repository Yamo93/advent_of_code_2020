const isTree = (char) => {
  if (!char) return false;
  return char === '#';
}

const countTrees = (rows, right, down) => {
  let amountOfTrees = 0;
  let startPosition = right;
  for (let i = down; i < rows.length; i += down) {
    let currentRow = rows[i];
    const isPositionOutOfBounds = startPosition > currentRow.length - 1;
    if (isPositionOutOfBounds) {
      startPosition = startPosition - currentRow.length;
    }

    const char = currentRow[startPosition];
    if (isTree(char)) {
      amountOfTrees++;
    }

    startPosition += right;
  }

  return amountOfTrees;
};

const solve = (rows) => {
  const first = countTrees(rows, 1, 1);
  const second = countTrees(rows, 3, 1);
  const third = countTrees(rows, 5, 1);
  const fourth = countTrees(rows, 7, 1);
  const fifth = countTrees(rows, 1, 2);
  const multiplied = first * second * third * fourth * fifth;
  return `Multiplied amount: ${multiplied} trees`;
}

module.exports = { solve }
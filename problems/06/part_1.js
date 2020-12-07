const solve = (groups) => {
  const questionGroupCounts = [];
  const dividedGroups = groups.map(group => [
    ...group
        .split('\n')
        .join('')
        .split('')
        .filter((value, index, array) => array.indexOf(value) === index)
  ]);
  dividedGroups.forEach(dividedGroup => {
    questionGroupCounts.push(dividedGroup.length);
  });
  const sumOfCounts = questionGroupCounts.reduce((acc, curr) => acc + curr, 0);
  return 'The sum of counts: ' + sumOfCounts;
}

module.exports = { solve }
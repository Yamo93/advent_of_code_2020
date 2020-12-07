const solve = (groups) => {
  const questionGroupCounts = [];
  const dividedGroups = groups.map(group => [
    ...group
        .split('\n')
        .filter(val => val)
  ])
  dividedGroups.forEach((group, index, array) => {
    let amountOfQuestionsToWhichEveryoneAnsweredYes = 0;
    let questions = group.join('').split('').filter((value, index, array) => array.indexOf(value) === index);
    questions.forEach(question => {
      if (group.every(person => person.includes(question))) {
        amountOfQuestionsToWhichEveryoneAnsweredYes++;
      }
    });
    questionGroupCounts.push(amountOfQuestionsToWhichEveryoneAnsweredYes);
  });
  const sumOfQuestionGroupCounts = questionGroupCounts.reduce((acc, curr) => acc + curr, 0);
  return 'The amount of questions to which everyone answered yes: ' + sumOfQuestionGroupCounts;
}

module.exports = { solve }
const inputs = require("./inputParser.js");

const arguments = process.argv.slice(2);
const keepLineBreakDays = ['4'];

if (arguments.length) {
  runSolution(day = arguments[0], part = arguments[1]);
}

function runSolution(day = 1, part = 1) {
  const paddedDay = `${day}`.padStart(2, 0);
  const solverPath = `${__dirname}/../problems/${paddedDay}/part_${part}.js`;

  try {
    let input = inputs(day);
    console.log('Day number', day);
    if (keepLineBreakDays.includes(day)) {
      const keepLineBreaks = true;
      input = inputs(day, keepLineBreaks);
    }

    const solver = require(solverPath);
    
    console.log();
    console.time(`Execution time`)
    const solution = solver.solve(input);
    
    console.log(`Solution for [day ${day}] [part ${part}]:`);
    console.log(solution);
    console.log();

    console.timeEnd('Execution time')
  } catch (error) {
    console.log(error)
  }
}

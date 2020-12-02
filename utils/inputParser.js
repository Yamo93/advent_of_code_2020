const fs = require('fs');

const parseProblemInput = (day) => {
  let problemInput;

  try {
    const paddedDay = `${day}`.padStart(2, 0)
    const path = `${__dirname}/../problems/${paddedDay}/input`

    problemInput = fs.readFileSync(path, 'utf8')
      .toString()
      .split('\n')
      .filter(text => text.length > 0)
  } catch (error) {
    if (error.code == 'ENOENT') {
      console.error(`Looks like the input file is missing for day ${day}`)
      console.error(`Try running npm bootstrap ${day}`)
    }

    throw error
  }

  return problemInput;
}

module.exports = parseProblemInput
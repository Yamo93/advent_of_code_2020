const { promisify } = require('util')
const fetch = require("node-fetch");
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();

const arguments = process.argv.slice(2);

if (arguments.length) {
  boostrapProblem(day = arguments[0]);
}

async function boostrapProblem(day) {
  const paddedDay = `${day}`.padStart(2, 0);

  const inputPath = `${__dirname}/../problems/${paddedDay}/input`;

  if (fs.existsSync(inputPath)) {
    console.log("Input file already exist, will not overwrite");
    return false;
  }

  const response = await fetch(
    `https://adventofcode.com/2020/day/${day}/input`,
    {
      headers: {
        cookie: `session=${process.env.SESSION || ""}`,
      },
    }
  );

  switch (response.status) {
    case 200:
      // Everything is coolio
      break;
    case 404:
      console.error("Looks like the problem input file does not exist yet");
      return false;
    case 400:
      console.error(
        "Looks like you forgot to add your SESSION value in the .env file"
      );
      return false;
    default:
      break;
  }

  const content = await response.text();

  await promisify(fs.writeFile)(inputPath, content, (error) => {
    if (error) {
      throw error;
    }
  });

  console.info("Created input file")
  return true;
}

module.exports = boostrapProblem;

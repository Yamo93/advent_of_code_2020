const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

let validPassports = 0;
let invalidPassports = 0;

const isValueOutOfBounds = (value, lowest, highest) => value < lowest || value > highest;

const hasAllRequiredFields = (passport) => {
  if (!passport) return false;
  for (let i = 0; i < requiredFields.length; i++) {
    if (!passport.hasOwnProperty(requiredFields[i])) {
      return false;
    }
  }
  return true;
};

const hasFourDigits = (key, lowestYear, highestYear) => {
  return (passport) => {
    if (!passport || !passport.hasOwnProperty(key)) {
      return false;
    }
    const propValue = passport[key];
    if (isValueOutOfBounds(propValue, lowestYear, highestYear)) {
      return false;
    }
    return true;
  };
};

const birthYearHasFourDigits = hasFourDigits("byr", "1920", "2002");
const issueYearHasFourDigits = hasFourDigits("iyr", "2010", "2020");
const expirationYearHasFourDigits = hasFourDigits("eyr", "2020", "2030");

const isWithinHeightRange = (heightValue, heightUnit) => {
  if (!heightValue || !heightUnit) return false;
  const lowestHeightInCm = '150', highestHeightInCm = '193',
        lowestHeightInIn = '59', highestHeightInIn = '75';
  if (heightUnit === "cm") {
    if (isValueOutOfBounds(heightValue, lowestHeightInCm, highestHeightInCm)) {
      return false;
    }
    return true;
  }

  if (heightUnit === "in") {
    if (isValueOutOfBounds(heightValue, lowestHeightInIn, highestHeightInIn)) {
      return false;
    }
    return true;
  }
  return true;
};

const hasValidHeight = (passport) => {
  if (!passport || !passport.hasOwnProperty("hgt")) {
    return false;
  }
  let heightValue;
  let heightUnit;
  const height = passport["hgt"];
  for (let i = 0; i < height.length; i++) {
    if (isNaN(passport["hgt"][i])) {
      heightValue = passport["hgt"].slice(0, i);
      heightUnit = passport["hgt"].slice(i);
      break;
    }
  }

  return isWithinHeightRange(heightValue, heightUnit);
};

const hasValidHairColor = (passport) => {
  if (!passport || !passport.hasOwnProperty("hcl")) return false;
  const hexRegex = new RegExp(/#[0-9a-f]{6}/gi);
  if (!hexRegex.test(passport.hcl)) {
    return false;
  }
  return true;
};

const hasValidEyeColor = (passport) => {
  if (!passport || !passport.hasOwnProperty("ecl")) return false;
  const validEyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
  if (!validEyeColors.includes(passport.ecl)) {
    return false;
  }
  return true;
};

const hasValidPassportId = (passport) => {
  if (!passport || !passport.hasOwnProperty("pid") || !passport.pid)
    return false;
  if (isNaN(passport.pid) || passport.pid.length !== 9) {
    return false;
  }
  return true;
};

const validators = [
  hasAllRequiredFields,
  birthYearHasFourDigits,
  issueYearHasFourDigits,
  expirationYearHasFourDigits,
  hasValidHeight,
  hasValidHairColor,
  hasValidEyeColor,
  hasValidPassportId,
];

const validatePassport = (passport) => {
  if (!passport) return false;
  for (let i = 0; i < validators.length; i++) {
    if (typeof validators[i] !== "function") {
      continue;
    }
    if (!validators[i](passport)) {
      invalidPassports++;
      return false;
    }
  }
  validPassports++;
  return true;
};

const solve = (passportInput) => {
  passportInput.forEach((pp) => {
    const passport = {};
    let pairs = pp.split("\n").join(" ").split(" ");

    pairs.forEach((pair) => {
      let [key, value] = pair.split(":");
      passport[key] = value;
    });

    validatePassport(passport);
  });

  return (
    "Amount of valid passports: " +
    validPassports +
    "\nAmount of invalid passports: " +
    invalidPassports
  );
};

module.exports = { solve };

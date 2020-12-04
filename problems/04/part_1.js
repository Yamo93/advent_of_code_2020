const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

let validPassports = 0;
let invalidPassports = 0;
const passports = [];

const validatePassport = (passport) => {
  if (!passport) return false;
  let isPassportValid = false;
  for (let i = 0; i < requiredFields.length; i++) {
    if (!passport.hasOwnProperty(requiredFields[i])) {
      invalidPassports++;
      return isPassportValid;
    }
  }
  validPassports++;
  isPassportValid = true;
  return isPassportValid;
};

const solve = (passportInput) => {
  passportInput.forEach(pp => {

    const passport = {};
    let pairs = pp.split('\n').join(' ').split(' ');

    pairs.forEach(pair => {
      let [key, value] = pair.split(':');
      passport[key] = value;
    })

    validatePassport(passport);
  });

  return 'Amount of valid passports: ' + validPassports + '\nAmount of invalid passports: ' + invalidPassports;
}

module.exports = { solve }
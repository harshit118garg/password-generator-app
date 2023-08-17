const lowerCase = `abcdefghijklmnopqrstuvwxyz`;
function getRandomLowerCase() {
  return lowerCase[Math.floor(Math.random() * lowerCase.length)];
}

const upperCase = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`;
function getRandomUpperCase() {
  return upperCase[Math.floor(Math.random() * upperCase.length)];
}

const numericChar = `0123654789`;
function getRandomNumber() {
  return numericChar[Math.floor(Math.random() * numericChar.length)];
}

const symbols = "!@#$%&()[]{}/+-*=";
function getSymbol() {
  const myArray = symbols.split("");
  var randomElement = myArray.sort(() => 0.5 - Math.random())[0];
  return randomElement;
}

export const getPasswordObj = (state) => {
  let passwordObj = {};

  for (let key of Object.keys(state)) {
    if (typeof state[key] === "boolean" && state[key]) {
      passwordObj = { ...passwordObj, [key]: state[key] };
    }
  }

  return passwordObj;
};

export const generatePasswordString = (passwordObj, passwordLength) => {
  let password = "";
  for (
    let i = 0;
    i < Number(passwordLength);
    i += Object.keys(passwordObj).length
  ) {
    if (passwordObj.UpperCase_Letters) password += `${getRandomUpperCase()}`;
    if (passwordObj.LowerCase_Letters) password += `${getRandomLowerCase()}`;
    if (passwordObj.Numbers) password += `${getRandomNumber()}`;
    if (passwordObj.Symbols) password += `${getSymbol()}`;
  }

  return password.substring(0, Number(passwordLength));
};

export const getPasswordStrength = (passwordString) => {
  const regexLowercase = /[a-z]/;
  const regexUppercase = /[A-Z]/;
  const regexDigits = /[0-9]/;
  const regexSpecialChars = /[!@#$%&(){}\[\]\/+\-*=]/;

  let strength = 0;

  if (passwordString.length >= 8) strength += 5; 
  if (regexLowercase.test(passwordString)) strength += 5;
  if (regexUppercase.test(passwordString)) strength += 5;
  if (regexDigits.test(passwordString)) strength += 5;
  if (regexSpecialChars.test(passwordString)) strength += 5;

  return strength;
};

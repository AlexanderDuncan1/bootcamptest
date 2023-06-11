var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var passwordLength;

  // Prompt for a valid password length
  while (true) {
    passwordLength = prompt("Enter your desired password length (between 8 and 128 characters):");

    if (passwordLength >= 8 && passwordLength <= 128 && !isNaN(passwordLength)) {
      break;
    }

    alert("Not a Valid Number, Please enter a number between 8 and 128");
  }

  var includeCapital = confirm("Include capital letters?");
  var includeNumbers = confirm("Include numbers?");
  var includeSpecial = confirm("Include special characters?");

  var password = generatePassword(passwordLength, includeCapital, includeNumbers, includeSpecial);
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Generate password based on user preferences
function generatePassword(length, includeCapital, includeNumbers, includeSpecial) {
  var charset = "abcdefghijklmnopqrstuvwxyz";
  var password = "";

  if (includeCapital) {
    charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }

  if (includeNumbers) {
    charset += "0123456789";
  }

  if (includeSpecial) {
    charset += "!@#$%^&*()";
  }

  for (var i = 0; i < length; i++) {
    var randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }

  return password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

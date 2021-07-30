const form = document.querySelector("#form");
const inputDate = document.querySelector("#bday-date");
const output = document.querySelector("#output");
const loader = document.querySelector("#loader");

const months = {
  "Jan": "01",
  "Feb": "02",
  "Mar": "03",
  "Apr": "04",
  "May": "05",
  "Jun": "06",
  "Jul": "07",
  "Aug": "08",
  "Sep": "09",
  "Oct": "10",
  "Nov": "11",
  "Dec": "12"
}


function dateTypes(date) {
  date = date.split("-");
  let types = [];
  types.push(date[0] + date[1] + date[2]); // yyyy-mm-dd
  types.push(date[2] + date[1] + date[0]); // dd-mm-yyyy
  types.push(date[2] + date[1] + date[0][2] + date[0][3]); // dd-mm-yy
  types.push((date[1][0] === '0' ? date[1][1] : date[1]) + date[0] + date[2]); //m-dd-yyyy
  types.push((date[1][0] === '0' ? date[1][1] : date[1]) + date[0] + (date[2][0] === '0' ? date[2][1] : date[2]));

  let palindromeDate = "";

  types.forEach(type => {
    if (isPalindrome(type)) {
      palindromeDate = type;
    }
  });

  return palindromeDate;
}


function findNextPalindrome(date, days) {
  days++;
  date = new Date(Date.parse(date) + 86400000);
  date = date.toString().split(" ");
  date = `${date[3]}-${months[date[1]]}-${date[2]}`;

  let palindromeDate = dateTypes(date);
  if (palindromeDate !== "") {
    return {
      days,
      dateType: palindromeDate
    };
  }
  return findNextPalindrome(date, days);
}

function isPalindrome(type) {
  let i = 0, len = type.length;
  while (i < len) {
    if (type[i] !== type[len - i - 1])
      return false;
    i++;
  }
  return true;
}


function checkIfPalindrome() {
  loader.style.display = "none";
  output.style.display = "block";
  let date = inputDate.value;

  // checking if any type of date is palindrome
  let palindromeDate = dateTypes(date);

  // paasing date to find next palindrome
  let nextPalindromeObj, days = 0;
  if (palindromeDate === "")
    nextPalindromeObj = findNextPalindrome(inputDate.value, days);

  output.innerText = palindromeDate === "" ? "Awww.. unfortunately your birthday date is not a palindrome:( Next palindrome date would be " + nextPalindromeObj.dateType + "that is after " + nextPalindromeObj.days + " days" : "Woohooo! Your birthday date is a palindrome in this format " + palindromeDate;
}

function setDelay(event) {
  loader.style.display = "block";
  output.style.display = "none";

  setTimeout(checkIfPalindrome, 3000);
  event.preventDefault();
}

form.addEventListener("submit", setDelay);
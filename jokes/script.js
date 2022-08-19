const url = "https://api.chucknorris.io/jokes/random";
const addButton = document.getElementById("add");
const clearButton = document.getElementById("clear");
const outcome = document.querySelector(".outcome");
const jokesInPage = document.querySelector(".jokesInPage");
const totalLetters = document.querySelector(".totalLetters");
let jokesCounter = 0;
let totalLettersCount = 0;

clearButton.addEventListener("click", () => {
  outcome.innerHTML = "";
  jokesInPageCalc(0);
  letterCount(0);
});
addButton.addEventListener("click", () => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      jokesInPageCalc("+");
      letterCount(data.value, "+");
      displayJoke(data);
    })
    .catch((e) => console.log(e));
});

function displayJoke(jokeObj) {
  const jokeValue = jokeObj.value;
  const iconUrl = jokeObj.icon_url;
  const timeCreated = jokeObj.created_at;
  const url = jokeObj.url;
  const id = jokeObj.id;
  const div = document.createElement("div");
  div.setAttribute("class", "container");
  div.setAttribute("id", id);

  const time = document.createElement("p");
  time.innerHTML = `Updated @ ${timeCreated}`;

  const joke = document.createElement("p");
  joke.textContent = jokeValue;
  const img = document.createElement("img");
  img.src = iconUrl;

  const link = document.createElement("a");
  link.textContent = "Link to joke";
  link.href = url;

  const buttonContainer = document.createElement("div");
  buttonContainer.setAttribute("class", "buttonContainer");

  const randomColor = document.createElement("button");
  randomColor.textContent = "RANDOM CARD COLOR";
  randomColor.addEventListener("click", () => {
    const numbers = generateRandomColor();
    const degree = numbers[numbers.length - 1];
    const gradient = `linear-gradient(${degree}deg, rgba(${numbers[0]}, ${numbers[1]}, ${numbers[2]}, ${numbers[3]}), rgba(${numbers[4]}, ${numbers[5]}, ${numbers[6]}, ${numbers[7]}))`;
    div.style.backgroundImage = gradient;
  });

  const close = document.createElement("button");
  close.textContent = "CLOSE";
  close.addEventListener("click", (event) => {
    const currentContainer = event.target.parentElement.parentElement;
    currentContainer.remove();
    jokesInPageCalc("-");
    letterCount(jokeValue, "-");
  });
  buttonContainer.append(randomColor);
  buttonContainer.append(close);
  div.append(img);
  div.append(time);
  div.append(link);
  div.append(joke);
  div.append(buttonContainer);
  outcome.append(div);
}

//Generate random color
function generateRandomColor() {
  let colorArr = [];
  let degree;

  for (let i = 0; i < 8; i++) {
    const number = Math.floor(Math.random() * 255 + 1);
    colorArr.push(number);
  }
  degree = Math.floor(Math.random() * 360);
  colorArr.push(degree);
  return colorArr;
}

//Calculate jokes at page
function jokesInPageCalc(symbol) {
  if (symbol === "+") {
    jokesCounter++;
    jokesInPage.innerHTML = `Jokes in page: ${jokesCounter}`;
  } else if (symbol === 0) {
    jokesCounter = 0;
    jokesInPage.innerHTML = `Jokes in page: ${jokesCounter}`;
  } else {
    jokesCounter--;
    jokesInPage.innerHTML = `Jokes in page: ${jokesCounter}`;
  }
}
//Calculate joke letters
function letterCount(joke, symbol) {
  if (symbol === "+") {
    totalLettersCount += joke.length;
    totalLetters.innerHTML = `Total letters count: ${totalLettersCount}`;
  } else if (joke === 0 && !symbol) {
    totalLettersCount = 0;
    totalLetters.innerHTML = `Total letters count: ${totalLettersCount}`;
  } else {
    totalLettersCount -= joke.length;
    totalLetters.innerHTML = `Total letters count: ${totalLettersCount}`;
  }
}

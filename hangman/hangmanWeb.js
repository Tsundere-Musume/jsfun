let chances = 5,
  wordToGuess;
const guessed = [' ', '.', ',', '!', "'", '"', ':', ';', '?', '’'],
  initialLength = guessed.length;

const hangmanContainer = document.querySelector('.hangman-container'),
  msgBox = document.querySelector('.message-box-text');

//gets a random word and starts hangman
getWord();
hangmanContainer.addEventListener('keyup', execHangman);

// Main
function execHangman(event) {
  function hangman(
    guess,
    write = console.log,
    success = console.log,
    fail = console.log
  ) {
    guessed.push(guess.toLowerCase());

    writeGuessedCharacters(guessed);

    let wordToPrint = checker();
    write(wordToPrint);

    // Winner Handler
    if (wordToPrint == wordToGuess) {
      success("Finally Won, Didn't You");
      event.target.removeEventListener('keyup', execHangman);
      return;
    }

    // Decreases chances for every wrong guess
    if (wordToGuess.toLowerCase().indexOf(guess) == -1) chances--;

    document.querySelector('#counter').textContent = 'Chances:   ' + chances;
    // Loser Handler
    if (chances == 0) {
      fail('Better Try Next Time');
      event.target.removeEventListener('keyup', execHangman);
      return;
    }
  }

  // Input Validation
  let guess = event.key.toLowerCase();
  if (guessed.includes(guess) || !inputValidator(guess)) return;
  hangman(guess, writeToDOM, winNotify, loseNotify);
}

//Returns a word with correct guesses else '-'
function checker() {
  let returnWord = '';
  for (let i = 0; i < wordToGuess.length; i++) {
    let letter = wordToGuess[i];
    returnWord += guessed.includes(letter.toLowerCase()) ? letter : '-';
  }
  return returnWord;
}

// Function to write to the browser
function writeToDOM(text) {
  hangmanContainer.firstElementChild.textContent = text;
}

function winNotify(text) {
  msgBox.style.backgroundColor = 'rgb(148, 226, 213)';
  msgBox.textContent = text;
  msgBox.style.left =
    (document.body.clientWidth - msgBox.offsetWidth) / 2 + 'px';
  msgBox.parentNode.style.opacity = 1;
  document.getElementById('correct-answer').textContent =
    'Correct Answer: ' + wordToGuess;
  setTimeout(() => (msgBox.parentNode.style.opacity = 0), 1500);
}

function loseNotify(text) {
  msgBox.style.backgroundColor = 'rgb(203, 166, 247)';
  msgBox.textContent = text;
  msgBox.style.left =
    (document.body.clientWidth - msgBox.offsetWidth) / 2 + 'px';
  msgBox.parentNode.style.opacity = 1;
  document.getElementById('correct-answer').textContent =
    'Correct Answer: ' + wordToGuess;
  setTimeout(() => (msgBox.parentNode.style.opacity = 0), 1500);
}

//Validates the input [Valid inputs: a-zA-Z0-9]
function inputValidator(input) {
  if (input.length != 1) return false;
  let inputCodeValue = input.charCodeAt(0);
  const ranges = [
    ['a'.charCodeAt(0), 'z'.charCodeAt(0)],
    ['A'.charCodeAt(0), 'Z'.charCodeAt(0)],
    ['0'.charCodeAt(0), '9'.charCodeAt(0)],
  ];
  return ranges.some(
    ([to, from]) => inputCodeValue >= to && inputCodeValue <= from
  );
}

// Writes the letters that have been guessed in the browser
function writeGuessedCharacters(array) {
  document.querySelector('#guessed-letters').textContent = String(
    array.slice(initialLength)
  );
}

// Gets a file containing a list of words from the server, chooses a random word and prepares the game.
function getWord(filename = './words.json') {
  const wordList = {
    words: [
      'Never Gonna Give You Up',
      'Empathetic',
      'Zugzwang',
      'axiom',
      'bagpipes',
    ],
  };

  fetch(filename)
    .then(
      (res) => res.json(),
      (res) => {
        console.log(res);
        return wordList;
      }
    )
    .then((data) => {
      let word = data.words[Math.round(Math.random() * data.words.length)];
      wordToGuess = word;
      writeToDOM(checker());
      document.querySelector('#counter').textContent = 'Chances:   ' + chances;
      document.getElementById('correct-answer').textContent =
        'Correct Answer: ' + '#'.repeat(wordToGuess.length);
    });
}

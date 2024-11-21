// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// Get Array From Letters
let lettersArray = Array.from(letters);

// Select Letters Container
let lettersContainer = document.querySelector(".letters");

// Generate Letters
lettersArray.forEach(letter => {
  // Create Span
  let span = document.createElement("span");

  // Create Letter Text Node
  let theLetter = document.createTextNode(letter);

  // Append The Letter To Span
  span.appendChild(theLetter);

  // Add Class On Span
  span.className = 'letter-box';

  // Append Span To The Letters Container
  lettersContainer.appendChild(span);
});

// Object Of Words + Categories
const words = {
  programming: ["php", "javascript", "go", "scala", "fortran", "HTML", "mysql", "python"],
  movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
  people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
}

// Get Random Property
let allKeys = Object.keys(words);
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randomPropValue = words[randomPropName];
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValueValue = randomPropValue[randomValueNumber];

// Set Category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// Select Letters Guess Element
let lettersGuessContainer = document.querySelector(".letters-guess");

// Convert Chosen Word To Array
let lettersAndSpace = Array.from(randomValueValue);

// Create Spans Depened On Word
lettersAndSpace.forEach(letter => {
  // Create Empty Span
  let emptySpan = document.createElement("span");

  // If Letter Is Space
  if (letter === ' ') {
    // Add Class To The Span
    emptySpan.className = 'with-space';
  }

  // Append Span To The Letters Guess Container
  lettersGuessContainer.appendChild(emptySpan);
});

// Select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// Set Wrong Attempts
let wrongAttempts = 0;

// Select The Draw Element
let theDraw = document.querySelector(".hangman-draw");

// Handle Clicking On Letters
document.addEventListener("click", (e) => {
  // Set The Choose Status
  let theStatus = false;

  if (e.target.className === 'letter-box') {
    e.target.classList.add("clicked");

    // Get Clicked Letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();

    // The Chosen Word
    let theChosenWord = Array.from(randomValueValue.toLowerCase());

    theChosenWord.forEach((wordLetter, WordIndex) => {
      // If The Clicked Letter Equal To One Of The Chosen Word Letter
      if (theClickedLetter == wordLetter) {
        // Set Status To Correct
        theStatus = true;

        // Loop On All Guess Spans
        guessSpans.forEach((span, spanIndex) => {
          if (WordIndex === spanIndex) {
            span.innerHTML = theClickedLetter;
          }
        });
      }
    });

    // Outside Loop
    // If Letter Is Wrong
    if (theStatus !== true) {
      // Increase The Wrong Attempts
      wrongAttempts++;

      // Add Class Wrong On The Draw Element
      theDraw.classList.add(`wrong-${wrongAttempts}`);

      // Play Fail Sound
      document.getElementById("fail").play();

      if (wrongAttempts === 8) {
        endGame(false);
        lettersContainer.classList.add("finished");
      }

    } else {
      // Play Success Sound
      document.getElementById("success").play();

      // Check if player has won
      checkWin();
    }
  }
});

// End Game Function
function endGame(won) {
  // Create Popup Div
  let div = document.createElement("div");
  let divText;

  if (won) {
    // Calculate rank based on wrong attempts
    let rank = getRank(wrongAttempts);
    divText = document.createTextNode(`Congratulations! You won with ${wrongAttempts} wrong attempts. Your rank is ${rank}`);
  } else {
    divText = document.createTextNode(`Game Over, The Word Is ${randomValueValue}`);
  }

  // Append Text To Div
  div.appendChild(divText);

  // Add Restart Button
  let restartButton = document.createElement("button");
  restartButton.innerHTML = "Restart Game";
  restartButton.onclick = function() {
    location.reload(); // Restart the game by reloading the page
  };
  div.appendChild(restartButton);

  // Add Class On Div
  div.className = 'popup';

  // Append To The Body
  document.body.appendChild(div);
}

// Check Win Function
function checkWin() {
  let allFilled = true;
  guessSpans = document.querySelectorAll(".letters-guess span");
  
  guessSpans.forEach(span => {
    if (span.innerHTML === '') {
      allFilled = false;
    }
  });

  if (allFilled) {
    endGame(true);
    lettersContainer.classList.add("finished");
  }
}

// Get Rank Function
function getRank(wrongAttempts) {
  if (wrongAttempts <= 2) return "A";
  if (wrongAttempts <= 4) return "B";
  if (wrongAttempts <= 6) return "C";
  return "D";
}

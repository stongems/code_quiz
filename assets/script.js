//create a score sheet
//JSON the score

// All our JS buttons are set declared here
const startBtn = document.querySelector(".start-btn");
const nextBtn = document.querySelector(".next-btn");
const finishBtn = document.querySelector(".finish-btn");
const answerBtnEl = document.getElementById("answer-buttons");
const saveBtn = document.querySelector(".save-btn");
const submitBtn = document.querySelector(".submit-btn");
const restartBtn = document.querySelector(".restart-btn");

// Countdown Timer
const timer = document.querySelector(".timer");
const timeUp = document.querySelector("#time-up");

// Will sets the amount fo time we want for the timer
const QUIZ_LENGTH = 100;
let secondsLeft = QUIZ_LENGTH;
let timerInterval;

// Container declaration
const startScreen = document.querySelector(".start-screen");
const questionPoolEl = document.querySelector(".quiz-screen");
const finishScreenElement = document.querySelector(".finish-screen");
const quiz = document.querySelector("#quiz");

// Question declaration
const questionEl = document.getElementById("question");
let randomQuizQuestion, presentQuizQuestion;
const questionPool = 0;

let htmlScoreContainer = document.getElementById("high-score");
let userScore = "";
let userInitials = "";

//This will un-hide the start screen when the page loads
startScreen.classList.remove("hidden");

// This makes the start button function, it will start the quiz and time
startBtn.addEventListener("click", function (e) {
  startQuiz();
  setTime();
});

//This makes the next button function, it will set the next question and add one to the current question list
nextBtn.addEventListener("click", function () {
  presentQuizQuestion++;
  setNextQuestion();
});

// Here it will launch the finish screen
finishBtn.addEventListener("click", function () {
  finishQuiz();
});

submitBtn.addEventListener("click", function () {
  saveUserInitials();
});
// Timer
function setTime() {
  //Declaries timeInterval to the function
  timerInterval = setInterval(function () {
    //subtracts the time by one
    secondsLeft--;
    //Set to display the time as "Time Remaining 75" and counting
    timer.textContent = `Time Remaining: ${secondsLeft}`;
    //If statement to handle what happens when time runs out
    if (secondsLeft <= 0) {
      secondsLeft = 0;
      clearInterval(timerInterval);
      alert("You have run out of time!");
      finishQuiz();
    }
    //1000 miliseconds = 1 second
  }, 1000);
}

function startQuiz() {
  startScreen.classList.add("hidden");
  //Sorts the questions to be random using math.random
  randomQuizQuestion = questions.sort(() => Math.random() - 0.5);
  presentQuizQuestion = 0;
  questionPoolEl.classList.remove("hidden");
  setNextQuestion();
}

function setNextQuestion() {
  nextQuestion();
  displayQuestion(randomQuizQuestion[presentQuizQuestion]);
}

function displayQuestion(question) {
  questionEl.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerBtnEl.appendChild(button);
  });
}

function nextQuestion() {
  nextBtn.classList.add("hidden");
  //When a firstChild exists then remove the first child (deleting the question)
  while (answerBtnEl.firstChild) {
    answerBtnEl.removeChild(answerBtnEl.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  evaluateAnswer(document.body, correct);
  Array.from(answerBtnEl.children).forEach((button) => {
    evaluateAnswer(button, button.dataset.correct);
  });
  if (randomQuizQuestion.length > presentQuizQuestion + 1) {
    nextBtn.classList.remove("hidden");
  } else {
    finishBtn.classList.remove("hidden");
  }
}
// This will add class="correct" if correct = true & will add class="false" if incorrect, changing the text color for all answers
function evaluateAnswer(element, correct) {
  removeAnswerClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("incorrect");
    secondsLeft -= 1;
  }
}

function removeAnswerClass(element) {
  element.classList.remove("correct");
  element.classList.remove("incorrect");
}

function finishQuiz() {
  clearInterval(timerInterval);
  finishScreenElement.classList.remove("hidden");
  nextBtn.classList.add("hidden");
  questionPoolEl.classList.add("hidden");
  finishBtn.classList.add("hidden");
  saveUserInitials();
  displayHighScore();
}

//Built to save the users initials for scoring purposes
function saveUserInitials() {
  userScore = secondsLeft;
  userInitials = document.getElementById("initials").value;
  if (userInitials !== "") {
    let highScore = JSON.parse(localStorage.getItem("highScores")) || [];
    let myScore = {
      score: secondsLeft,
      userInitials: userInitials,
    };
    highScore.push(myScore);
    localStorage.setItem("highScores", JSON.stringify(highScore));
  }
}

function displayHighScore() {
  let highScores = JSON.parse(localStorage.getItem("highScores"));
  // highScores.sort((a, b) => {
  //   console.log(a.score, b.score);

  //   return a.score > b.score;
  // });

  

  for (let i = 0; i < highScores.length; i++) {
    let score = highScores[i];
    console.log(score)
    let listItem = document.createElement("li");
    listItem.textContent ="Score: " + score.score + " Initials: " + score.userInitials;
    htmlScoreContainer.append(listItem);
 
    
    // document.location.reload();
  }
}

restartBtn.addEventListener("click", () => {

//Function built to get the user back to the begining of the test

  //Listens for the click on the Restart Button
    //Hides the finish screen
    finishScreenElement.classList.add("hidden");
    //Sets the time back to the original 100 seconds
    secondsLeft = QUIZ_LENGTH;
    console.log(secondsLeft)
    //will display the first random quiz question on a new quiz
    startQuiz();
  });


const questions = [
  {
    question: "Which one is not a JavaScript Data type?",
    answers: [
      { text: "String", correct: false },
      { text: "Boolean", correct: false },
      { text: "Undefined", correct: false },
      { text: "Data", correct: true },
    ],
  },
  {
    question: "Which symbol is used for multi-line comments in Javascript?",
    answers: [
      { text: "//", correct: false },
      { text: "<!--", correct: false },
      { text: "/*/", correct: true },
      { text: "#", correct: false },
    ],
  },
  {
    question: "Which one is not a pop up box available in JavaScript?",
    answers: [
      { text: "Note", correct: true },
      { text: "Alert", correct: false },
      { text: "Confirm", correct: false },
      { text: "Prompt", correct: false },
    ],
  },
  {
    question:
      "Which of these is not a boolean operator in (without parenthesis) JavaScript?",
    answers: [
      { text: "&&", correct: false },
      { text: "@@", correct: true },
      { text: "||", correct: false },
      { text: "!", correct: false },
    ],
  },
  {
    question: "Which one of these is not an error shown in JavaScript?",
    answers: [
      { text: "Name Error", correct: true },
      { text: "Load-Time Errors", correct: false },
      { text: "Run-Time Errors", correct: false },
      { text: "Logic Errors", correct: false },
    ],
  },
  {
    question: "How can generic objects be created?",
    answers: [
      { text: "if { newObject then createNew }", correct: false },
      { text: "newObject === var i", correct: false },
      { text: "var i = new object();", correct: false },
      { text: "var = 'new-object';", correct: true },
    ],
  },
  {
    question:
      "Can you name one programming paradigms important for JavaScript app developers?",
    answers: [
      { text: "jsParadigms", correct: false },
      { text: "Prototypal Inheritance", correct: true },
      { text: "Interpreter Prompt", correct: false },
      { text: "Functional Analyzing", correct: false },
    ],
  },
];

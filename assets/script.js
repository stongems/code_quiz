// All our JS buttons are set declared here 
const startBtn = document.querySelector(".start-btn");
const nextButton = document.querySelector(".next-btn");
const finishButton = document.querySelector(".finish-btn");
const answerButtonsElement = document.getElementById("answer-buttons");

// Countdown Timer
const timer = document.querySelector(".timer");
const timeUp = document.querySelector("#time-up");

// Will sets the amount fo time we want for the timer
let secondsLeft = 50;

// Container declaration
const startScreen = document.querySelector(".start-screen");
const questionContainerElement = document.querySelector(".quiz-screen");
const finishScreenElement = document.querySelector(".finish-screen");
const quiz = document.querySelector("#quiz");


// Question declaration
const questionElement = document.getElementById("question");
let shuffledQuestions, currentQuestionIndex;
const questionPool = 0;

//This will un-hide the start screen when the page loads
startScreen.classList.remove("hidden")

// This makes the start button function, it will start the quiz and time
startBtn.addEventListener("click", function (e) {
  startQuiz();
  setTime();
});

//This makes the next button function, it will set the next question and add one to the current question list
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

// Here it will launch the finish screen
finishButton.addEventListener("click", () => {
  finishQuiz();
});

// This is the timer in the top right corner
function setTime() {
  const timerInterval = setInterval(function () {
    secondsLeft--;
    timer.textContent = `Time Remaining: ${secondsLeft}`;
    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      alert("You have run out of time!");
      finishQuiz();
    }
  }, 1000);
}

function startQuiz() {
  startScreen.classList.add("hidden");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hidden");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add("hidden");
  
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  addAnswerClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    addAnswerClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hidden");
  } else {
    finishButton.classList.remove("hidden");
  }
}
// This will add class="correct" if correct = true & will add class="false" if incorrect, changing the text color for all answers
function addAnswerClass(element, correct) {
  removeAnswerClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("incorrect");
  }
}

function removeAnswerClass(element) {
  element.classList.remove("correct");
  element.classList.remove("incorrect");
}

function finishQuiz() {
    finishScreenElement.classList.remove("hidden");
    nextButton.classList.add("hidden");
    questionContainerElement.classList.add("hidden");
    finishButton.classList.add("hidden");
    
}

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

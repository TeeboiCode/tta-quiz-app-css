const preload = document.querySelector(".preload");
const startBtn = document.querySelector("#btn_start");
const quizRulesCard = document.querySelector("#quiz_rules");
const continueBtn = document.querySelector("#continueBtn");
const countdownContainer = document.querySelector(".count-down-container ");
const exitBtn = document.querySelector("#exitBtn");
let quizCard = document.querySelector("#quiz_card");
let countdownText = document.getElementById("countdownText");
let countdownNum = document.getElementById("countdownNum");
let countdownTime = document.querySelector(".tym");
let questions = document.querySelector("#question");
let optionAnswerBtn = document.querySelector("#answer-option");
let complete = document.querySelector("#complete");
let correctScore = document.querySelector(".correct-score");
let totalQuestion = document.querySelector(".total-question");
let totalQuestion2 = document.querySelector(".total-question2");
let nextQuestion = document.querySelector(".next-question");
let replayBtn = document.querySelector(".replay-btn");
let quitBtn = document.querySelector(".quit-btn");
let questionNextNum = document.querySelector(".questionNextNum");
let percentageScore = document.querySelector(".percentage-score");
let percentageContainer = document.querySelector("#percentage");
const playerForm = document.getElementById("playerForm");
const playerNameInput = document.getElementById("playerName");
const nameContainer = document.querySelector("#nameContainer");
let playerName = "";

// form
let userForm = document.querySelector("#userForm");
let firstName = document.querySelector("#firstNameInput");
let lastName = document.querySelector("#lastNameInput");
let isEventDisabled;

// setting setTimeout for preloading
stopLoad();
function stopLoad() {
  window.addEventListener("load", () => {
    setTimeout(() => {
      preload.classList.add("hidden");
      nameContainer.classList.remove("hidden");
      // startBtn.classList.remove("hidden");
    }, 2000);
  });
}

playerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  playerName = playerNameInput.value.trim();

  if (playerName === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please enter your name!",
    });
    return;
  }

  nameContainer.classList.add("hidden");
  startBtn.classList.remove("hidden");
  // document.querySelector(".btn-start").classList.remove("hidden");

  Swal.fire({
    icon: "success",
    title: `Welcome ${playerName}!`,
    text: "Click Start Quiz when you're ready to begin.",
    confirmButtonText: "OK",
  });
});

// Modify your existing window.addEventListener('load') function
// window.addEventListener("load", () => {
//   setTimeout(() => {
//     preload.classList.add("hidden");
//     nameContainer.classList.remove("hidden"); // Show name form instead of start button
//   }, 2000);
// });

function saveQuizResult(score) {
  // Get existing results or initialize empty array
  let results = JSON.parse(localStorage.getItem("quizResults")) || [];

  // Create new result object
  const newResult = {
    name: playerName, // You'll need to collect this from the user
    score: correctPicked,
    total: quizQuestions.length,
    percentage: ((correctPicked / quizQuestions.length) * 100).toFixed(1),
    date: new Date().toLocaleDateString(),
  };

  // Add new result to array
  results.push(newResult);

  // Sort by score (highest first)
  results.sort((a, b) => b.percentage - a.percentage);

  // Store in localStorage
  localStorage.setItem("quizResults", JSON.stringify(results));

  // Redirect to results page
  window.location.href = "results.html";
}

// adding Event Listener to start btn
startBtn.addEventListener("click", () => {
  startBtn.classList.add("hidden");
  preload.style.display = "flex";
  setTimeout(() => {
    preload.classList.add("hidden");
    quizRulesCard.classList.remove("hidden");
  }, 2000);
});

// Start Quiz

continueBtn.addEventListener("click", continueGo);

function continueGo() {
  countdownContainer.classList.remove("hidden");
  quizRulesCard.classList.add("hidden");

  let countdown = 3;
  countdownText.textContent = "Get ready... The game starts in ";
  countdownNum.textContent = "3";

  const interval = setInterval(() => {
    if (countdown > 1) {
      countdown--;
      countdownText.textContent = `Get ready... The game starts in `;
      countdownNum.textContent = countdown;
    } else {
      clearInterval(interval);
      countdownText.textContent = "Go!";
      countdownNum.classList.add("hidden");
      countdownContainer.classList.add("hidden");
      quizCard.classList.remove("hidden");
      startCountDown();
      //   const goInterval = setInterval(() => {

      //   }, 500);
    }
  }, 1000);
}

// Exit Button
exitBtn.addEventListener("click", function () {
  Swal.fire({
    title: "Are you sure you want to exit?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#0a69ed",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      // window.close();
      preload.style.display = "flex";
      quizRulesCard.classList.add("hidden");
      window.setTimeout(() => {
        preload.style.display = "none";
        startBtn.classList.remove("hidden");
      }, 1000);
    }
  });
});

// Next question counting down
let isClicked = false;
function startCountDown() {
  countingDown = 30;

  countdownTime.innerHTML = countingDown;

  let countingDownInterval = setInterval(() => {
    countingDown--;
    // console.log(countingDown);

    countdownTime.innerHTML = countingDown;
    if (countingDown === 0) {
      // isClicked = false;
      clearInterval(countingDownInterval);
      load();
      // next();
      return;
    } else if (isClicked) {
      isClicked = false;
      clearInterval(countingDownInterval);
      next();
      return;
    }
  }, 1000);
}

// =============================
//Questions and Options array
// =============================

// const quizQuestions = [
//   {
//     id: 1,
//     question: "What is the result of the following expression: \n\n 5 + 3 * 2?",
//     options: ["16", "11", "10", "13"],
//     correct: "11",
//   },
//   {
//     id: 2,
//     question: "What is the result of: \n\n (6 + 2) * (4 / 2)?",
//     options: ["12", "16", "8", "20"],
//     correct: "16",
//   },
//   {
//     id: 3,
//     question: "Solve the expression: \n\n 10 - 4 + 3 * 5",
//     options: ["21", "16", "25", "31"],
//     correct: "21",
//   },
//   {
//     id: 4,
//     question: "Evaluate the expression: \n\n 2 ** 3 + 4 * 2",
//     options: ["16", "20", "18", "14"],
//     correct: "16",
//   },
// ];

const quizQuestions = [
  // Basic CSS Questions
  {
    id: 1,
    question: "What does CSS stand for?",
    options: [
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Colorful Style Sheets",
      "Computer Style Sheets",
    ],
    correct: "Cascading Style Sheets",
  },
  {
    id: 2,
    question: "Which property is used to change the text color in CSS?",
    options: ["color", "text-color", "font-color", "foreground-color"],
    correct: "color",
  },
  {
    id: 3,
    question: "How do you add an external CSS file to an HTML document?",
    options: [
      "<link rel='stylesheet' href='styles.css'>",
      "<style src='styles.css'>",
      "<stylesheet href='styles.css'>",
      "<css-link href='styles.css'>",
    ],
    correct: "<link rel='stylesheet' href='styles.css'>",
  },
  {
    id: 4,
    question:
      "Which property is used to set the background color of an element?",
    options: ["background", "bg-color", "background-color", "color"],
    correct: "background-color",
  },
  {
    id: 5,
    question: "What is the default value of the `position` property in CSS?",
    options: ["static", "absolute", "relative", "fixed"],
    correct: "static",
  },
  {
    id: 6,
    question: "Which property controls the font size of an element?",
    options: ["font-size", "font-style", "text-size", "font-weight"],
    correct: "font-size",
  },
  {
    id: 7,
    question: "How do you select an element with the ID `header` in CSS?",
    options: ["#header", ".header", "header", "id=header"],
    correct: "#header",
  },
  {
    id: 8,
    question:
      "Which property is used to create space inside an element's border?",
    options: ["padding", "margin", "spacing", "border-spacing"],
    correct: "padding",
  },
  {
    id: 9,
    question:
      "Which property is used to create space outside an element's border?",
    options: ["margin", "padding", "gap", "border-spacing"],
    correct: "margin",
  },
  {
    id: 10,
    question: "What is the correct syntax for a CSS comment?",
    options: [
      "// This is a comment",
      "<!-- This is a comment -->",
      "/* This is a comment */",
      "### This is a comment ###",
    ],
    correct: "/* This is a comment */",
  },
  {
    id: 11,
    question: "Which property is used to make text italic in CSS?",
    options: ["font-style", "font-variant", "text-style", "font-weight"],
    correct: "font-style",
  },
  {
    id: 12,
    question: "What is the correct order of the box model in CSS?",
    options: [
      "Content > Padding > Border > Margin",
      "Content > Margin > Border > Padding",
      "Padding > Content > Border > Margin",
      "Margin > Border > Padding > Content",
    ],
    correct: "Content > Padding > Border > Margin",
  },
  {
    id: 13,
    question: "Which property is used to set the underline of text?",
    options: ["text-decoration", "font-style", "underline", "text-transform"],
    correct: "text-decoration",
  },
  {
    id: 14,
    question: "Which CSS property is used to make text bold?",
    options: ["font-weight", "font-style", "text-weight", "bold"],
    correct: "font-weight",
  },
  {
    id: 15,
    question:
      "Which CSS unit is relative to the font-size of the root element?",
    options: ["em", "rem", "px", "pt"],
    correct: "rem",
  },
  {
    id: 16,
    question: "Which property is used to set the space between lines of text?",
    options: ["letter-spacing", "line-height", "text-spacing", "text-indent"],
    correct: "line-height",
  },
  {
    id: 17,
    question: "How do you apply a class called 'main' in CSS?",
    options: [".main", "#main", "main", "@main"],
    correct: ".main",
  },
  {
    id: 18,
    question: "Which CSS property is used to align text horizontally?",
    options: [
      "text-align",
      "text-style",
      "horizontal-align",
      "justify-content",
    ],
    correct: "text-align",
  },
  {
    id: 19,
    question:
      "Which pseudo-class is used to target an element when hovered over?",
    options: [":hover", ":focus", ":target", ":active"],
    correct: ":hover",
  },
  {
    id: 20,
    question: "Which property is used to specify the width of a border?",
    options: [
      "border-width",
      "border-size",
      "border-thickness",
      "border-height",
    ],
    correct: "border-width",
  },

  // Advanced CSS Questions
  {
    id: 21,
    question: "What does the `@keyframes` rule do in CSS?",
    options: [
      "Defines an animation",
      "Applies animations to elements",
      "Controls transition timing",
      "Sets media queries",
    ],
    correct: "Defines an animation",
  },
  {
    id: 22,
    question: "Which CSS property is used to create a flexible layout?",
    options: ["display: flex", "position: relative", "float", "align-items"],
    correct: "display: flex",
  },
  {
    id: 23,
    question: "What is the purpose of the `z-index` property in CSS?",
    options: [
      "Controls stacking order of elements",
      "Adjusts element size",
      "Applies 3D transformations",
      "Sets opacity",
    ],
    correct: "Controls stacking order of elements",
  },
  {
    id: 24,
    question: "What is the `grid-template-columns` property used for?",
    options: [
      "Defines the structure of columns in a grid layout",
      "Aligns grid items vertically",
      "Controls the gap between grid items",
      "Specifies column text alignment",
    ],
    correct: "Defines the structure of columns in a grid layout",
  },
  {
    id: 25,
    question:
      "Which property is used to apply 3D transformations to an element?",
    options: ["transform", "perspective", "translate3d", "rotate3d"],
    correct: "transform",
  },
  {
    id: 26,
    question: "What does the `clip-path` property do?",
    options: [
      "Clips an element to a specified shape",
      "Aligns an element",
      "Changes background size",
      "Sets text overflow",
    ],
    correct: "Clips an element to a specified shape",
  },
  {
    id: 27,
    question: "What is the default value of `flex-direction` in CSS flexbox?",
    options: ["row", "column", "row-reverse", "column-reverse"],
    correct: "row",
  },
  {
    id: 28,
    question: "Which property is used to apply a gradient background in CSS?",
    options: [
      "background-gradient",
      "background",
      "gradient",
      "linear-gradient",
    ],
    correct: "background",
  },
  {
    id: 29,
    question: "Which property is used to control the speed of a transition?",
    options: [
      "transition-duration",
      "transition-speed",
      "animation-duration",
      "speed",
    ],
    correct: "transition-duration",
  },
  {
    id: 30,
    question:
      "Which value of `position` property is used to fix an element to the viewport?",
    options: ["fixed", "absolute", "relative", "sticky"],
    correct: "fixed",
  },
  {
    id: 31,
    question: "What does the `overflow` property do?",
    options: [
      "Controls content overflow of an element",
      "Adjusts font size",
      "Sets line spacing",
      "Changes stacking order",
    ],
    correct: "Controls content overflow of an element",
  },
  {
    id: 32,
    question: "What is the purpose of `justify-content` in flexbox?",
    options: [
      "Aligns items along the main axis",
      "Aligns items along the cross axis",
      "Defines the space between lines",
      "Defines column structure",
    ],
    correct: "Aligns items along the main axis",
  },
  {
    id: 33,
    question: "Which property is used to create animations in CSS?",
    options: ["animation", "transition", "transform", "hover"],
    correct: "animation",
  },
  {
    id: 34,
    question: "Which value of `display` creates a grid container?",
    options: ["grid", "flex", "block", "inline-grid"],
    correct: "grid",
  },
  {
    id: 35,
    question: "What does the `align-items` property do in flexbox?",
    options: [
      "Aligns items along the cross axis",
      "Aligns items along the main axis",
      "Sets column gaps",
      "Creates flexible layouts",
    ],
    correct: "Aligns items along the cross axis",
  },
  {
    id: 36,
    question: "What is a `media query` used for in CSS?",
    options: [
      "To apply styles based on screen size",
      "To define animations",
      "To apply hover effects",
      "To control text flow",
    ],
    correct: "To apply styles based on screen size",
  },
  {
    id: 37,
    question: "Which property specifies the timing function of a transition?",
    options: [
      "transition-timing-function",
      "animation-timing",
      "timing-speed",
      "transition-speed",
    ],
    correct: "transition-timing-function",
  },
  {
    id: 38,
    question: "What does the `content` property do in pseudo-elements?",
    options: [
      "Adds content to an element",
      "Controls element size",
      "Sets margin",
      "Changes stacking order",
    ],
    correct: "Adds content to an element",
  },
  {
    id: 39,
    question: "What does the `filter` property do in CSS?",
    options: [
      "Applies visual effects to elements",
      "Adjusts layout flow",
      "Controls column size",
      "Sets grid areas",
    ],
    correct: "Applies visual effects to elements",
  },
  {
    id: 40,
    question: "What does the `pointer-events` property do?",
    options: [
      "Specifies if an element can receive pointer events",
      "Controls hover effects",
      "Adjusts alignment",
      "Sets animation speed",
    ],
    correct: "Specifies if an element can receive pointer events",
  },
];

let remainingQuestion = [...quizQuestions];
// console.log(remainingQuestion);

let wrongPicked = 0;
let correctPicked = 0;
let askedQuestionIndex = [];
totalQuestion2.textContent = quizQuestions.length;

function getRandomNumber() {
  let randomIndex;

  do {
    randomIndex = Math.floor(Math.random() * remainingQuestion.length);
  } while (askedQuestionIndex.includes(randomIndex));
  askedQuestionIndex.push(randomIndex);

  return randomIndex;
}

displayQuestion();
function displayQuestion() {
  if (askedQuestionIndex.length === remainingQuestion.length) {
    quizCard.classList.add("hidden");
    preload.style.display = "flex";
    setTimeout(() => {
      preload.classList.add("hidden");
      complete.classList.remove("hidden");
    }, 3000);

    // Calculate scores
    const correctPercentage = (
      (correctPicked / remainingQuestion.length) *
      100
    ).toFixed(1);
    correctScore.textContent = correctPicked;
    totalQuestion.textContent = quizQuestions.length;
    percentageScore.textContent = correctPercentage;

    if (correctPercentage >= 80) {
      percentageContainer.style.color = "green";
    } else if (correctPercentage >= 60) {
      percentageContainer.style.color = "#ffb200";
    } else {
      percentageContainer.style.color = "red";
    }

    console.log("Complete!" + correctPercentage);
    console.log("Wrong Answers: " + wrongPicked);
    console.log("Correct Answers: " + correctPicked);

    // Save results
    saveQuizResult();

    return;
  }

  let randomOptionIndex = [0, 1, 2, 3];
  randomOptionIndex.sort(() => Math.random() - 0.5);
  randomOptionIndex.forEach((num) => {
    num;
  });

  const currentQuestionIndex = getRandomNumber();
  const currentQuestion = remainingQuestion[currentQuestionIndex];
  questions.textContent = currentQuestion.question;
  optionAnswerBtn.innerHTML = "";

  currentQuestion.options.forEach((option, i) => {
    const button = document.createElement("p");
    button.textContent = option;
    button.classList.add("answer-option");
    optionAnswerBtn.appendChild(button);
    button.textContent = currentQuestion.options[randomOptionIndex[i]];

    isEventDisabled = true;

    button.addEventListener("click", () => {
      if (isEventDisabled) {
        if (button.textContent === currentQuestion.correct) {
          correctAns();
          correctPicked++;
        } else {
          correctAns();
          wrongPicked++;
          button.classList.add("wrong");
        }
        isEventDisabled = false;
      }
    });
  });

  let optionAnswerBtnNew = document.querySelectorAll(".answer-option");
  // ====================
  // Correct Function
  // ====================
  function correctAns() {
    optionAnswerBtnNew.forEach((btn) => {
      if (btn.textContent === currentQuestion.correct) {
        btn.classList.add("success");
      }
    });
    isClicked = true;
  }

  questionNextNum.textContent = `${askedQuestionIndex.length}. `;
  nextQuestion.textContent = askedQuestionIndex.length;
  console.log(askedQuestionIndex);
}

function next() {
  nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
  load();
});

function load() {
  displayQuestion();
  startCountDown();
  nextBtn.classList.add("hidden");
}

replayBtn.addEventListener("click", () => {
  // complete.classList.add("hidden");
  window.location.reload();
});

// Quit Button
quitBtn.addEventListener("click", function () {
  Swal.fire({
    title: "Are you sure you want to quit the game?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#0a69ed",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "../index.html";
    }
  });
});

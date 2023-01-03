//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [{
        id: "0",
        question: "Which of the below is the abbreviation of CSS ?",
        options: ["Cascade sheets style", "Color and style sheets", "Cascading style sheets", "Coded Style Sheet"],
        correct: "Cascading style sheets",
    },
    {
        id: "1",
        question: "Which of the below CSS class is used to change the text color of CSS ?",
        options: ["background-color", "color", "color-background", "text-color"],
        correct: "color",
    },
    {
        id: "2",
        question: "Which below property of CSS is used to set the indentation of the first line in a block of text ?",
        options: ["text-indent property", "text-underline-property", "text-decoration", "text-overflow property"],
        correct: "text-indent property",
    },
    {
        id: "3",
        question: "Which of the below CSS properties represent the order of flex items in the grid container ?",
        options: ["float", "overflow", "order", "All of the above"],
        correct: "order",
    },
    {
        id: "4",
        question: "How do we set the default width of the font in CSS ?",
        options: ["font-stretch", "font-weight", "text-transform", "font-variant"],
        correct: "font-stretch",
    },
    {
        id: "5",
        question: "Which element is used to represent the transparency of an element in CSS ?",
        options: ["Hover", "Opacity", "Transparent", "Overlay"],
        correct: "Opacity",
    },
    {
        id: "6",
        question: "Which of the below CSS property is used to add a stroke in the text ?",
        options: ["text-stroke", "text-transform", "text-decoration", "None of the above"],
        correct: "text-stroke",
    },
    {
        id: "7",
        question: "Which below CSS property best describes how an image or video fits into a container?",
        options: ["object-move", "position-hide", "object-fit", "All of the above"],
        correct: "object-fit",
    },
    {
        id: "8",
        question: "Which of the below the property is used to overflow the text in CSS?",
        options: ["text-shadow", "text-stroke", "text-overflow", "text-decoration"],
        correct: "text-overflow",
    },
    {
        id: "9",
        question: "Which property in CSS is responsible for setting the difference between two lines?",
        options: ["min-height property", "max-height property", "line-height property", "None of the above"],
        correct: "line-height property",
    },
];

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
    <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
    <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
    <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};
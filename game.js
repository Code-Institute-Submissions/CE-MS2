const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = []

let questions = [
    {
        question: "What is 2 + 2?",
        choice1: "2",
        choice2: "4",
        choice3: "21",
        choice4: "hello",
        answer: "4",
    },

    {
        question: "Where were the first computer animations produced?",
        choice1: "Computer Laboratory, Germany",
        choice2: "Russia",
        choice3: "Rutherford Appleton Laboratory",
        choice4: "hello",
        answer: "Rutherford Appleton Laboratory",
    },

    {
        question: "What year did the Titanic sink in the Atlantic Ocean?",
        choice1: "1912",
        choice2: "1915",
        choice3: "1932",
        choice4: "1908",
        answer: "1912",
    },

    {
        question: "What is the lifespan of a dragonfly?",
        choice1: "24 hours",
        choice2: "64 hours",
        choice3: "1 week",
        choice4: "5 days",
        answer: "24 hours",
    },

    {
        question: "What is the name of the biggest technology company in South Korea?",
        choice1: "Mobile Asia",
        choice2: "Huawei",
        choice3: "Oppo",
        choice4: "Samsung",
        answer: "Samsung",
    },
]

// Constants

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    questionCounter++
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

        choices.forEach(choice => {
            const number = choice.dataset["number"];
            choice.innerText = currentQuestion["choice" + number];
        });

        availableQuestions.splice(questionIndex, 1);

        acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        console.log(selectedAnswer);
        getNewQuestion();
    });
});

startGame();

    
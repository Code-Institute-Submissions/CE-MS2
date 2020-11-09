//Declaring constants

const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');

//Defining Variables

let currentQuestion = {};
let acceptingAnswers = false; //true
let score = 0;
let questionCounter = 0;
let availableQuestions = []

let questions = [];

// Fetch function for questions from Open Trivia Database & Pulling API url

fetch(
    "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple"
)
    .then(res => {
        return res.json();
    })
    .then(loadedQuestions => {
        console.log(loadedQuestions.results);
        questions = loadedQuestions.results.map(loadedQuestion => {
            const formattedQuestion = {
                question: loadedQuestion.question,
            };

            //Iterate through answer choices

            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
            answerChoices.splice(
                formattedQuestion.answer - 1,
                 0,
                loadedQuestion.correct_answer
                );

                answerChoices.forEach((choice, index) => {
                    formattedQuestion["choice" + (index + 1)] = choice;
                });

                return formattedQuestion;
        });
        
        //Start Game function
        startGame();
    })

    .catch(err => {
        console.error(err);
    });



// Constants
const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');

}

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //Save score after ending game
        localStorage.setItem("mostRecentScore", score);
        //Go to end page
        return window.location.assign("/end.html");
    }
    questionCounter++;
    
    //Declare Progress Bar %
    progressText.innerText = `Question: ${questionCounter}/${MAX_QUESTIONS}`;
    
    //Updates Progress Bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

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

//Click event function for selecting displayed answers
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        
        //Ternary operator to display whether selected answer is true/false
        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        

        //Increment score by 100 if answer is correct
        if(classToApply == 'correct') {
            incrementScore(SCORE_POINTS);
        }

        //Displays whether selected answer is correct by green/red styling on answer click
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 800);
    });
});

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
};




    
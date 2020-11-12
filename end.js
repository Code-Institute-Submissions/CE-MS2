//Declaring Constants
const username = document.getElementById("username");
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 500;

finalScore.innerText = mostRecentScore;



username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value;
});

//Saves score when save button is clicked
saveHighScore = e => {
    console.log("clicked the save button!");
    e.preventDefault();

    const score = {

    //Sorts scores in order
        score: mostRecentScore,
        name: username.value
    };
    highScores.push(score);
    highScores.sort( (a,b) => b.score - a.score)
    highScores.splice(5);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign('/highscores.html') //Stores highscores in highscore.html page

};
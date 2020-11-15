//Constants
const highScoresList = document.getElementById('highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

//Returns High Scores String in HTML

highScoresList.innerHTML = highScores
  .map(score => { //Takes incoming score array and converts it to a high score list class 
      return `<li class="high-score">${score.name} - ${score.score}</li>`;
  })
.join(""); //Joins scores with an empty string
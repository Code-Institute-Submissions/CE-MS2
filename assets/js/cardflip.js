class FlipnMatch {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining');
        this.ticker = document.getElementById('flips');
    }
    startGame(){
        this.cardToCheck = null;
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.matchedCards = [];
        this.busy = true;

        setTimeout(() => {
            this.shuffleCards();
            this.countdown = this.startCountdown();
            this.busy = false;
        }, 500);
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
    }
    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('matched');
        });
    }
    startCountdown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if(this.timeRemaining === 0)
            this.gameOver(); //If timer runs out, the game ends
        }, 1000);
    }
    gameOver() {
        clearInterval(this.countdown); //Stops timer and resets timer when game ends
        document.getElementById('game-over-text').classList.add('visible');
    }

    victory() {
        clearInterval(this.countdown); //Stops timer and resets timer when game ends
        document.getElementById('victory-text').classList.add('visible');
    }

    flipCard(card) {
        if(this.canFlipCard(card)) {
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('visible');

            if(this.cardToCheck)
                this.checkForCardMatch(card);
            else
            this.cardToCheck = card;
        }
    }
    
    checkForCardMatch(card) {
        if(this.getCardType(card) === this.getCardType(this.cardToCheck))
            this.cardMatch(card, this.cardToCheck);
        else
            this.cardMisMatch(card, this.cardToCheck);

        this.cardToCheck = null;
    }
    //If card selected src matches, add matched class
    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');

        if(this.matchedCards.length === this.cardsArray.length)
        this.victory();
    }
    //If cards selected src doesn't match, removes visible class (flips cards back facedown)
    cardMisMatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        }, 900);
    }


    getCardType(card) {
        return card.getElementsByClassName('card-value')[0].src;
    }

    //Card Shuffle Function
    shuffleCards(cardsArray) {
        for (let i = this.cardsArray.length - 1; i > 0; i--) { //Fisher & Yates shuffle for loop method
             let randInt = Math.floor(Math.random() * (i + 1));
             this.cardsArray[randInt].style.order = i;
             this.cardsArray[i].style.order = randInt;
        }
    }

    canFlipCard(card) {
        //Creates Boolean
    return (!this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck);
    }
}


function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new FlipnMatch(100, cards);

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible'); //Removes visible class from overlay on click
            game.startGame();
        });
    });
    cards.forEach(card => {
        card.addEventListener('click', () =>{
            game.flipCard(card);
        })
    })
}

//Checks if cardflip page is loaded
if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}
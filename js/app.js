
/* Create a list that holds all of your cards- one Array*/
const allIconsArray = ['fa fa-diamond', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-bolt', 'fa fa-cube', 'fa fa-cube', 'fa fa-leaf', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-bomb'];
/* create cards container*/
const allCardscontainer = document.querySelector('.deck');
/* create an empty array to save & compare the opened card array*/
let openedCards = [];
let matchedCards = [];
// use for loop to create cards//
function startGame() {
    for (let i = 0; i < allIconsArray.length; i++) {
        const card = document.createElement("div");
        card.classList.add('card'); /* classes to the element*/
        //add the <i>content(note:use innerHTML)<i> with icons //
        card.innerHTML = `<i class='${allIconsArray[i]}'></i>`;
        allCardscontainer.appendChild(card);
        // add click event for each card//
        click(card);
    }
}
//add event handeler//
function click(card) {
    card.addEventListener('click', function () {
        const currCard = card;
        const preCard = openedCards[0];
        if (openedCards.length === 1) {
            card.classList.add('open', 'show', 'disable'); /*from app.css*/
            openedCards.push(card);
            //if cards are matched
            compare(currCard, preCard); // compare every 2 cards
        } else {
            currCard.classList.add('open', 'show', 'disable');
            openedCards.push(card);
        }
    });
}
//compare cards function( between 2 cards)
function compare(currCard, preCard) {
    if (currCard.innerHTML === preCard.innerHTML) {
        currCard.classList.add('match'); /* call from app.css  */
        preCard.classList.add('match');
        matchedCards.push(currCard, preCard);
        openedCards = []; //to open the card without refreshing the page to select card every time (rest)//
        //check if the game is over
        Congratulation();
    } else { //if cards are  not matched
        setTimeout(function () {
            currCard.classList.remove('open', 'show', 'disable');
            preCard.classList.remove('open', 'show', 'disable');
            newMove(); // add the created moves functiov
        }, 500);
        openedCards = []; //reset//
    }
}
// create a function to check if the no. of matched cards == allIconsArray length or not*/
function Congratulation() {
    if (matchedCards.length === allIconsArray.length) {
        $('#exampleModal').modal('show')
    }
}
//* starting the game for 1st time
startGame();
const movesContainer = document.querySelector('.moves'); //create container
let moves = 0;
movesContainer.innerHTML = 0;

function newMove() { // create moves function 
    moves++;
    movesContainer.innerHTML = moves;
    starsRank();
}
//* ranking
const starsContainer = document.querySelector('.stars');
starsContainer.innerHTML = `<li><i class="fa fa-star"></i> </li><li><i class="fa fa-star"></i> </li> </li><li><i class="fa fa-star"></i> </li>`

function starsRank() {
    if (moves <= 3) {
        starsContainer.innerHTML = `<li><i class="fa fa-star"></i> </li><li><i class="fa fa-star"></i> </li> <li><i class="fa fa-star">`;
    } else if (6 > moves) {
        starsContainer.innerHTML = `<li><i class="fa fa-star"></i> </li> <li><i class="fa fa-star"></i> </li>`;
    } else {
        starsContainer.innerHTML = `<li><i class="fa fa-star"></i> </li>`;
    }
}
//restart the game button//
const restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', function () {
    // remove cards
    allCardscontainer.innerHTML = '';
    //new cards
    startGame();
    // reset matched cards
    matchedCards = [];
    moves = 0;
    movesContainer.innerHTML = moves; //update container when click restart button
    starsContainer.innerHTML = `<li><i class="fa fa-star"></i> </li><li><i class="fa fa-star"></i> </li> </li><li><i class="fa fa-star"></i> </li>`
});

//playAgain button
function playAgain() {
    location.reload();
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

//create array for the cards
var allIconArray = ["fa-leaf", "fa-leaf", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor", "fa-bomb", "fa-bomb", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-diamond", "fa-diamond", "fa-bicycle", "fa-bicycle",];
//used variables declaration
var open = [];
var matched = 0;
var moveCounter = 0;
var threeStars = 3;
var timer = {
    seconds: 0,
    minutes: 0,
    clearTime: -1
};
// setting the moves 
var remove1stStar = 5;
var remove2ndStar = 10;
var modal = $("#winning-modal");
//timer will start counting  when clicking 1st card
var startCountTimer = function () {
    if (timer.seconds === 59) {
        timer.minutes++;
        timer.seconds = 0;
    } else {
        timer.seconds++;
    }
    var sec = "0";
    if (timer.seconds < 10) {
        sec += timer.seconds;
    } else {
        sec = String(timer.seconds);
    }
    var time = String(timer.minutes) + ":" + sec;
    $(".timer").text(time);
};
//Restart the time again when click the game ressting button
function clearT() {
    clearInterval(timer.clearTime);
    timer.seconds = 0;
    timer.minutes = 0;
    $(".timer").text("0:00");
    timer.clearTime = setInterval(startCountTimer, 1000);
}
// shuffling
function cardShuffling() {
    allIconArray = shuffle(allIconArray);
    var index = 0;
    $.each($(".card i"), function () {
        $(this).attr("class", "fa " + allIconArray[index]);
        index++;
    });
}
$(cardShuffling);
// congratulation
function congratulation() {
    modal.css("display", "block");
}
/*The last() method returns the last element of the selected elements- how to erase/reset the star when reached the specified no. or playagain)*/
function starErase() { //erase
    $(".fa-star").last().attr("class", "fa fa-star-o");
    threeStars--;
    $(".num-stars").text(String(threeStars));
}

function resetFunction() { //sstart resetting 
    $(".fa-star-o").attr("class", "fa fa-star");
    threeStars = 3;
    $(".num-stars").text(String(threeStars));
}
// if moves = 5 remove 1st star ,if moves = 10 move 2nd star.
function removeOneStar() {
    $(".moves").text(moveCounter);
    if (moveCounter === remove1stStar || moveCounter === remove2ndStar) {
        starErase();
    }
}
/* matching the cards*/
//check card status by using The hasClass() method checks if any of the selected elements have a specified class name.
function newCard(card) {
    return !(card.hasClass("open") || card.hasClass("match"));
}

function check() {
    if (open[0].children().attr("class") === open[1].children().attr("class")) {
        return true;
    } else {
        return false;
    }
}

function matchedCards() { // check if the cards are matched, should be equel to the cards number in the array 16
    if (matched === 16) {
        return true;
    } else {
        return false;
    }
}
// congratulation();
var matchingSet = function () {
    open.forEach(function (card) {
        card.addClass("match");
    });
    open = [];
    matched += 2;
    if (matchedCards()) {
        clearInterval(timer.clearTime);
        congratulation();
    }
};
// Sets currently open cards back to default state .>>
var resetOpen = function () {
    open.forEach(function (card) {
        card.toggleClass("open");
        card.toggleClass("show");
    });
    open = [];
};
// Sets selected card to the open and shown state >>
function openCard(card) {
    if (!card.hasClass("open")) {
        card.addClass("open");
        card.addClass("show");
        open.push(card);
    }
}
//starting the game again by reset it.
var gameResetting = function () {
    open = [];
    matched = 0;
    moveCounter = 0;
    clearT();
    removeOneStar();
    $(".card").attr("class", "card");
    cardShuffling();
    resetFunction();
};
$(".restart").click(gameResetting);
// Handles primary game logic of game >>
var cardClick = function () {
    if (timer.seconds == 0 && timer.minutes == 0) {
        clearT();
    }
    if (newCard($(this))) {
        if (open.length === 0) {
            openCard($(this));
        } else if (open.length === 1) {
            openCard($(this));
            moveCounter++;
            removeOneStar();
            if (check()) {
                setTimeout(matchingSet, 500);
            } else {
                setTimeout(resetOpen, 800);
            }
        }
    }
};
$(".card").click(cardClick);
// Resets game state and toggles win modal display off
var playAgain = function () {
    gameResetting();
    modal.css("display", "none");
};
$(".replay").click(playAgain);
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
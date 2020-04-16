let time = 0; // variable time to 0
let allCards = document.querySelectorAll('.card'); // variable to store all cards
let openCards = []; //create array to store the open cards in
let matchedCardsCount = 0; // create variable to count pairs of matched cards
let moveCounter = 0; // create variable to store the number of moves
const resetButton = document.querySelector('.fa-repeat'); // set the reset icon to a const
resetButton.addEventListener('click', reset, false); // add event listener to resetButton 
let stars = document.querySelectorAll('ul.stars li'); // variable to select the stars to then use to add and remove them

//starts the timer counting up in one second increments
const timer = setInterval(function() {
    time++;
    document.querySelector('.timer').textContent = "Time elapsed " + time + " seconds.";
}, 1000);
//resets the timer back to 0 seconds - this is called from the reset function
function clearTimer() {
    clearInterval(timer);
}

// Shuffle function from https://stackoverflow.com/questions/25175798/how-to-shuffle-a-nodelist
function shuffle (){
    [].slice.call( document.querySelectorAll(".card") ).filter( function( _e ){
        _e.style.order =  (Math.floor(Math.random() * (16) + 1));
    } );
}

// reset game function
// remove classes from all cards

//
function reset() {
    for (var i=0; i<allCards.length; i++) {
        allCards[i].classList.remove('clicked', 'open', 'show', 'match');
    }
    openCards = []; // reset array to no open cards
    matchedCardsCount = 0;
    document.querySelector('.moves').textContent = "0";
    shuffle(allCards);
    
let numStars = document.querySelector('ul.stars').children.length;
    
        if (numStars == 2) {
            document.querySelector('ul.stars').appendChild(stars[0]);
             
            } else { if (numStars == 1) {
                document.querySelector('ul.stars').appendChild(stars[0]);
                document.querySelector('ul.stars').appendChild(stars[1]);
            }
    
    }
numStars = 3; //sets number of stars displayed to 3
moveCounter = 0; // changes .moves element inner text to 0 (from the inital html value "3")
shuffle(); //calls shuffle function
time = 0; //sets time to 0
setInterval(timer); //restarts timer
}

// increases moveCounter each time a valid card (does not have classes open, match or show) is clicked and sets html inner text counter to equal moveCounter
// remove star when called from addMove if moveCounter = 20 and then another star if moveCounter 30
function addMove() {
    moveCounter++;
    document.querySelector('.moves').textContent = moveCounter;
    
        if (moveCounter == 20) {
            document.querySelector('ul.stars').removeChild(stars[0])
            } else { if (moveCounter == 30) {
                document.querySelector('ul.stars').removeChild(stars[1])
                }
            } 
}   


//function to show win message. 
function win() {
    alert("You win with " + moveCounter + " moves and " + document.querySelector('ul.stars').children.length + " STARS!\nWell Done.\nIt took you " + time + " seconds to win.\nClick the reset arrow to play again");
}

// function to listen for clicks on cards
// only lets clicks occur on cards that do not have the classes open, match or show
// stores the first two clicked cards in openCards array
// checks if the stored cards in openCards contain equal nodes and if they do, assigns them the match class
// sets a timer to turn the two cards in openCards back over after .5 seconds
// removes classes open and show from the cards IF the first two clicked cards (openArray = 2) don't match AND the time lapsed since clicking on the second cards equals one second
allCards.forEach(function (card) {
    card.addEventListener('click', function (e) {
       if (matchedCardsCount == 8) {
           win();
        }
        if (!card.classList.contains('clicked')) {
            addMove();
            if (openCards.length <=2){
            openCards.push(card);
            }
            card.removeEventListener('click', e);
            console.log(openCards.length);
            card.classList.add('clicked', 'open', 'show');       
                if (openCards.length == 2) {
                    
                        if (openCards[0].lastElementChild.isEqualNode(openCards[1].lastElementChild)) {    
                            openCards[0].classList.add('match');
                            openCards[1].classList.add('match');
                            matchedCardsCount ++;

                        }
                }
            if (openCards.length == 2) {
                setTimeout(function () {
                    openCards.forEach(function (card) {
                        card.classList.remove('clicked', 'open', 'show');
                    });
                    openCards = [];
                }, 500);
            }
        }
        
    });
});

// function to clear board on run - runs the reset function
reset();
/*
 * Create a list that holds all of your cards
 */
//TODO change number of stars to <30 35 >40


//win message if match class = 16
//remove console.log moveCounter
//change win condition to 8
//add timer
//add time and stars to win message
//remove the 3rd star remove and 
//fix win 


let time = 0;
const timer = setInterval(function() {
    time++;
    console.log(time);
}, 1000);

function clearTimer() {
    clearInterval(timer);
}

let allCards = document.querySelectorAll('.card');
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from https://stackoverflow.com/questions/25175798/how-to-shuffle-a-nodelist
function shuffle (){
    [].slice.call( document.querySelectorAll(".card") ).filter( function( _e ){
        _e.style.order =  (Math.floor(Math.random() * (16) + 1));
    } );
}


let openCards = []; //create array to store the open cards in
let matchedCardsCount = 0; // create variable to count matched cards

let arr = [];
for(var i = allCards.length; i--; arr.unshift(allCards[i]));

let moveCounter = 0; // create variable to store the number of moves
const resetButton = document.querySelector('.fa-repeat'); // set the reset icon to a const




startGame();
// function to clear board on run - runs the reset function
function startGame(){
    reset();
    //shuffle();
}

// add event listener to resetButton const
resetButton.addEventListener('click', reset, false); 


let stars = document.querySelectorAll('ul.stars li');
//let starsParent = document.querySelectorAll('ul.stars');
//let starsChild = stars;


// reset game function
// remove classes from all cards which makes them turn over
// changes .moves element inner text to 0 (from the inital html value "3")
function reset() {
    for (var i=0; i<allCards.length; i++) {
        allCards[i].classList.remove('open', 'show', 'match');
    }
    openCards = []; // reset array to no open cards
    matchedCardsCount = 0;
    document.querySelector('.moves').textContent = "0";
    shuffle(allCards);
    
let numStars = document.querySelector('ul.stars').children.length;
    
        if (numStars == 2) {
            console.log(moveCounter);
            document.querySelector('ul.stars').appendChild(stars[0]);
             
            } else { if (numStars == 1) {
                console.log(moveCounter);
                document.querySelector('ul.stars').appendChild(stars[0]);
                document.querySelector('ul.stars').appendChild(stars[1]);
            }
    
    }
numStars =3;
    moveCounter = 0;
    shuffle();       
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


//function to show message "You win with + 'moveCounter' + " moves! Well Done. Click the reset arrow to play again"
function win() {
    alert("You win with " + moveCounter + " moves and " + document.querySelector('ul.stars').children.length + " STARS!\nWell Done.\nIt took you x time to win.\nClick the reset arrow to play again");

}
// function to listen for clicks on cards
// only lets clicks occur on cards that do not have the classes open, match or show
// stores the first two clicked cards in openCards array
// checks if the stored cards in openCards contain equal nodes and if they do, assigns them the match class
// removes classes open and show from the cards IF the first two clicked cards (openArray = 2) don't match AND the time lapsed since clicking on the second cards equals one second
allCards.forEach(function (card) {
    card.addEventListener('click', function (e) {
       if (matchedCardsCount == 4) {
           win();
       }

        if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
            addMove();
            openCards.push(card);
            card.classList.add('open', 'show');
                       
            
            console.log(openCards[0] + openCards[1]);
            
            
            if (openCards[0].lastElementChild.isEqualNode(openCards[1].lastElementChild)) {    
                console.log("cards match");
                openCards[0].classList.add('match');
                openCards[1].classList.add('match');
                matchedCardsCount ++;
            }
            
            if (openCards.length == 2) {
                setTimeout(function () {
                    openCards.forEach(function (card) {
                        card.classList.remove('open', 'show');
                    });
                    openCards = [];
                }, 1000);
            }
        }
        
    });
    
});


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/
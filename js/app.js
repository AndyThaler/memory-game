/*
 * Create a list that holds all of your cards
 */
let items = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"];
var flipcards = 0;
var pairs = 0;
var opencards = [];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function empty() {
  var deck = document.querySelector(".deck");
while (deck.firstChild) {
    deck.removeChild(deck.firstChild);
}
}

function init() {
let cards = shuffle(items);
var deck = document.querySelector('.deck');

cards.forEach(function (item) {
  deck.insertAdjacentHTML('afterbegin', '<li class="card"><i class="' + item + '"></i></li>');
})}

document.addEventListener('DOMContentLoaded', firstinit());

function firstinit(){
  alert("Welcome to my memory game! Are you ready to play?");
  init();
}
const startingTime = performance.now();
Array.from(document.getElementsByClassName("card")).forEach(
    function(item) {
      item.addEventListener('click', function () {
            if(opencards.length < 2){
            item.classList.add("animated");
            item.classList.add("flipInY");
            item.classList.add("open");
            item.classList.add("show");
            opencards.push(item);
            if (opencards.length == 2){
              flipcards += 1;
              moves(flipcards);
              if(opencards[0].innerHTML == opencards[1].innerHTML) {
                 match(opencards);
                 opencards = [];
              }
              else {
              setTimeout(mismatch, 500, opencards);
              setTimeout(function() {opencards = []}, 1500);
            }
          }
        }
      })});



function moves(flipcards){
  document.querySelector('.moves').innerText = flipcards;
  if (flipcards == 1) document.querySelector('.noun').innerText = " Move";

  else {
    document.querySelector('.noun').innerText = " Moves";
    if (flipcards == 12) {
      var select = document.querySelector('.stars');
      select.removeChild(select.lastElementChild);
    }
    if (flipcards == 17){
        select = document.querySelector('.stars');
        select.removeChild(select.lastElementChild);
      }
  }
}

function match(opencards) {
flash(opencards);
pairs += 1;
if (pairs == 8) setTimeout(popup, 1000);
}

function mismatch(opencards) {
  wiggle(opencards);
  setTimeout(resetcards, 1000, opencards);
}

function flash(opencards) {
  opencards.forEach(function(item){
    item.classList.remove("flipInY");
    item.classList.add("flash");
    item.classList.add("match");
  })}

function wiggle(opencards){
  opencards.forEach(function(item){
    item.classList.remove("flipInY");
    item.classList.add("wobble");
  })}

function resetcards(opencards) {
  opencards.forEach(function(item){
  item.classList.remove("wobble");
  item.classList.remove("open");
  item.classList.remove("show");
  item.classList.add("flipInY");
  setTimeout(fullreset, 500, opencards);
})}

function fullreset(opencards) {
  opencards.forEach(function(item){
    item.classList.remove("animated");
    item.classList.remove("flipInY");
})}

var restart = document.querySelector(".restart");
restart.addEventListener('click', function () {
  empty();
  firstinit();
});



// When the user clicks the button, open the modal


// When the user clicks on <span> (x), close the modal


// When the user clicks anywhere outside of the modal, close it


function popup(){
  const endingTime = performance.now();
  console.log(endingTime);
  var difference = (endingTime-startingTime)/1000;
  var modal = document.getElementById('myModal');
  var span = document.getElementsByClassName("close")[0];
  modal.style.display = "block";
  span.onclick = function() {
      modal.style.display = "none";
  }
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }
}

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

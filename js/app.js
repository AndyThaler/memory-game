
let itemssingle = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];
let items = itemssingle.concat(itemssingle);
var flipcards = 0;
var pairs = 0;
var sec = 0;
var min = 0;
var stop = 0;
var opencards = [];



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
//Empty function to empty the whole deck to prepare it for new cards
function empty() {
  var deck = document.querySelector(".deck");
  deck.innerHTML = '';
  var stars = document.querySelector('.stars');
  stars.innerHTML = '';
}

/*Initial function:
    * Resets all parameters
    * Starts Timer
    * Lays cards onto the deck */
function init() {
flipcards = 0;
pairs = 0;
sec = 0;
stop = 0;
min = 0;
stop = setInterval(timecounter, 1000);
opencards = [];
moves(flipcards);
let cards = shuffle(items);
var deck = document.querySelector('.deck');
var stars = document.querySelector('.stars');
for(var i = 0; i<3; i++) {
  stars.insertAdjacentHTML('afterbegin', '<li><i class="fa fa-star"></i></li>');
}
cards.forEach(function (item) {
  deck.insertAdjacentHTML('afterbegin', '<li class="card"><i class="' + item + '"></i></li>');
})
addListener();
}

//Timer-function w/ increment and output on the webpage
function timecounter () {
  var counter = document.querySelector('.counter');
  sec += 1;
  if (sec < 60) counter.innerText = min + "min " + sec;
  else {
    min += 1;
    sec = 0;
    counter.innerText = "Time: " + min + "min " + sec;
  }
}
document.addEventListener('DOMContentLoaded', firstinit()); //start app.js when DOM is fully loaded

//shows an alert to prepare the player for the match-begin
function firstinit(){
  alert("Welcome to my memory game! Are you ready to play? Press OK and lets go!");
  init();
}

/*Eventlistener-function:
    * Adds eventlistener for clicks on all cards
    * Forks the code into match & mismatch
    * Calls moves() to increase the Moves
    * calls for more functions (see below)*/
function addListener(){
Array.from(document.getElementsByClassName("card")).forEach(
    function(item) {
      item.addEventListener('click', function () {
            if(!opencards.includes(item) && opencards.length < 2){
            item.classList.add("animated");
            item.classList.add("flipInY");
            item.classList.add("open");
            item.classList.add("show");
            opencards.push(item);
            if (opencards.length == 2){
              flipcards += 1;
              moves(flipcards);
              if(opencards[0].innerHTML == opencards[1].innerHTML) {
                 setTimeout(match, 500, opencards);
                 opencards = [];
              }
              else {
              setTimeout(mismatch, 500, opencards);
              setTimeout(function() {opencards = []}, 1500);
            }
          }
        }
      })});
}

//moves function to display current moves and adjust star-level
function moves(flipcards){
  document.querySelector('.moves').innerText = flipcards;
  if (flipcards == 1) document.querySelector('.noun').innerText = " Move";

  else {
    document.querySelector('.noun').innerText = " Moves";
    if (flipcards == 12) {
      var stars = document.querySelector('.stars');
      stars.removeChild(stars.lastElementChild);
    }
    if (flipcards == 17){
        stars = document.querySelector('.stars');
        stars.removeChild(stars.lastElementChild);
      }
  }
}
//match-function calling animate-fct, or call winning-fct
function match(opencards) {
  flash(opencards);
  pairs += 1;
  if (pairs == 8) {
    clearInterval(stop);
    setTimeout(popup, 1000);
  }
}
//mismatch-function calling animate-fct and afterwards reseting cards
function mismatch(opencards) {
  wiggle(opencards);
  setTimeout(resetcards, 1000, opencards);
}
//match-animation
function flash(opencards) {
  opencards.forEach(function(item){
    item.classList.remove("flipInY");
    item.classList.add("flash");
    item.classList.add("match");
  })}
//mismatch-animation
function wiggle(opencards){
  opencards.forEach(function(item){
    item.classList.remove("flipInY");
    item.classList.add("wobble");
  })}
//resets the animatinons for the cards
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
//restart-btn calling the reset-fcts
var restart = document.querySelector(".restart");
restart.addEventListener('click', function () {
  clearInterval(stop);
  empty();
  init();
});

//winning-modal
function popup(){
  var modal = document.getElementById("myModal");
  var span = document.getElementsByClassName("close")[0];
  var text = document.getElementById("winntext");
  modal.style.display = "block";
  text.innerHTML = "It took you " + document.querySelector('.moves').innerText + " Moves and a time of " + document.querySelector('.counter').innerText + " seconds!";
  span.onclick = function() {
      modal.style.display = "none";
  }
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }
  var modres = document.querySelector(".modal-restart");
  modres.addEventListener('click', function () {
    modal.style.display = "none";
    empty();
    clearInterval(stop);
    init();
  });
}

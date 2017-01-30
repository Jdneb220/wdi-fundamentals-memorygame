
var cards = [];

var cardsInPlay = [];

var wins = 0;
var attempts = 0;

function resetScoreboard(){
	document.getElementById('wins').innerHTML = wins;
	document.getElementById('attempts').innerHTML = attempts;
	var percent = 0.00
	attempts == 0 ? percent = 0 : percent = Number(Math.round(wins / attempts + 'e2')+'e-2'); 
	document.getElementById('percent').innerHTML = percent;

}

function resetBoard(){
	document.getElementById('game-board').innerHTML = '';
	createBoard();
}

function isMatch(cardsInPlay){
	if (cardsInPlay[0] == cardsInPlay[1]){
		document.getElementById('game-log').innerHTML =   '<font color=green>We have a match!</font><br>' + document.getElementById('game-log').innerHTML;
		wins++;
	}
	else
		document.getElementById('game-log').innerHTML =  '<font color=red>Not a match...</font><br>' + document.getElementById('game-log').innerHTML ;

	resetBoard();
}

//checks to see if there are cards in play
function isTwoCards() {

  // if you have two cards in play, check for a match
  if (cardsInPlay.length === 2) {

  	attempts++;

    // pass the cardsInPlay as an argument to the isMatch function
    isMatch(cardsInPlay);

    // clear cards in play array for your next try
    cardsInPlay = [];

  }

}

function flipCard(){
	  // add card to array of cards in play
  cardsInPlay.push(this.getAttribute('data-card'));

  if (this.getAttribute('data-card') == 'king')
  	this.innerHTML = '<img width=100% height=100% src="king.png" alt="King of Hearts" />';
  else
  	this.innerHTML = '<img width=100% height=100% src="queen.png" alt="Queen of Hearts" />';

  setTimeout(isTwoCards,500);
}

function createCards(){
  var numKings = 0, numQueens = 0;
  cards = [];
  for (var i = 0; i < 4; i++){
  if (numQueens == 2){
   cards.push('king');
   numKings++;
	}
  else if (numKings == 2){
  	cards.push('queen');
  	numQueens++;
  }
  else if (Math.floor((Math.random() * 2) + 1) == 1){
   cards.push('king');
   numKings++;
	}
  else{
   cards.push('queen');
   numQueens++;
	}
   }
}

function createBoard(){
	resetScoreboard();
	createCards();
	var gameBoard = document.getElementById('game-board');
	for (var i = 0; i < cards.length; i++){
		var cardElement = document.createElement('div');
		cardElement.setAttribute('class','card');
		cardElement.setAttribute('data-card', cards[i]);
		cardElement.addEventListener('click',flipCard);
		gameBoard.appendChild(cardElement);
	}
}

createBoard();


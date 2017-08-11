//$(function () {
"use strict";
$(window).on("keyup", userKey);
var games = -1;
var wordbank = String.prototype.toUpperCase.apply(["pineapple", "guava", "dragonfruit", "cherimoya", "passion fruit", "starfruit", "coconut", "mango", "papaya", "jackfruit"]).split(",");
var currentWord, lettersGuessed, wrongLetters, displayWord, guessesLeft, totalGuesses;
var loseSound = new Audio("assets/media/lose.mp3");
loseSound.loop = false;
var winSound = new Audio("assets/media/winner.mp3");
winSound.loop = false;
function newGame() {
	games++;
	currentWord = wordbank[~~(Math.random() * wordbank.length)];
	displayWord = currentWord.replace(/[A-Z]/g, "_");	//Replace all characters with _
	totalGuesses = guessesLeft = currentWord.length - currentWord.split(" ").length + 4;	//Length (without spaces) + 5
	lettersGuessed = "";
	wrongLetters = "";
	$("#result").empty();
	$("#status").html('<img src="assets/media/' + currentWord.toLowerCase() + '.png"/>');
	updateWord(displayWord);
	tries();
}
function updateWord(word) {
	displaySpaced("word", word);
	$("#status img").css("opacity", (totalGuesses - guessesLeft) / totalGuesses);
}
function tries() {
	$("#guesses").html(guessesLeft);
}
function updateWrong() {
	displaySpaced("wrong-letters", wrongLetters);
}
function displaySpaced(id, word) {
	$("#" + id).html(word.split("").join("&ensp;"));
}

function loseGame() {
	loseSound.play();
	completeGame("lose");
}
function winGame() {
	winSound.play();
	completeGame("win");
}

function completeGame(status) {

	$("#result").html('Great job! The word was <span class="' + status + '">' + currentWord + '</span>.');
	$("#status").empty();
	games = -1;
}

function userKey(e) {
	if (games === -1 && e.keyCode !== 116) { //So F5 does not trigger new game on refresh
		newGame();
		return;
	}
	var letter = String.fromCharCode(e.keyCode).toUpperCase();
	//Ignore key press if a valid letter key was not pressed
	if ("ABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(letter) && guessesLeft > 0) {
		checkLetter(letter);
	}
}
function checkLetter(letter) {
	if (!lettersGuessed.includes(letter)) {	//If Letter hasn't already been guessed
		lettersGuessed += letter;
		guessesLeft--;
		var correct = currentWord.includes(letter);
		if (!correct)
			wrongLetters += letter;
		updateWrong();
		tries(letter);

		if (correct) {
			for (var i = 0; i < currentWord.length; i++) {
				if (currentWord[i] === letter)
					displayWord = displayWord.substr(0, i) + letter + displayWord.substr(i + 1);
			}
			updateWord(displayWord);
			if (displayWord === currentWord) {
				winGame();
			}
		} else if (guessesLeft === 0) {
			loseGame();
		}
	}
}

//});
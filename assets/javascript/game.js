//$(function () {
    "use strict";
    $(window).on("keyup", userKey);
    var games = -1;
    var wordbank = String.prototype.toUpperCase.apply(["pineapple", "guava", "dragonfruit", "cherimoya", "passion fruit","starfruit","coconut","mango","papaya","jackfruit"]).split(",");
    var guessesLeft = 0;
    var currentWord = "";
    var lettersGuessed = "";
    var displayWord = "";
    function newGame(){
        games++;
        currentWord = wordbank[~~(Math.random() * wordbank.length)];
        guessesLeft = currentWord.length + 5;
        lettersGuessed = "";
        displayWord = '_'.repeat(currentWord.length);
        updateWord(displayWord);
    }
    function updateWord(word){
        $("#word").html(word.split("").join("&emsp;"));
    }
    function tries(word){
        $("#guesses").html(guessesLeft);
    }
    function userKey(e){
        if( games === -1 && e.keyCode !== 116) { //So F5 does not trigger new game
            newGame();
            return;
        }
        var letter = String.fromCharCode(e.keyCode).toUpperCase();
        if( "ABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(letter) ) {
            checkLetter(letter);
        }
    }
    function checkLetter(letter){
        if( !lettersGuessed.includes(letter) ) {
            lettersGuessed += letter;
            if( currentWord.includes(letter) ){
                for(var i = 0; i < currentWord.length; i++){
                    if( currentWord[i] === letter)
                        displayWord = displayWord.substr(0, i) + letter + displayWord.substr(i + 1);
                }
                updateWord(displayWord);
            } else {
                
            }
        }
    }

//});
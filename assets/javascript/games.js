// JavaScript function that wraps everything
$(document).ready(function() {

    var wins = 0;
    var validGuesses = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ];

    function Game() {

        this.rappers = [
            "kanye",
            "drake",
            "kyle",
            "kenderick",
            "cole",
            "faboulous",
            "meek"
        ]

        this.word = this.rappers[Math.floor(Math.random() * this.rappers.length)];
        this.guessedLetters = [];
        this.errors = 0;
        this.visibleLetters = [];
        this.gameOver = false;
        this.numberOfGuesses = 9;
        for (var i = 0; i < this.word.length; i++) {
            this.visibleLetters[i] = (false);
        }
    }
    var game = new Game();

    console.log(game.word)

    //set empty song title
    var tempString = "";
	for (var i = 0; i < game.visibleLetters.length; i++) {
		tempString += ((game.visibleLetters[i] || game.gameOver) ? game.word.charAt(i).toUpperCase() : "_");
		if (i < (game.visibleLetters.length - 1)) tempString += " ";
    }
    
    $("#song-title").text(tempString);
    $("#guessed-letters").text(game.guessedLetters);
    $("#number-of-guesses-remaining").text(game.numberOfGuesses);
    $("#number-of-wins").text(wins);

    document.onkeypress = function(event) {

        var userGuess = " "
        if (checkValidKey(event.key)) {
            userGuess = event.key
            
            if(!(returnSongTitle(userGuess) == "")) {
            $("#song-title").text(returnSongTitle(userGuess))
            } 

            var alreadyGuessed = false;
            for( var z = 0; z < game.guessedLetters.length; z++) {
                if ((game.guessedLetters[z] == userGuess)) {
                    alreadyGuessed = true;
                }
            }
            if (!(wordContainsLetter(userGuess)) && (!alreadyGuessed)) {
                game.guessedLetters.push(userGuess)
            }
            
            $("#guessed-letters").text(game.guessedLetters);

            $("#number-of-guesses-remaining").text(returnNumberOfRemainingGuesses(game.guessedLetters.length, game.numberOfGuesses, userGuess))

            if (userWon(returnSongTitle(userGuess)) || (returnNumberOfRemainingGuesses(game.guessedLetters.length, game.numberOfGuesses, userGuess) == 0)) {
                $("#number-of-wins").text(wins)
                if ((returnNumberOfRemainingGuesses(game.guessedLetters.length, game.numberOfGuesses, userGuess) == 0)) {
                    if (confirm("You Lose!")) {
                        reset()
                    }
                } else {
                    wins++;
                    $("#song-title").text(returnSongTitle(userGuess))
                    if (confirm("You Win!")) {
                        reset()
                    }
                }
            }
    }
    };

    function returnGuessedLetter(key) {
        return key
    }

    function returnNumberOfWins(wins){
        return wins
    }

    function reset() {
        game = new Game();

        console.log(game.word)

        //set empty song title
        var tempString = "";
        for (var i = 0; i < game.visibleLetters.length; i++) {
            tempString += ((game.visibleLetters[i] || game.gameOver) ? game.word.charAt(i).toUpperCase() : "_");
            if (i < (game.visibleLetters.length - 1)) tempString += " ";
        }
        
        $("#song-title").text(tempString);
        $("#guessed-letters").text(game.guessedLetters);
        $("#number-of-guesses-remaining").text(game.numberOfGuesses);
        $("#number-of-wins").text(wins);
    }

    function returnNumberOfRemainingGuesses(guessedLettersLength, numberOfGuesses, userGuess) {

        for (var i = 0; i < game.word.length; i++) {
            if (!(game.word.charAt(i) == userGuess) && (numberOfGuesses > 0)) {
                numberOfGuesses = 9
                numberOfGuesses = numberOfGuesses - guessedLettersLength
            }
        }

        return numberOfGuesses
    }

    function wordContainsLetter(userGuess) {
        var contains = false;
        for (var i = 0; i < game.word.length; i++) {
            if (game.word.charAt(i) == userGuess) {
                contains = true;
            }
        }
        return contains
    }

    function checkValidKey(userGuess) {
        var valid = false;
        for (var i = 0; i < validGuesses.length; i++) {
            if ((validGuesses[i] == userGuess)) {
                valid = true;
            }
        }
        return valid
    }

    function userWon(songtitle) {
        var blanks = 0;
        var won = false;
        for (var i = 0; i < songtitle.length; i++) {
            if ((songtitle.charAt(i) == "_")) {
                blanks++;
            }
        }
        console.log(blanks);
        if (blanks == 0) {
            won = true;
        }
        return won
    }

    function returnSongTitle(userGuess) {
        var newString  = "";
        for (var i = 0; i < game.word.length; i++) {
            if (game.word.charAt(i) == userGuess) {
                game.visibleLetters[i] = true
            }
        } 
        
        for (var i = 0; i < game.visibleLetters.length; i++) {
            newString += ((game.visibleLetters[i] || game.gameOver) ? game.word.charAt(i).toUpperCase() : "_");
            if (i < (game.visibleLetters.length - 1)) newString += " ";
        }

        return newString
    }   
});
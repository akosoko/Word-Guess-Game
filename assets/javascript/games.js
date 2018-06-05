// JavaScript function that wraps everything
$(document).ready(function() {

    var wins = 0;
    var numberOfGuesses = 9;

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
        for (var i = 0; i < this.word.length; i++) {
            this.visibleLetters[i] = (false);
        }
    }
    var game = new Game();

    var tempString = "";
	for (var i = 0; i < game.visibleLetters.length; i++) {
		tempString += ((game.visibleLetters[i] || game.gameOver) ? game.word.charAt(i).toUpperCase() : "_");
		if (i < (game.visibleLetters.length - 1)) tempString += " ";
    }
    
    $("#song-title").text(tempString);
    $("#guessed-letters").text(game.guessedLetters);
    $("#number-of-guesses-remaining").text(numberOfGuesses);
    $("#number-of-wins").text(wins);

    $(document).keypress(function(event){
	
        console.log(event.key)
        game.guessedLetters.push(event.key);
        $("#guessed-letters").text(game.guessedLetters);

        var isInWord = false;
        for (var i = 0; i < game.word.length; i++) {
            if (game.word.charAt(i) === event.key) {
                isInWord = true;
                game.visibleLetters[i] = true;
            }
        }
        if (!isInWord) {
            game.errors++;
            if (numberOfGuesses > 0) {}
                numberOfGuesses -= game.errors;
            }
            $("#number-of-guesses-remaining").text(numberOfGuesses);
        }

        if (game.errors >= numberOfGuesses) {
            game.gameOver = true;
        }

        if (!game.visibleLetters.includes(false)) {
            wins++;
            game.gameOver = true;
        }
        
    });



    // tempString = "";
	// for (var i = 0; i < this.guessedLetters.length; i++) {
	// 	tempString += (this.guessedLetters[i].toUpperCase());
	// 	if (i < (this.guessedLetters.length - 1)) tempString += " ";
	// }
	// for (var i = tempString.length; i < 9; i++) {
	// 	tempString += " ";
    // }
    // $("#number-of-guesses-remaining").text(tempString);
	


    console.log(game.word);

});
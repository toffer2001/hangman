var inquirer = require("inquirer");

var wordList = ["haven", "solana", "harper", "baby"];
var userGuesses = [];
var placeholder = [];

var totalGuesses = 0;
var guessesRemainingCounter = 10;

var randomWord = wordList[Math.floor(Math.random() * wordList.length)];
var n = randomWord.length;
var answer = [randomWord];

// split word to array
var answerCharArray = randomWord.split("");


// console.log("The answer is: " + randomWord);
// console.log("This is the # of letters in the word: " + n);
// console.log("Converted word to an array: " + answerCharArray);


for (var i = 0; i < n; i++) {
    placeholder[i] = "_ ";
}

x = placeholder.join("");
console.log("x: " + x);

var askQuestion = function () {
    
    if (guessesRemainingCounter > 0) {
        console.log("\n----------------");
    
        inquirer.prompt([
                {
                    type: "input",
                    message: "Guess a letter?",
                    name: "letter",
                    validate: function (value) {
                        if (isNaN(value) === true) {
                            return true;
                        }
                        console.log(" \nBE SURE TO INPUT A LETTER");
                        return false;
                        
                        }
                }
        ]).then(function (answer) {

            var guess = new Guess(
                answer.letter
            )
            function Guess(letter) {
                this.letter = letter;
            // console.log("placeholder: " , placeholder);
            // var check = placeholder.indexOf("_ ");
            // console.log("check: " + check);
            
            // if (guessesRemainingCounter == 0) {
            //     console.log("Game over - you ran out of guesses. The answer is: " + randomWord);
            // }
            // else {                
                checkAnswer(letter);
            // }

            // if ((check === -1) && (guessesRemainingCounter > 0)) {
            //     checkAnswer(letter);
            // }
            // else {
            //     console.log("Congrats, you won!");
            // }

                this.printGuesses = function () {
                    console.log("Letter Guessed: " + this.letter);
                };
            }
            totalGuesses++;

            askQuestion();
        })
    }
    var check = placeholder.indexOf("_ ");
    if (guessesRemainingCounter == 0 && check === -1) {
    // console.log("You won!");
    }
    else if (guessesRemainingCounter == 0) {
        console.log("\nGAME OVER - you ran out of guesses. \nThe answer is: " + randomWord);
    }
}

askQuestion();

var checkAnswer = function(letter) {
    
    var a = answerCharArray.indexOf(letter);
    if (a === -1) {
        userGuesses.push(letter);
        guessesRemainingCounter--;
        console.log("INCORRECT.  You have " + guessesRemainingCounter + " guesses remaining!");
        console.log(placeholder.join(""));
    }
    else {
        for (var j = 0; j < n; j++) {
            if (answerCharArray[j] === letter) {
                placeholder[j] = letter;
                console.log(placeholder.join(""));
            }
        }
        var check = placeholder.indexOf("_ ");
        // console.log("check: " + check);

        if (check === -1) {
            console.log("Congrats, you won!");
            guessesRemainingCounter = 0;            
        }
        else {console.log("CORRECT!  You still have " + guessesRemainingCounter + " guesses remaining!")};
    }
}

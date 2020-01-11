let game = {
    timeAllowed: 30000,
    correctAnswers: 0,
    incorrectAnswers: 0,
    unanswered: 0,
    time: 0,
    questionIndex: 0,
    intervalId: "",
    timeoutID: ""
}

function endGame() {
    // Clear the interval so there is no more countdown
    clearInterval(game.intervalId);

    // Show the final score page
}

function updateTime() {
    if (game.questionIndex === questions.length) {
        endGame();
    } else if (game.time === 0) {
        clearInterval(game.intervalId);
        //  Alert the user that time is up.
        console.log("Time Up!");
        displayAnswer(false);
    } else {
        $("#time-remaining").text("Time Remaining: " + game.time-- + " seconds");
    }
}

function displayQuestion() {
    $(".start-game").remove();
    game.time = 5;
    clearInterval(game.intervalId);
    // Start a timer and update the timer value
    game.intervalId = setInterval(updateTime, 1000);

    $("#question").text(questions[game.questionIndex].question);
    questions[game.questionIndex].answers.forEach(function (element, index) {
        $("#question").append($("<br>"));
        var item = $("<button>").addClass("question-button");
        item.attr("data-index", index);
        item.attr("data-answer", element);
        item.text(element);
        $("#question").append(item);
    });

}

function resetGame() {
    game.correctAnswers = 0;
    game.incorrectAnswers = 0;
    game.unanswered = 0;
    game.time = 0;
    game.questionIndex = 0;
    clearInterval(game.intervalId);
    timeoutID = "";
}
function checkAnswer(answer) {
    clearInterval(game.intervalId);
    if (questions[game.questionIndex].correctAnswer === answer) {
        displayAnswer(true);
    } else {
        // Incorrect Answer
        displayAnswer(false);
    }
}
// Function: displayAnswer
// If the answer is correct, show a celebration. If it is incorrect notify the user they are bad.
// After that, move on to the next question in 5 seconds.  
function displayAnswer(correct) {
    // Clear the interval to remove the timer
    clearInterval(game.intervalId);
    // remove the question displayed
    $(".question-button").detach();
    if (correct) {
        console.log("Correct!");
        // increment the correct answer variable
        game.correctAnswers++;
        // display the answer and gif
    } else {
        console.log("Incorrect!");
        // increment the incorrect answer variable
        game.incorrectAnswers++;
        // display the answer and gif
    }
    // set a new timer for 5 seconds then move to the next question
    game.timeoutID = setTimeout(nextQuestion, 5000);
}

// Function: nextQuestion
// Moves to the next question in the list. If there are no more questions it resets the game!
function nextQuestion() {
    // Clear the timeout that was set by displayAnswer. Clear the interval as well just in case.
    clearTimeout(game.timeoutID);
    clearInterval(game.intervalId);
    // Go to the next question
    game.questionIndex++;
    // If we're on the last question, the game is over. 
    if (game.questionIndex >= questions.length) {
        resetGame();
    } else {  // Otherwise display the next question
        displayQuestion();
    }
}


// function playGame(index) {
//     resetGame();
//     $(".start-game").remove();
//     game.time = 5;
//     game.questionIndex = 0;
//     clearInterval(game.intervalId);
//     // Start a timer and update the timer value
//     game.intervalId = setInterval(updateTime, 1000);
// }

$(document).ready(function () {

    $("#main").append($("<button>").addClass("start-game").text("Start Game"));

    $(document).on("click", ".start-game", function () {
        // Start the game
        //playGame(0);
        game.questionIndex = 0;
        displayQuestion();
    });

    $(document).on("click", ".question-button", function () {
        // check for correct answer
        checkAnswer($(this).attr("data-answer"));
    });
});
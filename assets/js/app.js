let game = {
    timeAllowed: 30000,
    correctAnswers: -1,
    incorrectAnswers: -1,
    unanswered: -1,
    time: -1,
    questionIndex: -1,
    intervalId: ""
}

function endGame() {
    clearInterval(game.intervalId);
}

function updateTime() {
    if (game.questionIndex === questions.length) {
        endGame();
    } else if (game.time === 0) {
        clearInterval(game.intervalId);
        //  Alert the user that time is up.
        alert("Time Up!");
        nextQuestion();
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
}

function resetGame() {
    game.correctAnswers = -1;
    game.incorrectAnswers = -1;
    game.unanswered = -1;
    game.time = -1;
}

function nextQuestion() {
    clearInterval(game.intervalId);
    game.questionIndex++;
    displayQuestion();
}


function playGame(index) {
    resetGame();
    $(".start-game").remove();
    game.time = 5;
    game.questionIndex = 0;
    clearInterval(game.intervalId);
    // Start a timer and update the timer value
    game.intervalId = setInterval(updateTime, 1000);
}

$(document).ready(function () {

    $("#main").append($("<button>").addClass("start-game").text("Start Game"));

    $(document).on("click", ".start-game", function () {
        // Start the game
        //playGame(0);
        game.questionIndex = 0;
        displayQuestion();
    });
});
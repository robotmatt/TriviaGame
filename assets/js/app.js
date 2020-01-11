let game = {
    timeAllowed: 30000,
    correctAnswers: -1,
    incorrectAnswers: -1,
    unanswered: -1,
    time: -1,
    intervalId: ""
}

function displayQuestion(questionNumber) {
    $("#question").text(questions[questionNumber].question);
    return questionNumber;
}

function resetGame() {
    game.correctAnswers = -1;
    game.incorrectAnswers = -1;
    game.unanswered = -1;
    game.time = -1;
}

function updateTime() {

    $("#time-remaining").text("Time Remaining: " + --game.time + " seconds");
    if (game.time === 0) {

        clearInterval(game.intervalId);
        //  Alert the user that time is up.
        alert("Time Up!");
    }
}

function playGame() {
    resetGame();
    $(".start-game").remove();
    questions.forEach(function (item, index) {
        // Display the question
        displayQuestion(index);
        game.time = 5;
        clearInterval(game.intervalId);
        // Start a timer and update the timer value
        game.intervalId = setInterval(updateTime, 1000);

    })
}

$(document).ready(function () {

    $("#main").append($("<button>").addClass("start-game").text("Start Game"));

    $(document).on("click", ".start-game", function () {

        // Start the game
        playGame();
    });
});
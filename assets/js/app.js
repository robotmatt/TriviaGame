let game = {
    countdown: 30000,
    correctAnswers: -1,
    incorrectAnswers: -1,
    unanswered: -1,

    displayQuestion: function (questionNumber) {
        return questionNumber;
    },

    resetGame: function () {
        this.correctAnswers = -1;
        this.incorrectAnswers = -1;
        this.unanswered = -1;
    },

    updateTime: function(){
        
    },

    playGame: function () {
        this.resetGame();
        questions.forEach(function (item, index) {
            // Display the question
            //this.displayQuestion(index);
            // Start a timer and update the timer value
            intervalId = setInterval(this.updateTime, 1000);
            
        })
    }


}

$(document).ready(function () {


    $("#start-game").on("click", function () {
        // Start the game
        game.playGame();
    });
});
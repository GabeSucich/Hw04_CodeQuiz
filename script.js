var screen_disply = ".begin"
var question_array;
var score = 100;
var time_remaining = 75;
var clear_scores = document.getElementById("clear-highscores")
var scores_list = document.getElementById("highscore-list")
var initial_input = document.getElementById("initial-input")
var submit_initials = document.getElementById("submit-initials")
var score_display = document.getElementById("score")
var start = document.getElementById("start-quiz")
var view_highscores = document.querySelectorAll("#view-highscores")

screen_switcher(".begin")

function screen_switcher(target) {
    // Takes in a class name in the form of ".class". All elements on the page with 
    // this class have display "initial". All others have display "none".
    var mains = document.querySelectorAll('main');
    var displayed = document.querySelector(target)
    
    for (const element of mains) {
        if (element === displayed) {
            element.style.removeProperty('display');
        }

        else {
            element.style.setProperty('display', 'none');
        };
    };

};

function play_game() {
    screen_switcher(".in-game")

}


// BEGINNING SCREEN

start.addEventListener("click", function() {
    play_game();
}
)

// VIEW HIGHSCORES BUTTON

for (const element of view_highscores) {
    element.addEventListener("click", function() {
        screen_switcher(".highscores");
    })
};


// SCORE AND HIGHSCORES

function write_score() {
    score_display.textContent = score
    score_display.style.fontWeight = 'bold'
}


// Clears the scores from the highscores list
clear_scores.addEventListener("click", function() {
    scores_list.innerHTML = ''
})

// Will add your high score to the list
submit_initials.addEventListener("click", function(event) {
    event.preventDefault()
    var new_score = document.createElement('p');
    new_score.textContent = initial_input.value + " - " + score;
    new_score.setAttribute('class', 'stored-score')
    scores_list.appendChild(new_score)
    screen_switcher(".highscores") //Jumps to the high scores page
}
)












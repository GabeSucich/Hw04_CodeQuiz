

var screen_disply = ".begin"

function screen_switcher(target) {
    // Takes in a class name in the form of ".class". All elements on the page with 
    // this class have display "initial". All others have display "none".
    var mains = document.querySelectorAll('main');
    var displayed = document.querySelector(target)
    
    for (const element of mains) {
        if (element === displayed) {
            element.removeAttribute('display');
        }

        else {
            element.style.display = 'none';
        };
    };

};

screen_switcher('.highscores')

// HIGHSCORES PAGE

var clear_scores = document.getElementById("clear-highscores")
var scores_list = document.getElementById("highscore-list")

clear_scores.addEventListener("click", function() {
    scores_list.innerHTML = ''
})




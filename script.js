var question_array = [{question: '?', 'correct': 'I am male', 'false1' : 'I am female', 'false2' : 'I am 22', 'false3': 'I am 25'},
                    {question: '?', 'correct': 1, 'false1' : 2, 'false2' : 2, 'false3': 2},
                    {question: '?', 'correct': 1, 'false1' : 2, 'false2' : 2, 'false3': 2},
                    {question: '?', 'correct': 1, 'false1' : 2, 'false2' : 2, 'false3': 2},
                    {question: '?', 'correct': 1, 'false1' : 2, 'false2' : 2, 'false3': 2},
                    {question: '?', 'correct': 1, 'false1' : 2, 'false2' : 2, 'false3': 2},
                    {question: '?', 'correct': 1, 'false1' : 2, 'false2' : 2, 'false3': 2}
                    ]
var score = 100;
var time_remaining = 75;
var clear_scores = document.getElementById("clear-highscores")
var scores_list = document.getElementById("highscore-list")
var initial_input = document.getElementById("initial-input")
var submit_initials = document.getElementById("submit-initials")
var score_display = document.getElementById("score")
var start = document.getElementById("start-quiz")
var view_highscores = document.querySelectorAll("#view-highscores")
var restart = document.getElementById("restart")
var question = document.getElementById('question')
var answer1 = document.querySelector('.one')
var answer2 = document.querySelector('.two')
var answer3 = document.querySelector('.three')
var answer4 = document.querySelector('.four')

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

// This function takes in an obj of question and answers. Displays the questions on the
function question_setup(info) {
    question.textContent = info.question;
    var randomized = random_ordering();
    var key_array = ['correct', 'false1', 'false2', 'false3'];
    for (const answer of key_array) {
        var location = randomized[0];

        if (location == 'one') {
            answer1.textContent = info[answer]
            answer1.id = answer
        }
        else if (location == 'two') {
            answer2.textContent = info[answer]
            answer2.id = answer
        }
        else if (location == 'three') {
            answer3.textContent = info[answer]
            answer3.id = answer
        }
        else if (location == 'four') {
            answer4.textContent = info[answer]
            answer4.id = answer
        };
        randomized.shift()
    };  
};


function take_quiz() {
    screen_switcher(".in-game");
    console.log(question_array[0])
    question_setup(question_array[0]);
};

function finish_game() {
    screen_switcher(".enter-initials");
    score_display.textContent = score
}


// BEGINNING SCREEN

start.addEventListener("click", function() {
    take_quiz();
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

// Resest the game.
restart.addEventListener("click", function () { 
    score = 100;
    time_remaining = 75;
    screen_switcher(".begin")
})

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
);

// MISCELLANEOUS HELPER FUNCTIONS

// A function which returns a random element from an array
function random_element(arr) {
    var length = arr.length;
    var random_index = Math.floor(length*Math.random());
    return arr[random_index];
};

// A function which randomizes the array [1, 2, 3, 4]
function random_ordering() {
    var ordered = ['one', 'two', 'three', 'four'];
    var unordered = [];
    function helper() {

        if (ordered.length === 1) {
            unordered.push(ordered[0])
        }

        else {
            var random_el = random_element(ordered);
            var index = ordered.indexOf(random_el);
            unordered.push(random_el)
            ordered = ordered.slice(0, index).concat(ordered.slice(index+1))
            helper()
        };
    };
    
    helper();
    return unordered;
};


function assigner(num) {

    if (num == 'one') {
        return answer1;
    }

    else if (num == 'two') {
        return answer2;
    }

    else if (num == 'three') {
        return answer3;
    }

    else if (num == 'four') {
        return answer4;
    };
}











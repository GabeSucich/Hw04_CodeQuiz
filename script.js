var question_array = [{question: '?', 'correct': 'I am male', 'false1' : 'I am female', 'false2' : 'I am 22', 'false3': 'I am 25'},
                    {question: '?', 'correct': 1, 'false1' : 2, 'false2' : 2, 'false3': 2},
                    {question: '?', 'correct': 1, 'false1' : 2, 'false2' : 2, 'false3': 2},
                    {question: '?', 'correct': 1, 'false1' : 2, 'false2' : 2, 'false3': 2},
                    {question: '?', 'correct': 1, 'false1' : 2, 'false2' : 2, 'false3': 2},
                    {question: '?', 'correct': 1, 'false1' : 2, 'false2' : 2, 'false3': 2},
                    {question: '?', 'correct': 1, 'false1' : 2, 'false2' : 2, 'false3': 2}
                    ]
var question_num = 0;
var score = 100;
var wrong_answers = 0;
var time_remaining = 75;
var clear_scores = document.getElementById("clear-highscores")
var scores_list = document.getElementById("highscore-list")
var initial_input = document.getElementById("initial-input")
var submit_initials = document.getElementById("submit-initials")
var score_display = document.getElementById("score")
var start = document.getElementById("start-quiz")
var view_highscores = document.querySelectorAll("#view-highscores")
var initial_time = document.getElementById("time-initial")
var timer = document.getElementById('time-remaining')
var restart = document.getElementById("restart")
var question = document.getElementById('question')
var answer1 = document.querySelector('.one')
var answer2 = document.querySelector('.two')
var answer3 = document.querySelector('.three')
var answer4 = document.querySelector('.four')
var feedback = document.getElementById('feedback')
var interval;
var allow_clicks = true;

screen_switcher(".begin")
initial_time.textContent = '75';
timer.textContent = '75'


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

function next_question() {

    allow_clicks = true;

    if (question_num === (question_array.length - 1)) {
        finish_game();
    }

    else {
        question_setup(question_array[question_num]);
        question_num++;
    };

    interval = setInterval( function() {
        time_remaining--;
        timer.textContent = time_remaining;
    }, 1000)
};

function correct() {
    clearInterval(interval);
    feedback.textContent = "Correct!"
    setTimeout(function () {
        feedback.textContent = '';
        time_remaining--;
        timer.textContent = time_remaining;
        console.log(time_remaining);
        next_question();
    }, 1000
    )
};

function incorrect() {
    clearInterval(interval);
    feedback.textContent = "Wrong!"
    wrong_answers++;
    time_remaining -= 10;
    setTimeout(function () {
        feedback.textContent = '';
        time_remaining--;
        timer.textContent = time_remaining;
        console.log(time_remaining)
        next_question();
    }, 1000
    )
}

answer1.addEventListener("click", function() {
    if (allow_clicks) {

        allow_clicks = false;

        if (answer1.id === 'correct') {
            correct();
        }
        else {
            incorrect();
        };

    };   


})
answer2.addEventListener("click", function() {
    if (allow_clicks) {

        allow_clicks = false;

        if (answer2.id === 'correct') {
            correct();
        }
        else {
            incorrect();
        };

    };   
})
answer3.addEventListener("click", function() {
    if (allow_clicks) {

        allow_clicks = false;

        if (answer3.id === 'correct') {
            correct();
        }
        else {
            incorrect();
        };

    };   
})
answer4.addEventListener("click", function() {
    if (allow_clicks) {

        allow_clicks = false;

        if (answer4.id === 'correct') {
            correct();
        }
        else {
            incorrect();
        };

    };   
})




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
    next_question();
};

function finish_game() {
    clearInterval(interval);
    screen_switcher(".enter-initials");
    if (time_remaining >= 0) {
        score = score + time_remaining - 14*wrong_answers
    }
    else {
        score = "0 (Ran out of time)"
    };
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
        clearInterval(interval);
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
    question_num = 0;
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











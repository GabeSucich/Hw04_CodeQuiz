var question_array = [{question: "The variable 'total' is initially set to 0. Which of the following for loops will set the value of 'total' equal to the sum of all positive integers up to but not including 7?" , 
                        'correct': 'for (i=1; i<7; i++) { total += i }', 
                        'false1' : 'for (i=1; i<8; i++) { total += i }', 
                        'false2' : 'for (i=1; i<7; i++) { total = i }', 
                        'false3': 'for (i=0; i<7; i++) { total += i }'},
                    {question: "There are two button elements on an HTML page. The button listed first on the page appears as: <button id='button2' class='button'></button>. The second appears as: <button id='button1' class='button'></button>. If we wanted to manipulate the SECOND button on the page using javascript, which of the following would point only to this second button?", 
                    'correct': "document.getElementById('button1')", 
                    'false1' : "document.getElementById('button2')", 
                    'false2' : "document.querySelector('.button')",
                    'false3': "document.querySelectorAll('.button')"},
                    {question: "An HTML file is linked to a javascript file which contains only the following code: setTimeout(function() {setInterval(function () {console.log(5)} , 2000 )} , 5000). When the HTML file is opened in browser, after how many seconds does 5 appears in the console for the first time?", 
                    'correct': 7, 
                    'false1' : 5, 
                    'false2' : 0, 
                    'false3': 2},
                    {question: "Which of the following will CSS selectors will grab only p tags with a class of 'paragraph'?", 
                    'correct': "p .paragraph", 
                    'false1' : ".paragraph", 
                    'false2' : "p #paragraph", 
                    'false3': "#paragraph"},
                    {question: "The following line is used to declare a variable called 'inner_var' inside of a function called 'outer_func': 'var inner_var'. In what scenarios can we access this variable 'inner_var'?", 
                    'correct': "Only inside of the outer_func function, or inside of functions defined within outer_func", 
                    'false1' : "Always", 
                    'false2' : "Inside of other functions which also contain the line 'var inner_var'", 
                    'false3': "Always, as long as we precede referencing 'inner_var' with the line 'var inner_var'"},
                    {question: "We define two variables: 'var product = 1' and 'var i = 4'. After the following while loop is finished, what is the value of product?: while (i >= 0) {product = product*i}", 
                    'correct': 0, 
                    'false1' : 24, 
                    'false2' : 12, 
                    'false3': 1},
                    {question: "On an HTML page, a 'submit' button is nested within a <form> tag. When creating an event listener for the submit button, what function do we need to call so that clicking the submit button does not refresh the page? (Assume that the argument passed into the event-listener function is 'event')." , 
                    'correct': "event.preventDefault()", 
                    'false1' : "event.preventRefresh()", 
                    'false2' : "event.stopDefault()", 
                    'false3': "We do not need to call any special function to prevent this refresh."}
                    ]
var question_num = 0;
var score;
var correct_answers = 0;
var time_remaining = 100;
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


// The screen is set to the beginning display when the page is opened. The initial time is set to 100, and the questions are randomized.
screen_switcher(".begin");
timer.textContent = '100'
question_randomizer()




// QUIZ-FLOW FUNCTIONS

// Function that beings the quiz
function take_quiz() {
    screen_switcher(".in-game");
    next_question();
};

// Function that triggers the next question to be asked. 
// Called after the player has answered a question and the score has been displayed.
function next_question() {
    allow_clicks = true;

    if (question_num === (question_array.length)) {
        finish_game();
    }

    else {
        question_setup(question_array[question_num]);
        question_num++;
    };

    interval = setInterval( function() {
        time_remaining--;
        timer.textContent = time_remaining;
        if (time_remaining === 0) {
            finish_game();
            clearInterval(interval);
        }
    }, 1000)
};

// Function that is responsible for displaying the next question in the quiz.
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

// Function called when a question is answered correctly.
function correct() {
    correct_answers++;
    clearInterval(interval);
    feedback.textContent = "Correct!"
    setTimeout(function () {
        feedback.textContent = '';
        if (time_remaining === 0) {
            finish_game();
        }
        else {
            time_remaining--;
            timer.textContent = time_remaining;
        };
    }, 1000)
    next_question();
};

// Function called when a question is answered incorrectly.
function incorrect() {
    clearInterval(interval);
    feedback.textContent = "Wrong!";
    time_remaining -= 10;
    setTimeout(function () {
        feedback.textContent = '';
        if (time_remaining === 0) {
            finish_game();
        }
        else {
        time_remaining--;
        timer.textContent = time_remaining;
        };
    }, 1000)
    next_question();
}

// Function that is called when the game is over (the player has answered all questions or time has reached zero).
function finish_game() {
    clearInterval(interval);
    screen_switcher(".enter-initials");
    if (time_remaining >= 0) {
        score = Math.floor(time_remaining/5) + 14*correct_answers
    }
    else {
        score = "0 (Ran out of time)"
    };
    score_display.textContent = score
}

// Function responsible for changing the display between the beginning screen, the game screen, the initials-entry screen, and the highscores screen.
function screen_switcher(target) {

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

// Function that displays the final score on the page after the game has ended
function write_score() {
    score_display.textContent = score
    score_display.style.fontWeight = 'bold'
}





// MISCELLANEOUS COMPUTATIONAL FUNCTIONS

// A function which chooses a random element from the argument array.
function random_element(arr) {
    var length = arr.length;
    var random_index = Math.floor(length*Math.random());
    return arr[random_index];
};

// A function which randomizes the array [1, 2, 3, 4]. This is used to make randomize the order of the answer choices in each question.
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

// A function which takes in the id of a button and returns to which button the program should point.
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

// This function randomizes the order of the objects in the question_array. It will be called each time the quiz is restarted.
function question_randomizer() {
    var ordered = question_array;
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
    question_array = unordered;
}




// EVENT LISTENERS

// Event listener handling the start button on the beginning screen.
start.addEventListener("click", function() {
    take_quiz();
})

// The following four event listeners are for each of the four answer choice buttons.
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

// Event listener handling the 'view highscores' button in the top left corner.
for (const element of view_highscores) {
    element.addEventListener("click", function() {
        screen_switcher(".highscores");
        clearInterval(interval);
    })
};

// Event listener handling the submission of initials and associated score to the highscores page.
submit_initials.addEventListener("click", function(event) {
    event.preventDefault()
    var new_score = document.createElement('p');
    new_score.textContent = initial_input.value + " - " + score;
    new_score.setAttribute('class', 'stored-score')
    scores_list.appendChild(new_score)
    screen_switcher(".highscores") //Jumps to the high scores page
}
);

// Event listener handling the button to start over on the highscores page.
restart.addEventListener("click", function () { 
    question_randomizer();
    score = 100;
    time_remaining = 75;
    question_num = 0;
    screen_switcher(".begin")
})

// Event listener handling the button to clear the highscores list on the highscores page.
clear_scores.addEventListener("click", function() {
    scores_list.innerHTML = ''
})










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

screen_switcher('.enter-initials')
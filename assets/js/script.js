/*
0: starting view
1: testing view
2: finished view
3: highScore view
*/

var VIEW = 0;


var current_question_id = 0;

var q1 = {
    question: "Commonly used data types DO Not Include:",
    selections: ['strings', 'booleans', 'alerts', 'numbers'],
    answer: 2
};
var q2 = {
    question: "The condition in an if / else statement is enclosed with _________.",
    selections: ['quotes', 'curly brackets', 'parenthesis', 'square brackets'],
    answer: 2
};
var q3 = {
    question: "Arrays in JavaScript can be used to store _________.",
    selections: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
    answer: 3
};
var q4 = {
    question: "String values must be enclosed within _________ when being assigned to variables.",
    selections: ['commas', 'curly brackets', 'quotes', 'parenthesis'],
    answer: 2
};
var q5 = {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    selections: ['JavaScript', 'terminal/bash', 'for loops', 'console.log'],
    answer: 3
};

var questions = [q1, q2, q3, q4, q5]
var checkMarks = new Array(questions.length).fill(-1);
var score = 50;


var mainEl = document.querySelector("main");
var checkMarkEle = document.querySelector("#check-mark");
var scoreEle = document.querySelector("#score");


function changView() {
    switch (VIEW) {
        case 0:
            showStarting();
            break;
        case 1:
            showTesting();
            break;
        case 2:
            showFinished();
            break; 
        case 3:
            showHighScore();
            break;
        default:
            break;
    }
}


function showStarting() {
    scoreEle.innerHTML = 'score: ' + score;
    checkMarkEle.innerHTML = '';
    var titleEle = document.querySelector("#text-title");
    titleEle.textContent = "Coding Quiz Challenge";
    titleEle.classList.add("center");

    var contentEle = document.querySelector("#content");
    contentEle.innerHTML = '';

    var pElement = document.createElement("p");
    pElement.innerHTML = "Try to answer the following code-related questions within the time limit." + 
                         "<br />" + 
                         "Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    pElement.classList.add("center");
    contentEle.appendChild(pElement);

    var clickElement = document.createElement("div");
    clickElement.classList.add("buttom");
    clickElement.classList.add("center");
    clickElement.id = "start";
    clickElement.textContent = "Start Quiz";
    contentEle.appendChild(clickElement);

}

function showTesting() {
    scoreEle.innerHTML = 'score: ' + score;

    var cur_question = questions[current_question_id];

    var titleEle = document.querySelector("#text-title");
    titleEle.textContent = cur_question.question;

    var contentEle = document.querySelector("#content");
    contentEle.innerHTML = '';

    var olElement = document.createElement("ol");
    for (i = 0; i < cur_question.selections.length; i++) {
        var liElement = document.createElement("li");
        liElement.textContent = cur_question.selections[i];
        liElement.classList.add("buttom");
        liElement.classList.add("selection");
        liElement.setAttribute('answer_id', i);
        olElement.appendChild(liElement);
    }
    contentEle.appendChild(olElement);
    showCheckMark();
}


function showFinished() {
    scoreEle.innerHTML = 'score: ' + score;

    var titleEle = document.querySelector("#text-title");
    titleEle.textContent = "All Done!";

    var contentEle = document.querySelector("#content");
    contentEle.innerHTML = '';

    var socreElement = document.createElement("h3");
    socreElement.innerHTML = "Your final score is " + score + ".";
    socreElement.classList.add("center");
    contentEle.appendChild(socreElement);


    showCheckMark();

}

function showHighScore() {
    checkMarkEle.innerHTML = '';
    var titleEle = document.querySelector("#text-title");
    titleEle.textContent = "High Scores";

    var contentEle = document.querySelector("#content");
    contentEle.innerHTML = '';
    
}

function showCheckMark() {
    checkMarkEle.innerHTML = '<span>Progress:</span>';

    var ulElement = document.createElement("ul");
    for (i = 0; i < checkMarks.length; i++) {
        var liElement = document.createElement("li");
        liElement.textContent = 'Q'+(i+1);
        switch (checkMarks[i]) {
            case -1:
                liElement.classList.add("no-answer");
                break;
            case 0:
                liElement.classList.add("wrong");
                break;
            case 1:
                liElement.classList.add("correct");
                break;
            default:
                break;
        }
        ulElement.appendChild(liElement);
    }
    checkMarkEle.appendChild(ulElement);
}




var clickHandler = function (event) {
    // get target element from event
    var targetEl = event.target;
    console.log(targetEl);
  
    if (targetEl.matches("#start")) {
      console.log("start", targetEl);
      current_question_id = 0
      showTesting();
    }
    else if (targetEl.matches(".selection")) {
        var expectedAns = questions[current_question_id].answer.toString();
        var actualAns = targetEl.getAttribute('answer_id')
        if (expectedAns === actualAns) {
            checkMarks[current_question_id] = 1;
            console.log("Correct!");
            score += 10;
        }
        else {
            checkMarks[current_question_id] = 0;
            console.log("Wrong!");
            score -= 10;
        }

        current_question_id ++;
        console.log("selection", current_question_id);

        if (current_question_id == questions.length) {
            current_question_id = 0;
            showFinished();
        }
        else {
            showTesting();
        }
    }
  };


mainEl.addEventListener("click", clickHandler);


showStarting();
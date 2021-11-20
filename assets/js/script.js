/*
0: starting view
1: testing view
2: finished view
3: highScore view
*/

var START = 0;
var TESTING = 1;
var FINISHED = 2;
var SCOREBOARD = 3;

var STATE = START;
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
var score = 100;


var scoreRecord = [];
var temp = localStorage.getItem("scoreRecord");
if (temp) {
    scoreRecord = JSON.parse(temp);
}

var mainEl = document.querySelector("main");
var checkMarkEle = document.querySelector("#check-mark");
var scoreEle = document.querySelector("#score");
var viewScoreEle = document.querySelector("#view-score");


function showStarting() {
    STATE = START;
    scoreEle.innerHTML = 'score: 100';
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
    STATE = TESTING;
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
    STATE = FINISHED;
    scoreEle.innerHTML = 'score: ' + score;
    var titleEle = document.querySelector("#text-title");
    titleEle.textContent = "All Done!";

    var contentEle = document.querySelector("#content");
    contentEle.innerHTML = '';

    var socreElement = document.createElement("h3");
    socreElement.innerHTML = "Your final score is " + score + ".";
    socreElement.classList.add("center");
    contentEle.appendChild(socreElement);

    var askNameElement = document.createElement("div");
    askNameElement.innerHTML = "<h3>Enter initials: </h3>";
    var formElement = document.createElement("form");
    formElement.innerHTML = 
    '<div class="form-group">' + 
        '<input type="text" name="initail" placeholder="Enter Here" />' + 
    '</div>' + 
    '<div class="form-group">' + 
        '<button class="buttom" id="save-name" type="submit">Submit</button>' + 
    '</div>';
    askNameElement.appendChild(formElement);
    askNameElement.classList.add("center");
    contentEle.appendChild(askNameElement);

    showCheckMark();

}

function showHighScore() {
    STATE = SCOREBOARD;
    scoreEle.innerHTML = '';

    checkMarkEle.innerHTML = '';
    var titleEle = document.querySelector("#text-title");
    titleEle.textContent = "High Scores";

    var contentEle = document.querySelector("#content");
    contentEle.innerHTML = '';

    var olElement = document.createElement("ol");
    olElement.classList.add("score-list");
    olElement.classList.add("center");
    for (i = 0; i < scoreRecord.length; i++) {
        var liElement = document.createElement("li");
        liElement.textContent = `${scoreRecord[i][0]} - ${scoreRecord[i][1]}`;
        olElement.appendChild(liElement);
    }
    contentEle.appendChild(olElement);

    var backHomeElement = document.createElement("div");
    backHomeElement.innerHTML = 'Back To Home';


    var clickElements = document.createElement("div");
    clickElements.classList.add("center");

    var clickElement = document.createElement("div");
    clickElement.classList.add("buttom");
    clickElement.classList.add("center");
    clickElement.id = "back";
    clickElement.textContent = "Back To Home";
    clickElements.appendChild(clickElement);

    var clickElement2 = document.createElement("div");
    clickElement2.classList.add("buttom");
    clickElement2.classList.add("center");
    clickElement2.id = "clear";
    clickElement2.textContent = "Clear Record";
    clickElements.appendChild(clickElement2);

    contentEle.appendChild(clickElements);
    
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
        checkMarks = new Array(questions.length).fill(-1);
        countdown();
        showTesting();
    }
    else if (targetEl.matches("#back")) {
        console.log("back", targetEl);
        showStarting();
    }
    else if (targetEl.matches("#clear")) {
        console.log("clear", targetEl);
        scoreRecord = [];
        localStorage.setItem("scoreRecord", JSON.stringify(scoreRecord));
        showHighScore();
    }
    else if (targetEl.matches(".selection")) {
        var expectedAns = questions[current_question_id].answer.toString();
        var actualAns = targetEl.getAttribute('answer_id')
        if (expectedAns === actualAns) {
            checkMarks[current_question_id] = 1;
            console.log("Correct!");
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


var mainFormHandler = function (event) {
  event.preventDefault();
  var name = document.querySelector("input[name='initail']").value;
  saveScore(name);
  showStarting();
}

function saveScore(name) {
    for (let i = 0; i < scoreRecord.length; i++) {
        var ith_score = scoreRecord[i][1];
        if (score > ith_score) {
            scoreRecord.splice(i, 0, [name, score]);
            localStorage.setItem("scoreRecord", JSON.stringify(scoreRecord));
            return;
        }
    }
    scoreRecord.push([name, score]);
    localStorage.setItem("scoreRecord", JSON.stringify(scoreRecord));
}

function countdown() {
    score = 100;
    scoreEle.innerHTML = 'score: ' + score;
    var timeInterval = setInterval(function() {
        if (STATE === TESTING) {
            score--;
            scoreEle.innerHTML = 'score: ' + score;
        }
        else {
            clearInterval(timeInterval);
        }
        if (score === 0 && STATE == TESTING) {
            showFinished();
        }
    }, 1000);
  }


mainEl.addEventListener("click", clickHandler);
mainEl.addEventListener("submit", mainFormHandler);
viewScoreEle.addEventListener("click", showHighScore);

showStarting();
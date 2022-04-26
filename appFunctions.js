//selecting all required elements through classes
const quizBody = document.body;
const toggleButton = document.querySelector(".toggleButton button");
const homeButton = document.querySelector(".hmeButton button");
const vlmButton = document.querySelector(".vlmButton button");
const startButton = document.querySelector(".strtButton button");
const infoBox = document.querySelector(".infoBox");
const exitButton = infoBox.querySelector(".buttons .quitButton");
const continueButton = infoBox.querySelector(".buttons .restartButton");
const quizBox = document.querySelector(".quizBox");
const optionList = document.querySelector(".option_list");
const timerText = document.querySelector(".timer .time_left_text");
const timerCount = document.querySelector(".timer .timer_sec");
const timerLine = document.querySelector("header .timer_line");
const resultsBox = document.querySelector(".resultsBox");
const quizSong = document.getElementById("quizSong");


// action if volume button is selected to adjust setting
toggleButton.addEventListener('click', function(){
    const tog = this.querySelector('i');
    
        if (tog.classList.contains('fa-toggle-off')) {
            tog.classList.remove('fa-toggle-off');
            tog.classList.add('fa-toggle-on');
            quizBody.classList.toggle("dark-mode");
            toggleButton.classList.toggle("dark-mode");
            homeButton.classList.toggle("dark-mode");
            vlmButton.classList.toggle("dark-mode");
         } else {
            tog.classList.remove('fa-toggle-on');
            tog.classList.add('fa-toggle-off');
            quizBody.classList.toggle("dark-mode");
            toggleButton.classList.toggle("dark-mode");
            homeButton.classList.toggle("dark-mode");
            vlmButton.classList.toggle("dark-mode");
      }
    });

// action if volume button is selected to adjust setting
vlmButton.addEventListener('click', function(){
const vol = this.querySelector('i');

    if (vol.classList.contains('fa-volume-high')) {
        vol.classList.remove('fa-volume-high');
        vol.classList.add('fa-volume-xmark');
        quizSong.volume = 0.0;
     } else {
     vol.classList.remove('fa-volume-xmark');
        vol.classList.add('fa-volume-high');
        quizSong.volume = 0.5;
  }
});


// action if home button is clicked, reload the current window
homeButton.onclick = ()=>{
    window.location.reload();
}


// action if startQuiz button is clicked, add info box to the screen
startButton.onclick = ()=>{
    infoBox.classList.add("enabledInfo"); 
    quizSong.volume = 0.5;
    quizSong.play();
}


// action if exitQuiz button is clicked, remove info box from the screen
exitButton.onclick = ()=>{
    infoBox.classList.remove("enabledInfo");
    quizSong.load();
}


// actions if continueQuiz button is clicked
continueButton.onclick = ()=>{
    infoBox.classList.remove("enabledInfo"); //remove info box
    quizBox.classList.add("enabledQuiz"); //add quiz box
    showQuestions(0); //showQuestions function called
    questionCounter(1); //passing parameter of 1 through questionCounter function
    startTimer(30); //startTimer function called
    startTimerLine(0); //startTimerLine function called
    updateInfo(1); //passing parameter of 1 through updateInfo function
}


let counter;
let counterLine;
let queCount = 0;
let queNumb = 1;
let timeValue =  30;
let userScore = 0;
let widthValue = 0;

const restart_quiz = resultsBox.querySelector(".buttons .restartButton");
const quit_quiz = resultsBox.querySelector(".buttons .quitButton");


// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    quizBox.classList.add("enabledQuiz"); 
    resultsBox.classList.remove("enabledResults"); 
    queCount = 0;
    queNumb = 1;
    timeValue = 30; 
    userScore = 0;
    widthValue = 0;
    showQuestions(queCount);
    questionCounter(queNumb); //passing queNumb through questionCounter function
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //passing timeValue through startTimer function
    startTimerLine(widthValue);//passing widthValue through startTimerLine function
    updateInfo(queNumb); //passing queNumb through updateInfo function
    timerText.textContent = "Time Left"; //modifying the text used for timer
    nextButton.classList.remove("show"); //hide the next button
}


// if quitQuiz button is clicked, reload the current window
quit_quiz.onclick = ()=>{
    window.location.reload();
}


const nextButton = document.querySelector("footer .nextButton");
const bottom_questionCounter = document.querySelector("footer .total_questions");


// function used to retrieve questions and options from array (stored in appQuestions)
function showQuestions(index){
    const question = document.querySelector(".question");

    //div and span tags used to concat and present questions and its options by passing the value through an array index
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    question.innerHTML = que_tag; //adding new span tag inside que_tag
    optionList.innerHTML = option_tag; //adding new div tag inside option_tag
    
    const option = optionList.querySelectorAll(".option");

    // applying onclick attribute to all available options of current question
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "selectedOption(this)");
    }
}


// function used to update quiz box title
function updateInfo(que){
    const quizTitle = quizBox.querySelector(".title");
    const QuizButton = quizBox.querySelector(".nextButton");

    if(que <= 5){
        let titleText = 'Level 1: Easy'
        quizTitle.innerHTML = titleText;
    } else if (que >= 6 && que <= 10 ){
        let titleText = 'Level 2: Medium'
        quizTitle.innerHTML = titleText;
    } else {
        let titleText = 'Level 3: Hard'
        quizTitle.innerHTML = titleText;
    }

    if(que == 15){
        let buttonText = 'See Results'
        QuizButton.innerHTML = buttonText;
    } else {
        let buttonText = 'Next'
        QuizButton.innerHTML = buttonText;
    }
}


function questionCounter(index){
    //span tags used to concat and present current question number and total question number to user
   let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
   bottom_questionCounter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_questionCounter
}


// div tags created to display icons on answer presentation, post option select
let correctTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let incorrectTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';


//if user clicked on option
function selectedOption(answer){
    clearInterval(counter); 
    clearInterval(counterLine); 
    let userAns = answer.textContent; //retrieving user selected option
    let correcAns = questions[queCount].answer; //retrieving correct answer from question array
    const allOptions = optionList.children.length; //retrieving all option items
    
    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        answer.classList.add("correct"); //applying green color to correctly selected option
        answer.insertAdjacentHTML("beforeend", correctTag); //applying tick icon to correctly selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{ 
        //applying red color and cross icon to correctly selected option
        answer.classList.add("incorrect"); 
        answer.insertAdjacentHTML("beforeend", incorrectTag);
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(optionList.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer 
                optionList.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                optionList.children[i].insertAdjacentHTML("beforeend", correctTag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        optionList.children[i].classList.add("disabled"); //after choice selection, options are disabled
    }
    nextButton.classList.add("show"); //display the next button after option is selected
}


// if Next Que button clicked
nextButton.onclick = ()=>{
    if(queCount < questions.length - 1){ //if question count is less than total question length
        queCount++; //increment the queCount value
        queNumb++; //increment the queNumb value
        showQuestions(queCount);
        questionCounter(queNumb);
        clearInterval(counter); 
        clearInterval(counterLine); 
        startTimer(timeValue); 
        startTimerLine(widthValue);
        timerText.textContent = "Time Left";
        nextButton.classList.remove("show");
        updateInfo(queNumb);
    }else{
        clearInterval(counter);
        clearInterval(counterLine);
        showResults(); //showResults function called
    }
}


function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timerCount.textContent = time; //changing the value of timerCount with time value
        time--; //decrement the time value
        if(time < 9){ //if timer is less than 9
            let addZero = timerCount.textContent; 
            timerCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if(time < 0){ //if timer is less than 0
            clearInterval(counter);
            timerText.textContent = "Time Off";
            const allOptions = optionList.children.length;
            let correcAns = questions[queCount].answer; //getting correct answer from array
            for(i=0; i < allOptions; i++){
                if(optionList.children[i].textContent == correcAns){ 
                    optionList.children[i].setAttribute("class", "option correct"); 
                    optionList.children[i].insertAdjacentHTML("beforeend", correctTag); 
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                optionList.children[i].classList.add("disabled");
            }
            nextButton.classList.add("show");
        }
    }
}


function startTimerLine(time){
    counterLine = setInterval(timer, 32);
    function timer(){
        time += 1; //upgrading time value with 1
        timerLine.style.width = time + "px"; //increasing width of timerLine with px by time value
        if(time > 945){ //if time value is greater than 945
            clearInterval(counterLine); //clear counterLine
        }
    }
}


function showResults(){
    infoBox.classList.remove("enabledInfo"); 
    quizBox.classList.remove("enabledQuiz"); 
    resultsBox.classList.add("enabledResults");
    const scoreText = resultsBox.querySelector(".score_text");

    let avgScore = Math.round((userScore / questions.length) * 100);

    //span tags used to concat and present user score number, total question and score text to user
    let scoreTag = '<span>Your Fitness IQ Score is <p>'+ userScore+'/'+ questions.length +'</p><p>('+ avgScore +'%)</p></span>';
    scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
}
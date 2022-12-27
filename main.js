let startBtn = document.querySelector(".start_btn button");
let infoBox = document.querySelector(".info_box");
let exitBtn = document.querySelector(".buttons .quit");
let containuBtn = document.querySelector(".buttons .containu");
let quizBox = document.querySelector(".quiz_box");
let nextBtn = document.querySelector(".next_btn");
let optionList = document.querySelector(".option_list");
let timeCount = document.querySelector(".timer_sec");
let timeLine = document.querySelector(".time_line");
let resultBox = document.querySelector(".result_box");
let refreshQuiz = document.querySelector(".buttons .refresh");
let userScore = document.querySelector(".score_text");

let counter;

startBtn.onclick = function(){
    infoBox.classList.add("activeInfo");
}

exitBtn.onclick = function(){
    infoBox.classList.remove("activeInfo");
}
let timeValue = 15;
let questionsCount = 0;
let i = 1
let widthValue = 0;


containuBtn.onclick = function(){
    quizBox.classList.add("activeQuiz");
    infoBox.classList.remove("activeInfo");
    document.querySelector("footer button").classList.add("show");
    queCounter(1);
    showQuestions(0);
    startTime(15);
    startTimeLine(0);
}



nextBtn.onclick = function(){ 
 if(questionsCount < questions.length - 1 ){
    questionsCount++;
    i++
    queCounter(i);
    clearInterval(counter);
    startTime(timeValue);
    clearInterval(counterLine);
    startTimeLine(widthValue);
    showQuestions(questionsCount)
 }else{
    console.log("finish");
    showResultBox();
 }
nextBtn.style.display = "none";

}

function showQuestions(index){
    let questionText = document.querySelector(".que_text");
    let questionTag = "<span>" + questions[index].numb + '.' + "" + questions[index].question+ "</span>";
    let optionTag = ` <div class = "option" ><span>${questions[index].options[0]}</span></div>`
                   + `<div class = "option" ><span>${questions[index].options[1]}</span></div>`
                   + `<div class = "option" ><span>${questions[index].options[2]}</span></div>`
                   + `<div class = "option" ><span>${questions[index].options[3]}</span></div>`;

    questionText.innerHTML = questionTag;
    optionList.innerHTML = optionTag
    
    let option = document.querySelectorAll(".option");
    for ( let i = 0 ; i  < option.length ;  i++) {
        option[i].setAttribute("onclick" , "optionSelected(this)")
        
    }
   
 
}

function queCounter(index){
    let bottomCount = document.querySelector(".total_que");
    let bottomCountTag = `<span><p>${index} of </p>${questions.length} Questions</span>`;
    bottomCount.innerHTML = bottomCountTag;
}

let tickIcon = `<div class = "icon tick"><i class="fa-solid fa-check"></i></div>`;
let crossIcon = `<div class = "icon cross"><i class="fa-solid fa-xmark"></i></div>`;

let userScoree = 0;

function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);

    let userAns = answer.textContent;
    let correctAnswer = questions[questionsCount].answer;
    let allOption = optionList.children.length;


   if(userAns == correctAnswer){
 userScoree = userScoree + 1;
 console.log(userScoree);

 userScore.innerHTML = `<p> and Your Score <span>${userScoree}</span> of ${questions.length}</p>`;

    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend" , tickIcon);
  
}else{

    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend" , crossIcon);

   }
let options = document.querySelectorAll(".option");
options.forEach((option)=>{
    if(option.textContent == correctAnswer){
        option.classList.add("correct");
        option.insertAdjacentHTML("beforeend" , tickIcon)

    }
})

for( let i = 0 ; i < allOption ; i ++){
    optionList.children[i].classList.add("disabled")
}
nextBtn.style.display = "block";
    
}

function startTime(time){
    counter = setInterval(timer , 1000);

    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 0){
            clearInterval(counter);
        timeCount.textContent = "00";
        }
        if(time < 10 ){
        let addZero = timeCount.textContent;
         timeCount.textContent = "0" + addZero;
        }
    }
}


function startTimeLine(time){
    counterLine = setInterval(timer , 29);

    function timer(){
        time += 1 ;
        timeLine.style.width = time + "px";
        if(time > 549){
            clearInterval(counterLine)
        }
       
     
    }
}

function showResultBox(){
    infoBox.classList.remove("activeInfo");
    quizBox.classList.remove("activeQuiz");
    resultBox.classList.add("activeResult");

}

refreshQuiz.onclick = function(){
    window.location.reload();
}

const info_box = document.querySelector(".info_box");
const continue_btn = document.querySelector(".button .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const restart_quiz=document.querySelector(".buttons .retake");
const quit_quiz=document.querySelector(".buttons .quit");
const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");
let timeValue=10;
let que_count=0;
let que_numb=1;
let userScore=0;
let counter;
let counterLine;
let widthValue=0;
info_box.classList.add("activeInfo");
function showQuestions(index){
    const que_text=document.querySelector(".que_text");
    let que_tag='<span>'+questions[index].numb+". "+questions[index].question+'</span>';
    let option_tag='<div class="option"><span>'+questions[index].options[0]+'</span></div>'+'<div class="option"><span>'+questions[index].options[1]+'</span></div>'+'<div class="option"><span>'+questions[index].options[2]+'</span></div>'+'<div class="option"><span>'+questions[index].options[3]+'</span></div>';
    que_text.innerHTML=que_tag;
    option_list.innerHTML=option_tag;
    const option=option_list.querySelectorAll(".option");
    for(i=0;i<option.length;i++){
        option[i].setAttribute("onclick","optionSelected(this)");
    }
}
let tickIconTag='<div class="icon tick"><i class="fasfa-check"></i></div>';
let crossIconTag='<div class="icon cross"><i class="fasfa-times"></i></div>';
function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns=answer.textContent;
    let correcAns=questions[que_count].answer;
    const allOptions=option_list.children.length;
    if(userAns==correcAns){
        userScore+=1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend",tickIconTag);
        console.log("Correct Answer");
        console.log("Your correct answers : " +userScore);
    }
    else{
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend",crossIconTag);
        console.log("Wrong Answer");
        for(i=0;i<allOptions;i++){
            if(option_list.children[i].textContent==correcAns){
                option_list.children[i].setAttribute("class","option correct");
                option_list.children[i].insertAdjacentHTML("beforeend",tickIconTag);
                console.log("Auto selected correct answer");
            }
        }
    }
    for(i=0;i<allOptions;i++){
        option_list.children[i].classList.add("disabled");
    }
    next_btn.classList.add("show");
}
function showResult(){
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText=result_box.querySelector(".score_text");
    if(userScore>3){
        let scoreTag='<span>Congrats! You got <p>'+ userScore +'</p> out of <p>' + questions.length +'</p></span>';
        scoreText.innerHTML=scoreTag;
    }
    else if(userScore>1){
        let scoreTag='<span>Nice! You got <p>'+ userScore +'</p> out of <p>' + questions.length +'</p></span>';
        scoreText.innerHTML=scoreTag;
    }
    else{
        let scoreTag='<span>Sorry! You got only <p>'+ userScore +'</p> out of <p>' + questions.length +'</p></span>';
        scoreText.innerHTML=scoreTag;
    }
}
function startTimer(time){
    function timer(){
        timeCount.textContent=time;
        time--;
        startTimerLine(time);
        if(time<9){
            let addZero=timeCount.textContent;
            timeCount.textContent="0" + addZero;
            startTimerLine(time);
        }
        if(time<0){
            clearInterval(counter);
            timeText.textContent= "Time End";
            const allOptions=option_list.children.length;
            let correcAns=questions[que_count].answer;
            startTimerLine(10)
            for(i=0;i<allOptions;i++){
                if(option_list.children[i].textContent==correcAns){
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend",tickIconTag);
                    console.log("Time off: Auto select correct answer.");
                }
            }
            for(i=0;i<allOptions;i++){
                option_list.children[i].classList.add("disabled");
            }
            next_btn.classList.add("show");
        }
    }
    timer()
    counter=setInterval(timer,1000);
}
function startTimerLine(time){
        
        const total_time = 10;
        if(time <= 9){
            time_line.classList.add("animate")
        }

        if(time === 10){
            time_line.classList.remove("animate")
        }
        const width = (total_time - time) * 100 / (total_time)
        time_line.style.width=width + "%";
}
function queCounter(index){
    let totalQueCountTag='<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML=totalQueCountTag;
}
continue_btn.onclick=()=>{
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);
    queCounter(1);
    startTimerLine(10);
    startTimer(10);
}
restart_quiz.onclick= async()=>{
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    timeValue=10;
    que_count=0;
    que_numb=1;
    userScore=0;
    widthValue=0;
    startTimerLine(10);
    await new Promise(resolve => setTimeout(() => { resolve() }, 200))
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    timeText.textContent="Time Left";
    next_btn.classList.remove("show");
}
quit_quiz.onclick=()=>{
    window.location.reload();
}
next_btn.onclick= async ()=>{
    if(que_count<questions.length - 1){
       que_count++;
       que_numb++;
       startTimerLine(10);
       await new Promise(resolve => setTimeout(() => { resolve() }, 50))
       showQuestions(que_count);
       queCounter(que_numb);
       clearInterval(counter);
       clearInterval(counterLine);
       startTimer(timeValue);
       timeText.textContent="Time Left";
       next_btn.classList.remove("show");
    }
    else{
        clearInterval(counter);
        clearInterval(counterLine);
        showResult();
    }
}
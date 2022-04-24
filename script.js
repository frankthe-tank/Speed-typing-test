const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p");
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
//const first = document.querySelector(".first");

const quotesArr = [
  "Because Mary and Samantha arrived at the bus station before noon, I did not see them at the station.",
  "The president can't change the country on his own. But what can he do? He can give an example.",
  "Few things are harder to put up with than the annoyance of a good example.",
  "I think the greatest way to learn is to learn by someone's example.",
];

var started = false;
var finished=false;
var hr = 0;
var min = 0;
var sec = -1;



//will be used to check and calulate wpm
var time;
//will hold quote to be used later
var currentQuote="yo";

// Add leading zero to numbers 9 or below (purely for aesthetics):

// on page load
function pageLoad(){
  document.getElementById("first").innerHTML=localStorage.getItem('firstlead')||"1. Not scored";
  document.getElementById("second").innerHTML=localStorage.getItem('secondlead')||"2. Not scored";
  document.getElementById("third").innerHTML=localStorage.getItem('thirdlead')||"3. Not scored";
}



//updating quote displayed
function updateQuote() {
  
  if(started==false){
  const randNum = Math.floor(Math.random() * quotesArr.length);
   currentQuote= quotesArr[randNum];
   originText.innerHTML=currentQuote;
  
  
  }

}

// will check if the text entered matches and will change the boarder color accordingly
function processText() {
  //get input
  let input = testArea.value;
  let originTextMatch = currentQuote.substring(0, input.length);
  
  //will change boarder color to green if completed, will also set finished to true, which will stop the timer
  // will then enter the completed function, which will handle the leaderboard
  if(input == currentQuote) {
        testWrapper.style.borderColor = "#429890";
        started=false;
        finished=true;
        completed();
    } 
  //if red then wrong text entered if blue then it is accurate so far
  else {
        if(input == originTextMatch) {
            testWrapper.style.borderColor = "#65CCf3";
        } else {
            testWrapper.style.borderColor = "red";
        }
    }
   
}

// Start the timer:
function timerStart() {
  
  
  let textLength=testArea.value.length;
  
  //will only start the timer hasn't already been started and when the user presses a button
  // will also stop the timer once finished
  if (started == false && textLength===0 && finished==false) {
    started=true
    start();
    
  }
}

function start() {
  if (started == true) {
    sec = parseInt(sec);
    min = parseInt(min);
    hr = parseInt(hr);

    sec = sec + 1;

    if (sec == 99) {
      min = min + 1;
      sec = 0;
    }
    if (min == 60) {
      hr = hr + 1;
      min = 0;
      sec = 0;
    }

    if (sec < 10 || sec == 0) {
      sec = "0" + sec;
    }
    if (min < 10 || min == 0) {
      min = "0" + min;
    }
    if (hr < 10 || hr == 0) {
      hr = "0" + hr;
    }

    theTimer.innerHTML = hr + ":" + min + ":" + sec;
    if ((started = true)) setTimeout("start()", 9.75);
  } else return;
}

//when user completes the text we will check if they landed on the leaderboard and add them if nessesary 
function completed(){
  const elementText = theTimer.innerHTML;
  time = elementText.split(':').map(Number);
  
  //if first isn't taken
  if(document.getElementById("first").innerHTML=="1. Not scored"){
    document.getElementById("first").innerHTML = "1. "+elementText;
    //local storage
    localStorage.setItem('firstlead', document.getElementById("first").innerHTML);
    
    return;
  }
  
  //if second space isn't taken
  else if (document.getElementById("first").innerHTML!="1. Not scored" && document.getElementById("second").innerHTML=="2. Not scored"){
    var curFirstPlace= document.getElementById("first").innerHTML.replace('1. ','');
    if(elementText<curFirstPlace){
      document.getElementById("first").innerHTML = "1. "+elementText;
      document.getElementById("second").innerHTML = "2. "+curFirstPlace;
      //to local storage
      localStorage.setItem('firstlead', document.getElementById("first").innerHTML);
      localStorage.setItem('secondlead', document.getElementById("second").innerHTML);
      return;
    }
    else if(elementText>curFirstPlace){
      
      document.getElementById("second").innerHTML = "2. "+elementText;
      //to local storage
      localStorage.setItem('secondlead', document.getElementById("second").innerHTML);
      return;
    }
  }//end
  
  //if third space isn't taken
  else if (document.getElementById("first").innerHTML!="1. Not scored" && document.getElementById("second").innerHTML!="2. Not scored" && document.getElementById("third").innerHTML=="3. Not scored"){
    var curFirstPlace= document.getElementById("first").innerHTML.replace('1. ','');
    var curSecondPlace= document.getElementById("second").innerHTML.replace('2. ','');
    if(elementText<curFirstPlace){
      document.getElementById("first").innerHTML = "1. "+elementText;
      document.getElementById("second").innerHTML = "2. "+curFirstPlace;
      document.getElementById("third").innerHTML = "3. "+curSecondPlace;
      
      //to local storage
      localStorage.setItem('firstlead', document.getElementById("first").innerHTML);
      localStorage.setItem('secondlead', document.getElementById("second").innerHTML);
      localStorage.setItem('thirdlead', document.getElementById("third").innerHTML);
      
      return;
    }
    else if(elementText>curFirstPlace){
      
      if(elementText<curSecondPlace){
      document.getElementById("second").innerHTML = "2. "+elementText;
      document.getElementById("third").innerHTML = "3. "+curSecondPlace;
        
      //local storage
      localStorage.setItem('secondlead', document.getElementById("second").innerHTML);
      localStorage.setItem('thirdlead', document.getElementById("third").innerHTML);
      return;
      }
      else if(elementText>curSecondPlace){
      
      document.getElementById("third").innerHTML = "3. "+elementText;
        
        //to local
        localStorage.setItem('thirdlead', document.getElementById("third").innerHTML);
      return;
      }
    }
    
  }//end
  
  //if all spaces taken
  else if (document.getElementById("first").innerHTML!="1. Not scored" && document.getElementById("second").innerHTML!="2. Not scored" && document.getElementById("third").innerHTML!="3. Not scored"){
    //getting placements on leaderboard
    var curFirstPlace= document.getElementById("first").innerHTML.replace('1. ','');
    var curSecondPlace= document.getElementById("second").innerHTML.replace('2. ','');
    var curThirdPlace= document.getElementById("third").innerHTML.replace('3. ','');
    
    if(elementText<curFirstPlace){
      document.getElementById("first").innerHTML = "1. "+elementText;
      document.getElementById("second").innerHTML = "2. "+curFirstPlace;
      document.getElementById("third").innerHTML = "3. "+curSecondPlace;
      
      //to local
      localStorage.setItem('firstlead', document.getElementById("first").innerHTML);
      localStorage.setItem('secondlead', document.getElementById("second").innerHTML);
      localStorage.setItem('thirdlead', document.getElementById("third").innerHTML);
      return;
    }
    else if(elementText>curFirstPlace){
      
      if(elementText<curSecondPlace){
        document.getElementById("second").innerHTML = "2. "+elementText;
        document.getElementById("third").innerHTML = "3. "+curSecondPlace;
        
        //To local
        localStorage.setItem('secondlead', document.getElementById("second").innerHTML);
      localStorage.setItem('thirdlead', document.getElementById("third").innerHTML);
        return;
      }
      else if(elementText<curThirdPlace){   
        document.getElementById("third").innerHTML = "3. "+elementText;
        //to local
        localStorage.setItem('thirdlead', document.getElementById("third").innerHTML);
      
        return;
      }
      else if(elementText>curThirdPlace){      
        return;
      }
    }//end
    
  }
    
}// end of completed

// Reset everything:
function reset() {
  theTimer.innerHTML = "00:00:00";
  started = false;
  finished=false;
  hr = 0;
  sec = 0;
  min = 0;
  time=[0,0,0];
  
  document.getElementById("test-area").value = "";
  testWrapper.style.borderColor = "gray";
  originText.innerHTML =
    "Quote to copy will show up here. Once you click on the text box the timer will immediately start.";
  currentQuote = "";
}

//calculate wpm


// Event listeners for keyboard input and the reset button:
resetButton.addEventListener("click", reset);
testArea.addEventListener("keydown", timerStart);
testArea.addEventListener("focus", updateQuote);
testArea.addEventListener("keyup", processText);

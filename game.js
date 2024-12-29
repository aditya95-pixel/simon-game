var gamePattern=[];
var buttonColours=["red","blue","green","yellow"];
var userClickedPattern=[];
var start=false;
var level=0;
function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){$("#"+currentColour).removeClass("pressed");},100);
}
$(".btn").click(function(event){
    var userChosenColour=event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
function nextSequence(){
    level++;
    $("h1").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
$(document).keydown(function(){
    if(!start){
        $("h1").text("Level "+level);
        nextSequence();
        start=true;
    }
});
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
    {
        if(userClickedPattern.length===gamePattern.length){
            userClickedPattern=[];
            setTimeout(nextSequence,1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over");},200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
function startOver(){
    level=0;
    gamePattern=[];
    userClickedPattern=[];
    start=false;
}

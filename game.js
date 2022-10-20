  var buttonColors =["red","blue","green","yellow"];
  var gamePattern =[];
  var userClickedPattern=[];
  var started = false;
  var level=0;
  $(document).keydown(function(){
    if(!started){
      $("#level-title").text("level "+level);
      newSequence();
      started = true;

    }
  });
  $(".btn").click(function(){
    var userChosenColor =$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
  });
  function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {
      console.log("success");
      if(userClickedPattern.length === gamePattern.length)
      {
        setTimeout(function(){
          newSequence();
        },1000);
      }
    }
    else{

      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart.");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      StartOver();

    }


  }
function newSequence()
{
  userClickedPattern=[];
  level ++;
  $("#level-title").text("level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor= buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#"+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

}
function playSound(name){

  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animatePress(currentColor){
  $("#"+ currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+ currentColor).removeClass("pressed");
  }, 100);
}
function StartOver(){
  level=0;
  started=false;
  gamePattern=[];
}

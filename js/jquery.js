$(document).ready(function() {

//user cards slide in based on click count
    var clickCount = 0
      $("#user-btn-hit").click(function(){
          clickCount++;
          if(clickCount == 1) {
            $(".card1").addClass("move-left");
            $(".card2").addClass("move-left");
            $(".hit-card1-test").removeClass("hidden");
            $(".hit-card1-test").addClass("show-player");
            console.log(clickCount, "clickCount");
          } else if(clickCount == 2){
            $(".hit-card2-test").removeClass("hidden");
            $(".hit-card2-test").addClass("show-player");
            console.log(clickCount, "clickCount");

          } else if(clickCount == 3){
            $(".hit-card3-test").removeClass("hidden");
            $(".hit-card3-test").addClass("show-player");
            console.log(clickCount, "clickCount");

          } else if(clickCount == 4){
            $(".hit-card4-test").removeClass("hidden");
            $(".hit-card4-test").addClass("show-player");
            console.log(clickCount, "clickCount");

          } else if(clickCount == 5){
            $(".hit-card5-test").removeClass("hidden");
            $(".hit-card6-test").addClass("show-player");
            clickCount = 0;
          }
      })

      $("#user-btn-stand").click(function(){
        clickCount = 0;
      })


      //show how to play popup
  $(".how-to-play-btn").on("click", function(){
    $(".how-to-play-info").slideToggle(800);
  })
//close how to play popup
  $(".rules-btn").on("click", function(){
    $(".how-to-play-info").slideToggle(800);
  })


})//end jQuery doc

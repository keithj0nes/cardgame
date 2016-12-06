$(document).ready(function() {

//user cards slide in based on click count
    var clickCount = 0
      $("#user-btn-hit").click(function(){
        clickCount++;
        if(clickCount == 1) {
          $(".card1").addClass("move-left");
          $(".card2").addClass("move-left");
          $(".player-hit-card1").removeClass("hidden");
          $(".player-hit-card1").addClass("show-player");
          console.log(clickCount, "clickCount");
        } else if(clickCount == 2){
          $(".player-hit-card2").removeClass("hidden");
          $(".player-hit-card2").addClass("show-player");
          console.log(clickCount, "clickCount");

        } else if(clickCount == 3){
          $(".player-hit-card3").removeClass("hidden");
          $(".player-hit-card3").addClass("show-player");
          console.log(clickCount, "clickCount");

        } else if(clickCount == 4){
          $(".player-hit-card4").removeClass("hidden");
          $(".player-hit-card4").addClass("show-player");
          console.log(clickCount, "clickCount");

        } else if(clickCount == 5){
          $(".player-hit-card5").removeClass("hidden");
          $(".player-hit-card6").addClass("show-player");
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

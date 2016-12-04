$(document).ready(function() {

//1st click - user card slides over and hit card appears
  $("#user-btn-hit").on("click", function(){
    $(".card1").addClass("move-left");
    $(".card2").addClass("move-left");
    $(".hit-card1-test").addClass("show-player");
  })

//2nd click - 2nd hit card appears
  $("#user-btn-hit").one("click",function() {
      $(this).click(function() {
         $(".hit-card2-test").addClass("show-player");
      });
  });

//3rd click - 3rd hit card appears
  $("#user-btn-hit").one("click",function() {
      $(this).one("click", function(){
        $(this).click(function() {
           $(".hit-card3-test").addClass("show-player");
        });
      })
  });

//4th click - 4th hit card appears
  $("#user-btn-hit").one("click",function() {
      $(this).one("click", function(){
        $(this).one("click", function(){
          $(this).click(function() {
             $(".hit-card4-test").addClass("show-player");
          });
        })
      })
  });

//5th click - 5th hit card appears
  $("#user-btn-hit").one("click",function() {
      $(this).one("click", function(){
        $(this).one("click", function(){
          $(this).one("click", function(){
            $(this).click(function() {
               $(".hit-card5-test").addClass("show-player");
            });
          })
        })
      })
  });

//how to play popup
  $(".how-to-play-box").on("click", function(){
    $(".how-to-play-info").slideToggle(800);
  })
//close how to play popup
  $(".rulez").on("click", function(){
    $(".how-to-play-info").slideToggle(800);
  })

}) //end jquery doc

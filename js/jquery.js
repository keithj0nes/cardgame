$(document).ready(function() {

//1st click - user card slides over and hit card appears

  $("#user-btn-hit").on("click", function(){
    $(".card1").addClass("move");
    $(".card2").addClass("move");
    $(".hit-card1-test").addClass("show");
    // $(".hit-card2-test").addClass("hidden");
  })


//2nd click - 2nd hit card appears

$("#user-btn-hit").one("click",function() {
    $(this).click(function() {
       $(".hit-card2-test").addClass("show");
      //  $(".hit-card1-test").css("margin-left", "-=10px");
          // $(".hit-card1-test").animate({left: "-=20"}, 1000)
    });
});

//3rd click - 3rd hit card appears

$("#user-btn-hit").one("click",function() {
    $(this).one("click", function(){
      $(this).click(function() {
         $(".hit-card3-test").addClass("show");
        //  $(".hit-card1-test").animate({left: "-=20"}, 1000)
        //  $(".hit-card2-test").animate({left: "-=20"}, 1000)
      });
    })
});


$("#user-btn-hit").one("click",function() {
    $(this).one("click", function(){
      $(this).one("click", function(){
        $(this).click(function() {
           $(".hit-card4-test").addClass("show");
        });
      })
    })
});


$("#user-btn-hit").one("click",function() {
    $(this).one("click", function(){
      $(this).one("click", function(){
        $(this).one("click", function(){
          $(this).click(function() {
             $(".hit-card5-test").addClass("show");
          });
        })
      })
    })
});

//reset scores to 0

  $(".reset-scores-btn").on("click", function(){
    $(".scorez").html(0);
  })




}) //end jquery doc

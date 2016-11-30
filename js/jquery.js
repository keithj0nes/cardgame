$(document).ready(function() {


// swal({
//   title: "Black Jack!",
//   text: "Enter Your Name",
//   type: "input",
//   confirmButtonText: "Play!",
//   closeOnConfirm: false,
//   confirmButtonColor: "#0f631d",
//   inputPlaceholder: "Your Name"
// }, function(inputValue){
//   if (inputValue === "") {
//     swal.showInputError("You need to write something!");
//     return false
//   }
  // swal({
  //   closeOnConfirm: true,
  //   confirmButtonColor: "#0f631d"
  //     });
// });

//1st click - user card slides over and hit card appears

  $("#user-btn-hit").on("click", function(){
    $(".card1").addClass("move-left");
    $(".card2").addClass("move-left");
    $(".hit-card1-test").addClass("show-player");
    // $(".hit-card2-test").addClass("hidden");
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

//reset scores to 0

  $(".reset-scores-btn").on("click", function(){
    $(".scorez").html(0);
  })

  // DEALER //
  // var flip = $(".dealer-card2").flip()
  // function flipFunc(){
  //   $(".dealer-card2").flip()
  // }

//DEALER 1st click - user card slides over and hit card appears
  ///////// change user-btn-stand ////////
  $("#user-btn-stand").on("click", function(){
    // $(".dealer-card1").addClass("move-right");
    // $(".dealer-card2").addClass("move-right");
    // $(".dealer-hit-card1-test").addClass("show-dealer");
    // $(".hit-card2-test").addClass("hidden");
  })

  //DEALER 2nd click - 2nd hit card appears

    $("#user-btn-stand").one("click",function() {
        // $(this).click(function() {
        //    $(".dealer-hit-card2-test").addClass("show-dealer");
        // });
    });
    //DEALER 3rd click - 3rd hit card appears

      $("#user-btn-stand").one("click",function() {
          // $(this).one("click", function(){
          //   $(this).click(function() {
          //      $(".dealer-hit-card3-test").addClass("show-dealer");
          //   });
          // })
      });

    //DEALER 4th click - 4th hit card appears

      $("#user-btn-stand").one("click",function() {
          // $(this).one("click", function(){
          //   $(this).one("click", function(){
          //     $(this).click(function() {
          //        $(".dealer-hit-card4-test").addClass("show-dealer");
          //     });
          //   })
          // })
      });

    //DEALER 5th click - 5th hit card appears

      $("#user-btn-stand").one("click",function() {
          // $(this).one("click", function(){
          //   $(this).one("click", function(){
          //     $(this).one("click", function(){
          //       $(this).click(function() {
          //          $(".dealer-hit-card5-test").addClass("show-dealer");
          //       });
          //     })
          //   })
          // })
      });



      // $(".how-to-play-box").hover(function(){
      //   $(".how-to-play-info").animate({
      //     width: "200px",
      //     // marginRight: "100px"
      //   },1000)
      // })

      $(".how-to-play-box").on("click", function(){
        $(".how-to-play-info").slideToggle(500);
      // }, function(){
      //   $(".how-to-play-info").slideToggle();
      })

      $(".rulez").on("click", function(){
        $(".how-to-play-info").slideToggle();
      })


      // $(".how-to-play-box").on("hover", function(){
      //   $(".how-to-play-info").toggleClass("showrules");
      //
      // })


      // $(".how-to-play-box").on("click", function(){
      //   $(".how-to-play").addClass(".how-to-play-info");
      //   // $(".hit-card2-test").addClass("hidden");
      // })



}) //end jquery doc

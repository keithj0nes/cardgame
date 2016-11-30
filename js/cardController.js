angular.module("gameApp").controller("mainController", function($scope, mainService){


mainService.getCards().then(function(dataFromService){
  $scope.getCards = dataFromService;
  mainService.startCards().then(function(dataFromService){
    $scope.startCards = dataFromService;

    jQuery(".dealer-card2").flip({
      trigger: "manual"
    });

    var acePresentPlayer = false;
    var acePresentDealer = false;
    $scope.playerWins = 0;
    $scope.dealerWins = 0;

//set kings/queens/jacks to value of 10
//set ace to value of 11
    for(var i = 0; i < $scope.startCards.length; i++){
      if($scope.startCards[i].value === 'KING' || $scope.startCards[i].value === 'QUEEN' || $scope.startCards[i].value === 'JACK'){
        $scope.startCards[i].value = 10;
      }
      if($scope.startCards[i].value === 'ACE'){
        $scope.startCards[i].value = 11;
        $scope.startCards[i].type = "ace";
      }
    }

//create player and dealer hands that contain objects of cards
    $scope.playersHand = [];
    $scope.dealersHand = [];

    console.log($scope.startCards[0].value + " - value of first player card")
    console.log($scope.startCards[1].value + " - value of second player card")
    console.log($scope.startCards[2].value + " - value of first dealer card")
    console.log($scope.startCards[3].value + " - value of second dealer card")

//set starting cards in view on load
    $scope.playersHand.push($scope.startCards[0], $scope.startCards[1]);
    $scope.dealersHand.push($scope.startCards[2], $scope.startCards[3]);

//if both start cards are 11, set first card to 1
    if($scope.playersHand[0].value === 11 && $scope.playersHand[1].value === 11){
      $scope.playersHand[0].value = 1;
    }
    if($scope.dealersHand[0].value === 11 && $scope.dealersHand[1].value === 11){
      $scope.dealersHand[1].value = 1;
    }

//loop through playersHand array to check if ace is present
    for(var i = 0; i < $scope.playersHand.length; i++){
      if($scope.playersHand[i].value === 11){
        acePresentPlayer = true;
      }
    }


    // $scope.acePresentFunc = function(array){
    //   for(var i = 0; i < array.length; i++){
    //
    //   }
    // }

//create function to set ace value to 1 if ace is present and score is over 11
    // $scope.aceValueFuncPlayer = function(){
    //   for(var i = 0; i < $scope.playersHand.length; i++){
    //     if(acePresentPlayer === true && $scope.playerScore > 11 && $scope.playersHand[i].value === 11) {
    //       $scope.playersHand[i].value = 1;
    //     }
    //   }
    // }

//loop through dealersHand array to check if ace is present
    for( var i = 0; i < $scope.dealersHand.length; i++){
      if($scope.dealersHand[i].value === 11){
        acePresentDealer = true;
      }
    }

//create function to set ace value to 1 if ace is present and score is over 11
    // $scope.aceValueFuncDealer = function(){
    //   for(var i = 0; i < $scope.dealersHand.length; i++){
    //     if(acePresentDealer === true && $scope.dealerScore > 11 && $scope.dealersHand[i].value === 11) {
    //       $scope.dealersHand[i].value = 1;
    //     }
    //   }
    // }

//set playerScore when loaded
    // var initialPlayerScore = parseInt($scope.playersHand[0].value) + parseInt($scope.playersHand[1].value);
    // $scope.playerScore = initialPlayerScore;

//set dealerScore when loaded
    var initialDealerScore = parseInt($scope.dealersHand[0].value) + parseInt($scope.dealersHand[1].value);
    $scope.dealerScore = parseInt($scope.dealersHand[0].value);
    // $scope.dealerScore = initialDealerScore;



    // $scope.aceValueFunc();

    // console.log($scope.playerScore);

//add player's score up
    // $scope.addPlayerScore = function(){
    //   $scope.playerScore = 0;
    //   for(var i = 0; i < $scope.playersHand.length; i++){
    //     console.log($scope.playersHand[i].value);
    //     $scope.playerScore += parseInt($scope.playersHand[i].value);
    //   }
    // }


    $scope.compareScores = function(){
        console.log("compareScores running");
      if($scope.dealerScore > 21){
        console.log("dealers busts you win");
        swal("Dealer busts, you win!");
      } else if($scope.dealerScore > $scope.playerScore){
        swal("Dealer Wins!");
      }else if($scope.dealerScore === $scope.playerScore){
        swal("You and the dealer got the same score.. PUSH!")
      }
    }


    $scope.trialAdd = function(array){
      var score = 0;
      for(var i = 0; i < array.length; i++){
        console.log(array[i].value);
        score += parseInt(array[i].value);
      }
      console.log('dto',score);
      return score;
    };

      console.log('dto2',$scope.playersHand);

      $scope.playerScore = $scope.trialAdd($scope.playersHand);

      if ($scope.playerScore == 21){
        swal("BLACKJACK!!", "You got 21 dealt to you!<br> click Stand to see dealer's score")

        // if playerScore == 21 on deal, run dealer turn
      }

      $scope.compareScores = function(){
          console.log("compareScores running");
        if($scope.dealerScore > 21){
          console.log("dealers busts you win");
          swal("Dealer busts, you win!");
        } else if($scope.dealerScore > $scope.playerScore){
          swal("Dealer Wins!");
        }else if($scope.dealerScore === $scope.playerScore){
          swal("You and the dealer got the same score.. PUSH!")
        }
      }




    // $scope.addDealerScore = function(){
    //   $scope.dealerScore = 0;
    //   for(var i = 0; i < $scope.dealersHand.length; i++){
    //     console.log($scope.dealersHand[i].value + " inside dealersHand")
    //     $scope.dealerScore += parseInt($scope.dealersHand[i].value);
    //   }
    // }

    console.log(acePresentPlayer + " player ace");
    console.log(acePresentDealer + " dealer ace");

    console.log($scope.dealerScore + " dealer score");


    $scope.dealerRun = function() {

      if($scope.dealerScore < 16){
        $scope.dealerHit()
        console.log($scope.dealerScore, "HEY GUYS");
        $scope.dealerScore = $scope.trialAdd($scope.dealersHand);
        console.log($scope.dealerScore + "dealer hit one");
          jQuery(".dealer-card1").addClass("move-right");
          jQuery(".dealer-card2").addClass("move-right");
          jQuery(".dealer-hit-card1-test").addClass("show-dealer");
        console.log($scope.dealerScore + " inside dealerRun function");
        // $scope.compareScores();


//run 2nd hit card
        setTimeout(function(){
          if($scope.dealerScore < 17){
            $scope.dealerHit()
            console.log($scope.dealerScore, "heY pArT 2");
            $scope.dealerScore = $scope.trialAdd($scope.dealersHand);
            jQuery(".dealer-hit-card2-test").addClass("show-dealer");
            // $scope.compareScores();

//run 3rd hit card
            setTimeout(function(){
              if($scope.dealerScore < 17){
              $scope.dealerHit()
              console.log($scope.dealerScore, "heY pArT 2")
              $scope.dealerScore = $scope.trialAdd($scope.dealersHand);
              jQuery(".dealer-hit-card3-test").addClass("show-dealer");
              // $scope.compareScores();

//run 4th hit card
              setTimeout(function(){
                if($scope.dealerScore < 17){
                  $scope.dealerHit()
                  $scope.dealerScore = $scope.trialAdd($scope.dealersHand);
                  jQuery(".dealer-hit-card4-test").addClass("show-dealer");
                  // $scope.compareScores();

//run 5th hit card
                  setTimeout(function(){
                    if($scope.dealerScore < 17){
                      $scope.dealerHit()
                      $scope.dealerScore = $scope.trialAdd($scope.dealersHand);
                      jQuery(".dealer-hit-card5-test").addClass("show-dealer");
                      // $scope.compareScores();

                    }//$scope.compareScores();
                  },2000) //end 5th hit card
                }///$scope.compareScores();
              },2000) //end 4th hit card
            }//$scope.compareScores();
          },2000) //end 3rd hit card
        }//$scope.compareScores();
      },2000) //end 2nd hit card

                    // while($scope.dealerScore < 17){
                    //
                    //   $scope.dealerHit()
                    //   $scope.dealerScore = $scope.trialAdd($scope.dealersHand);
                    //   console.log($scope.dealerScore + "dealer hit one");
                    //     jQuery(".dealer-card1").addClass("move-right");
                    //     jQuery(".dealer-card2").addClass("move-right");
                    //     jQuery(".dealer-hit-card1-test").addClass("show-dealer");
                    //   console.log($scope.dealerScore + " inside dealerRun function");
                    //
                    // }







        }
      // }                    $scope.compareScores();

    }



    $scope.stand = function(){

      // setTimeout(function() {
          jQuery(".dealer-card2").flip(true);
          // console.log("sterling has a small pepe");
          $scope.dealerScore = $scope.trialAdd($scope.dealersHand);
          // setTimeout(function(){
            // $scope.dealerScore = initialDealerScore;
            // $scope.dealerScore = $scope.trialAdd($scope.dealersHand);
            // console.log($scope.dealerScore, " here is a console log");
          // }, 500 )
      // }, 500);

      console.log("stand was clicked");

        //disable hit and stand buttons when stand is clicked
        $scope.disableHit = true;
        $scope.disableStand = true;

        setTimeout($scope.dealerRun,1500);

      }

      $scope.addDealerScore = function(){
        $scope.dealerScore = 0;
        for(var i = 0; i < $scope.dealersHand.length; i++){
          console.log($scope.dealersHand[i].value + " inside dealersHand")
          $scope.dealerScore += parseInt($scope.dealersHand[i].value);
        }
      }

//show random card on player hit
    $scope.playerHit = function(){
      mainService.drawOne().then(function(dataFromService){
        $scope.drawOne = dataFromService;

//set kings/queens/jacks to value of 10 on hit card
//set ace to value of 11 on hit card
          if($scope.drawOne.value === 'KING' || $scope.drawOne.value === 'QUEEN' || $scope.drawOne.value === 'JACK'){
            $scope.drawOne.value = 10;
            console.log($scope.drawOne.value);
          }
          if($scope.drawOne.value === 'ACE'){
            $scope.drawOne.value = 11;
            acePresentPlayer = true;
          }




        console.log($scope.drawOne.value + " - value of hit card")



          $scope.playersHand.push($scope.drawOne);
          console.log($scope.playersHand);

          // $scope.aceValueFuncPlayer();
          // $scope.addPlayerScore
          if(acePresentPlayer === true && $scope.playerScore > 11 && $scope.drawOne.value === 11) {
            $scope.drawOne.value = 1;
          }

          $scope.playerScore = $scope.trialAdd($scope.playersHand)


          console.log($scope.playerScore + " player score");


          if($scope.playerScore == 21){
            setTimeout(function() {
              swal("You hit 21!", "Click Stand to see if you beat the dealer");
            }, 500);``
          } else if ($scope.playerScore > 21){
            $scope.dealerWins++ //if player busts, dealerWins score goes up
            var difference = $scope.playerScore - 21;

            setTimeout(function() {
              // swal("Your score is " + $scope.playerScore + ", you bust!");
              swal({
                title: "You scored " + difference + " over 21 \n You bust!",
                text: "Click OK for new game"
              // }, function(){
              //   //new game function goes here
              });
            }, 500);
          }

          console.log(acePresentPlayer + " player hit");
          // console.log(acePresentDealer);

//disable buttons if playerScore is over 21
          if($scope.playerScore >= 21){
            $scope.disableHit = true;
          }
          if($scope.playerScore > 21){
            $scope.disableStand = true;
          }
          //to do

          //dealer: show value of first card until STAND is clicked, then show both

          //player: if ace is dealt and score > 21, ace = 1
          //player: if player hits "STAND", run dealer function (need to build)

      })
    } //end player hit




//show random card on dealer hit
    $scope.dealerHit = function(){
      mainService.drawOne().then(function(dataFromService){
        $scope.drawOneD = dataFromService;

        console.log("dealer hit working if less than 17");

//set kings/queens/jacks to value of 10 on hit card
//set ace to value of 11 on hit card
        if($scope.drawOneD.value === 'KING' || $scope.drawOneD.value === 'QUEEN' || $scope.drawOneD.value === 'JACK'){
          $scope.drawOneD.value = 10;
          console.log($scope.drawOneD.value);
        }
        if($scope.drawOneD.value === 'ACE'){
          $scope.drawOneD.value = 11;
          acePresentDealer = true;
        }
        // console.log($scope.drawOneD.value + " - value of dealer hit card")

        $scope.dealersHand.push($scope.drawOneD);
        console.log($scope.dealersHand, "from dealerHit function");

        // $scope.aceValueFuncDealer();
        if(acePresentDealer === true && $scope.dealerScore > 11 && $scope.drawOneD.value === 11) {
          $scope.drawOneD.value = 1;
        }
        // setTimeout($scope.addDealerScore(), 500);
        $scope.dealerScore = $scope.trialAdd($scope.dealersHand);

        // $scope.addDealerScore();
        // console.log($scope.dealerScore + " dealer score");


      })
    } //end dealer hit
  })
})


})

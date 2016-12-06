angular.module("gameApp").controller("mainController", function($scope, mainService){

//set scores to zero
  $scope.resetScores = function(){
    $scope.playerWins = 0;
    $scope.dealerWins = 0;
  }
  $scope.resetScores();

//login popup on start
  setTimeout(function(){
    swal({
      title: "Welcome to BlackJack!",
      text: "Type your name:",
      type: "input",
      closeOnConfirm: true,
      // animation: "slide-from-top",
      inputPlaceholder: "Your Name"
    },
    function(inputValue){
      if (inputValue === false) return false;
      if (inputValue === "") {
        swal.showInputError("You need to write something!");
        return false
      }
      $scope.userName = inputValue;

      if(!$scope.getUserStats(inputValue)){
        $scope.setUserStats(inputValue, $scope.playerWins, $scope.dealerWins);
      } else {
        $scope.getUserStats(inputValue);
      }
  // $scope.getUserStats(inputValue);
  // $scope.setUsers(inputValue, $scope.playerWins, $scope.dealerWins)
        $scope.$digest(); //refreshes dom
      // swal("Nice!", "You wrote: " + inputValue, "success");
    });
  }, 500)



console.log(localStorage);






  mainService.getCards().then(function(dataFromService){
    $scope.getCards = dataFromService;
    function mainGame(){
      mainService.startCards().then(function(dataFromService){

        if(dataFromService.remaining < 5){
          console.log("getting new deckId from api")
          mainService.getCards();
        }
//set 4 start cards from service
        $scope.startCards = dataFromService.cards;

        jQuery(".dealer-card2").flip({
          trigger: "manual"
        });

        var acePresentPlayer = false;
        var acePresentDealer = false;

//create player and dealer hands that contain objects of cards
        $scope.playersHand = [];
        $scope.dealersHand = [];

//set kings/queens/jacks to value of 10
        for(var i = 0; i < $scope.startCards.length; i++){
          if($scope.startCards[i].value === 'KING' || $scope.startCards[i].value === 'QUEEN' || $scope.startCards[i].value === 'JACK'){
            $scope.startCards[i].value = 10;
          }
//set ace to value of 11
          if($scope.startCards[i].value === 'ACE'){
            $scope.startCards[i].value = 11;
            $scope.startCards[i].type = "ace";
          }
        }

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

//create function to set ace value to 1 if ace is present and score is over 11
        $scope.aceValueFuncPlayer = function(){
          for(var i = 0; i < $scope.playersHand.length; i++){
            if(acePresentPlayer === true && $scope.playerScore > 11 && $scope.playersHand[i].value === 11) {
              $scope.playersHand[i].value = 1;
            }
          }
        }

//loop through dealersHand array to check if ace is present
        for( var i = 0; i < $scope.dealersHand.length; i++){
          if($scope.dealersHand[i].value === 11){
            acePresentDealer = true;
          }
        }

//create function to set ace value to 1 if ace is present and score is over 11
        $scope.aceValueFuncDealer = function(){
          for(var i = 0; i < $scope.dealersHand.length; i++){
            if(acePresentDealer === true && $scope.dealerScore > 11 && $scope.dealersHand[i].value === 11) {
              $scope.dealersHand[i].value = 1;
            }
          }
        }

//set dealerScore when loaded
        $scope.dealerScore = parseInt($scope.dealersHand[0].value);

//reset game to original state
        $scope.resetGame = function(){
          $scope.dealersHand = [];
          $scope.playersHand = [];
          $scope.dealerScore = 0;
          $scope.playerScore = 0;
          $scope.disableHit = false;
          $scope.disableStand = false;
          jQuery(".dealer-card2").flip(false);

          jQuery(".dealer-hit-card1").addClass("hidden");
          jQuery(".dealer-hit-card1").removeClass("show-dealer");
          jQuery(".dealer-hit-card2").addClass("hidden");
          jQuery(".dealer-hit-card2").removeClass("show-dealer");
          jQuery(".dealer-hit-card3").addClass("hidden");
          jQuery(".dealer-hit-card3").removeClass("show-dealer");
          jQuery(".dealer-hit-card4").addClass("hidden");
          jQuery(".dealer-hit-card4").removeClass("show-dealer");
          jQuery(".dealer-hit-card5").addClass("hidden");
          jQuery(".dealer-hit-card5").removeClass("show-dealer");

          jQuery(".player-hit-card1").addClass("hidden");
          jQuery(".player-hit-card1").removeClass("show-player");
          jQuery(".player-hit-card2").addClass("hidden");
          jQuery(".player-hit-card2").removeClass("show-player");
          jQuery(".player-hit-card3").addClass("hidden");
          jQuery(".player-hit-card3").removeClass("show-player");
          jQuery(".player-hit-card4").addClass("hidden");
          jQuery(".player-hit-card4").removeClass("show-player");
          jQuery(".player-hit-card5").addClass("hidden");
          jQuery(".player-hit-card5").removeClass("show-player");

          jQuery(".card1").removeClass("move-left");
          jQuery(".card2").removeClass("move-left");
          jQuery(".dealer-card1").removeClass("move-right");
          jQuery(".dealer-card2").removeClass("move-right");

        }

//add scores together
        $scope.addScores = function(array){
          var score = 0;
          for(var i = 0; i < array.length; i++){
            score += parseInt(array[i].value);
          }
          return score;
        };

        $scope.playerScore = $scope.addScores($scope.playersHand);

        if ($scope.playerScore == 21){
          swal("BLACKJACK!!", "You got 21 dealt to you! \n Click Stand to see dealer's score")
        }

        $scope.compareScores = function(){
          if($scope.dealerScore > 21){
            $scope.playerWins++;
            swal({
              title: "You Win!",
              text: "The Dealer busted"
            },function(){
              setTimeout(function(){
                $scope.resetGame();
                mainGame();
              }, 250)
            });
          } else if($scope.dealerScore > $scope.playerScore){
            $scope.dealerWins++;
            swal({
              title: "Dealer Wins!",
              text: "The Dealer beat your score"
            },function(){
              setTimeout(function(){
                $scope.resetGame();
                mainGame();
              }, 250)
            });
          }else if($scope.dealerScore < $scope.playerScore){
            $scope.playerWins++;
            swal({
              title: "You Win!",
              text: "Your score beat the Dealer"
            },function(){
              setTimeout(function(){
                $scope.resetGame();
                mainGame();
              }, 250)
            });
          }else if($scope.dealerScore == $scope.playerScore){
            swal({
              title: "Push!",
              text: "You and the Dealer got the same score"
            },function(){
              setTimeout(function(){
                $scope.resetGame();
                mainGame();
              }, 250)
            });
          }
//set user stats to local storage after play
          $scope.setUserStats($scope.userName, $scope.playerWins, $scope.dealerWins); //arguments - actual data
        }

        $scope.dealerRun = function() {
          if($scope.dealerScore < 17){
            $scope.dealerHit()
            $scope.dealerScore = $scope.addScores($scope.dealersHand);
            jQuery(".dealer-card1").addClass("move-right");
            jQuery(".dealer-card2").addClass("move-right");
            jQuery(".dealer-hit-card1").addClass("show-dealer");
//run 2nd hit card
            setTimeout(function(){
              if($scope.dealerScore < 17){
                $scope.dealerHit()
                $scope.dealerScore = $scope.addScores($scope.dealersHand);
                jQuery(".dealer-hit-card2").addClass("show-dealer");
//run 3rd hit card
                setTimeout(function(){
                  if($scope.dealerScore < 17){
                    $scope.dealerHit()
                    $scope.dealerScore = $scope.addScores($scope.dealersHand);
                    jQuery(".dealer-hit-card3").addClass("show-dealer");
//run 4th hit card
                    setTimeout(function(){
                      if($scope.dealerScore < 17){
                        $scope.dealerHit()
                        $scope.dealerScore = $scope.addScores($scope.dealersHand);
                        jQuery(".dealer-hit-card4").addClass("show-dealer");
//run 5th hit card
                        setTimeout(function(){
                          if($scope.dealerScore < 17){
                            $scope.dealerHit()
                            $scope.dealerScore = $scope.addScores($scope.dealersHand);
                            jQuery(".dealer-hit-card5").addClass("show-dealer");
                          }
                          if($scope.dealerScore >= 17){
                            $scope.compareScores();
                          }
                        },1500) //end 5th hit card
                      }
                      if($scope.dealerScore >= 17){
                        $scope.compareScores();
                      }
                    },1500) //end 4th hit card
                  }
                  if($scope.dealerScore >= 17){
                    $scope.compareScores();
                  }
                },1500) //end 3rd hit card
              }
              if($scope.dealerScore >= 17){
                $scope.compareScores();
              }
            },1500) //end 2nd hit card
          }
          if($scope.dealerScore >= 17){
            $scope.compareScores();
          }
        }

        $scope.stand = function(){
//flip dealer card and add score
          jQuery(".dealer-card2").flip(true);
          $scope.dealerScore = $scope.addScores($scope.dealersHand);

//disable hit and stand buttons when stand is clicked
          $scope.disableHit = true;
          $scope.disableStand = true;
          setTimeout($scope.dealerRun,1500);
        }



        if($scope.playerScore >= 21){
          $scope.disableHit = true;
        }
        if($scope.playerScore > 21){
          $scope.disableStand = true;
        }

        $scope.aceValueFuncPlayer();

//start player hit
        $scope.playerHit = function(){
          mainService.drawOne().then(function(dataFromService){
            if(dataFromService.remaining < 5){
              console.log("getting new deckid from api")
              mainService.getCards();
            }
            $scope.drawOne = dataFromService.cards[0];

//set kings/queens/jacks to value of 10 on hit card
            if($scope.drawOne.value === 'KING' || $scope.drawOne.value === 'QUEEN' || $scope.drawOne.value === 'JACK'){
              $scope.drawOne.value = 10;
            }
//set ace to value of 11 on hit card
            if($scope.drawOne.value === 'ACE'){
              $scope.drawOne.value = 11;
              acePresentPlayer = true;
            }

            $scope.playersHand.push($scope.drawOne);

            if(acePresentPlayer === true && $scope.playerScore >= 11 && $scope.drawOne.value === 11) {
              $scope.drawOne.value = 1;
            }

            $scope.playerScore = $scope.addScores($scope.playersHand)
            $scope.aceValueFuncPlayer();

            if($scope.playerScore == 21){
              setTimeout(function() {
                swal("You hit 21!", "Click Stand to see if you beat the dealer");
              }, 500);
            } else if ($scope.playerScore > 21){
              $scope.dealerWins++
              var difference = $scope.playerScore - 21;

              setTimeout(function() {
                swal({
                  title: "You scored " + difference + " over 21 \n You bust!",
                  text: "Click OK for new game"
                }, function(){
                  $scope.resetGame();
                  mainGame();
                });
              }, 500);
              $scope.setUserStats($scope.userName, $scope.playerWins, $scope.dealerWins); //arguments - actual data
            }


//disable buttons if playerScore is over 21
              // if($scope.playerScore >= 21){
              //   $scope.disableHit = true;
              // }
              // if($scope.playerScore > 21){
              //   $scope.disableStand = true;
              // }
          })
        } //end player hit

//start dealer hit
        $scope.dealerHit = function(){
          mainService.drawOne().then(function(dataFromService){

            if(dataFromService.remaining < 5){
              console.log("getting new deckId from api")
              mainService.getCards();
            }

            $scope.drawOneD = dataFromService.cards[0];

//set kings/queens/jacks to value of 10 on hit card
            if($scope.drawOneD.value === 'KING' || $scope.drawOneD.value === 'QUEEN' || $scope.drawOneD.value === 'JACK'){
              $scope.drawOneD.value = 10;
            }

//set ace to value of 11 on hit card
            if($scope.drawOneD.value === 'ACE'){
              $scope.drawOneD.value = 11;
              acePresentDealer = true;
            }

            $scope.dealersHand.push($scope.drawOneD);

            if(acePresentDealer === true && $scope.dealerScore >= 11 && $scope.drawOneD.value === 11) {
              $scope.drawOneD.value = 1;
            }

            $scope.dealerScore = $scope.addScores($scope.dealersHand);
            $scope.aceValueFuncDealer();

          })
        } //end dealer hit
      })
    }
  mainGame();
  })
//set user stats to localStorage
  $scope.setUserStats = function(name, wins, losses){
    mainService.setUserStats(name, wins, losses);
  }
//get user stats from localStorage
  $scope.getUserStats = function(inputValue){
    $scope.userObj = mainService.getUserStats(inputValue);
      if(!$scope.userObj){
          return false;
      }
      $scope.userName = $scope.userObj.userName;
      $scope.playerWins = $scope.userObj.userWins;
      $scope.dealerWins = $scope.userObj.userLosses;
      return $scope.userObj;
  }

}) // end angular document

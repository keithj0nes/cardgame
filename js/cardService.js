angular.module("gameApp").service("mainService", function($http, $q){


  var baseUrl = "https://deckofcardsapi.com/api/deck/";
  var deckId;


  this.getCards = function(){
    return $http({
      method: "GET",
      url: baseUrl + "new/shuffle/?deck_count=1"
      // url: baseUrl + "new/?cards=AS,AD,AH,AC,2C,3H,2H,2S,3S,2D,3C"
        // url: baseUrl + "new/?cards=AS,KH,KC,AH"
    }).then(function(response){
      if(response.status === 200){
        console.log(response.data)
        deckId = response.data.deck_id;

        // console.log(deckId + " inside promise");
      } else {
        console.log("API failed")
      }
    })
  }

  // console.log(deckId + " outside function");
// setTimeout(function(){
//   console.log(deckId + " outside function");
// }, 500)



//DRAW 2 CARDS ON OPENING OF GAME


  this.startCards = function(){
      // console.log(deckId + " inside startCards function")
    return $http({
      method: "GET",
      url: baseUrl + deckId + "/draw/?count=4"
    }).then(function(response){
      if(response.status === 200){
        console.log("DRAW 4 WORKZ")
        // console.log(response.data.cards)
        // console.log(response.data)
        return response.data.cards;
      } else {
        console.log("It didnt workz");
      }
    })
  }


//DRAW 1 CARD PER HIT CLICK

  this.drawOne = function(){
    // console.log(deckId + " inside drawOne function")
    return $http ({
      method: "GET",
      url: baseUrl + deckId + "/draw/?count=1"
    }).then(function(response){
      if(response.status === 200){
        console.log("draw 1 werkt")
        console.log(response.data);
        return response.data.cards[0];
      }
    })
  }



}) // END SERVICE

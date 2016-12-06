angular.module("gameApp").service("mainService", function($http, $q){

  var baseUrl = "https://deckofcardsapi.com/api/deck/";
  var deckId;

//get cards / deckid from API

  this.getCards = function(){
    return $http({
      method: "GET",
      url: baseUrl + "new/shuffle/?deck_count=6"
      // url: baseUrl + "new/?cards=AS,AD,AH,AC,2C,3H,2H,2S,3S,2D"
      // url: baseUrl + "new/?cards=AS,KH,KC,AH"
    }).then(function(response){
      if(response.status === 200){
        // console.log(response.data)
        deckId = response.data.deck_id;
        // console.log(deckId + " inside promise");
      } else {
        console.log("API failed")
      }
    })
  }

//DRAW 4 CARDS ON OPENING OF GAME
  this.startCards = function(){
      // console.log(deckId + " inside startCards function")
    return $http({
      method: "GET",
      url: baseUrl + deckId + "/draw/?count=4"
    }).then(function(response){
      if(response.status === 200){
        // console.log("DRAW 4 WORKZ")
        // console.log(response.data.cards)
        // console.log(response.data)
        return response.data;
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
        // console.log("draw 1 werkt")
        console.log(response.data);
        return response.data;
      }
    })
  }




//setting / getting localStorage

  function PlayerStats(userName, userWins, userLosses){//parameters - set by maincontroller
    this.userName = userName; //arg
    this.userWins = userWins;
    this.userLosses = userLosses;
  }

  this.setUserStats = function(name, wins, losses){
    console.log(name, wins, losses, "set user function");
    var obj = new PlayerStats(name, wins, losses);
    // var array = [];
    // array.push(obj);
    localStorage.setItem(name,JSON.stringify(obj));
    // localStorage.setItem('listOfPlayers',JSON.stringify(array));
    // console.log(array);
  };
  this.getUserStats = function(name){
    // if(!localStorage.getItem(name)){
    //   console.log("service getCurrentUser", name);
    //   localStorage[name] = null;
    // }else{
    //   console.log("service getCurrentUser", name);
      return JSON.parse(localStorage.getItem(name));
      ///get array loop through find user and set to current user

    // }
  };

  this.getStatsPage = function(name){
    return JSON.parse(localStorage.getItem(name));
  }


}) // END SERVICE

angular.module("gameApp", [])


.controller("mainController", function($scope, mainService){


// mainService.getCards().then(function(dataFromService){
//   $scope.getCards = dataFromService;
// })



})

.service("mainService", function($http){


  // this.getCards = function(){
  //   return $http({
  //     method: "GET",
  //     url: "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  //   }).then(function(response){
  //     if(response.status === 200){
  //       console.log(response.data)
  //     } else {
  //       console.log("API failed")
  //     }
  //   })
  // }
})

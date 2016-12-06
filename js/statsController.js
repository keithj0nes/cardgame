angular.module("gameApp").controller("statsController", function($scope, $http){



  //
  // $http.get("http://www.w3schools.com/angular/customers.php")
  //     .then(function(response){
  //       $scope.names = response.data.records;
  //       console.log($scope.names);
  //
  //     });


$scope.s=[
  {
    user: 'John',
    win: 10,
    loss: 2
  },
  {
    user: 'Mary',
    win: 2,
    loss: 5
  },
  {
    user: 'John',
    win: 10,
    loss: 2
  },
  {
    user: 'Mary',
    win: 2,
    loss: 5
  },
  {
    user: 'John',
    win: 10,
    loss: 2
  },
  {
    user: 'Mary',
    win: 2,
    loss: 5
  },{
    user: 'John',
    win: 10,
    loss: 2
  },
  {
    user: 'Mary',
    win: 2,
    loss: 5
  },
  {
    user: 'John',
    win: 10,
    loss: 2
  },
  {
    user: 'Mary',
    win: 2,
    loss: 5
  }
];

  // $scope.gameStats = mainService.getStatsPage();
  $scope.storageItemsArray = [];

  for (var i = 0; i < localStorage.length; i++)   {
      // console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
console.log(localStorage.key(i));
      var storageItems = JSON.parse(localStorage.getItem(localStorage.key(i)));
      $scope.storageItemsArray.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
      console.log(storageItems);
  }
  console.log($scope.storageItemsArray);
  // $scope.gameStatsStorage = storageItems
  // console.log($scope.gameStatsStorage);


$scope.propName = 'userWins';
$scope.reverse = true;
// $scope.friends = friends;

$scope.sortBy = function(propName) {
  $scope.reverse = ($scope.propName === propName) ? !$scope.reverse : false;
  $scope.propName = propName;
};


  // console.log(localStorage);
  // $scope.gameStatsStorage = JSON.parse(localStorage.getItem(localStorage.key(i)));
})

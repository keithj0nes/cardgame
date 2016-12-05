angular.module("gameApp").controller("statsController", function($scope, $http){




  $http.get("http://www.w3schools.com/angular/customers.php")
      .then(function(response){
        $scope.names = response.data.records;
        console.log($scope.names);

      });


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

  for (var i = 0; i < localStorage.length; i++)   {
      // console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
      $scope.gameStatsStorage = JSON.parse(localStorage.getItem(localStorage.key(i)));
      console.log($scope.gameStatsStorage);
  }


  // console.log(localStorage);
  // $scope.gameStatsStorage = JSON.parse(localStorage.getItem(localStorage.key(i)));
})
